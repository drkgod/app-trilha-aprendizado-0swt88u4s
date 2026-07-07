import { useState, useEffect, useMemo, useRef } from 'react'
import {
  Check,
  X,
  Clock,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Send,
  Loader2,
} from 'lucide-react'
import type { EvalQuestion, EvalQuestionMC } from '@/data/eval-types'
import {
  drawQuestions,
  shuffleOptions,
  computeIntegritySeal,
  SEAL_LABEL,
  type IntegritySeal,
} from '@/data/eval-types'
import { useEvalIntegrity } from '@/hooks/use-eval-integrity'
import { useAuth } from '@/hooks/use-auth'
import {
  gradeOpenAnswer,
  createAttempt,
  saveAnswer,
  countAttempts,
  getSeenQuestionIds,
} from '@/services/evaluations'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface EvalRunnerProps {
  bank: EvalQuestion[]
  trailId: string
  kind: 'checkpoint' | 'exam'
  checkpointKey?: string
  questionCount: number
  passPercent: number
  secondsPerQuestion: number
  onPass: () => void
  title: string
}

interface AnswerState {
  question: EvalQuestion
  answerIndex?: number
  answerText?: string
  isCorrect?: boolean
  aiScore?: number
  aiVerdict?: string
  aiFeedback?: string
  timeSpent: number
}

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function EvalRunner({
  bank,
  trailId,
  kind,
  checkpointKey,
  questionCount,
  passPercent,
  secondsPerQuestion,
  onPass,
  title,
}: EvalRunnerProps) {
  const { user } = useAuth()
  const integrity = useEvalIntegrity(true)

  const [seenIds, setSeenIds] = useState<string[]>([])
  const [loadingSeen, setLoadingSeen] = useState(true)
  const [attemptNumber, setAttemptNumber] = useState(1)
  const [questions, setQuestions] = useState<EvalQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<AnswerState[]>([])

  const [mcSelected, setMcSelected] = useState<number | null>(null)
  const [openText, setOpenText] = useState('')
  const [grading, setGrading] = useState(false)
  const [lastGrade, setLastGrade] = useState<AnswerState | null>(null)
  const [questionTimeLeft, setQuestionTimeLeft] = useState(secondsPerQuestion)

  const [finished, setFinished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [finalResult, setFinalResult] = useState<{
    scorePercent: number
    passed: boolean
    seal: IntegritySeal
  } | null>(null)

  const startedAtRef = useRef<string>(new Date().toISOString())

  // Carrega questões já vistas e monta o conjunto sorteado (questões diferentes ao refazer).
  useEffect(() => {
    let cancelled = false
    const setup = async () => {
      if (!user) return
      setLoadingSeen(true)
      const [seen, prevCount] = await Promise.all([
        getSeenQuestionIds(user.id, trailId, kind, checkpointKey),
        countAttempts(user.id, trailId, kind, checkpointKey),
      ])
      if (cancelled) return
      setSeenIds(seen)
      setAttemptNumber(prevCount + 1)
      const drawn = drawQuestions(bank, questionCount, seen).map((q) =>
        q.type === 'mc' ? shuffleOptions(q as EvalQuestionMC) : q,
      )
      setQuestions(drawn)
      setLoadingSeen(false)
      integrity.reset()
      integrity.markQuestionStart()
    }
    setup()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, trailId, kind, checkpointKey])

  const question = questions[current]

  // Timer por questão — ao zerar, força avançar (fricção anti-consulta).
  useEffect(() => {
    if (finished || grading || lastGrade || !question) return
    setQuestionTimeLeft(secondsPerQuestion)
    const t = setInterval(() => {
      setQuestionTimeLeft((left) => {
        if (left <= 1) {
          clearInterval(t)
          handleTimeout()
          return 0
        }
        return left - 1
      })
    }, 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, questions, grading, lastGrade, finished])

  const recordAndAdvance = (a: AnswerState) => {
    setAnswers((prev) => [...prev, a])
    setLastGrade(a)
  }

  const handleTimeout = () => {
    if (!question || lastGrade) return
    const timeSpent = integrity.takeQuestionTime()
    if (question.type === 'mc') {
      recordAndAdvance({
        question,
        answerIndex: mcSelected ?? -1,
        isCorrect: mcSelected === (question as EvalQuestionMC).correctIndex,
        timeSpent,
      })
    } else {
      // Discursiva sem resposta a tempo → reprovada.
      recordAndAdvance({
        question,
        answerText: openText,
        aiScore: 0,
        aiVerdict: 'reprovado',
        aiFeedback: 'Tempo esgotado antes do envio.',
        timeSpent,
      })
    }
  }

  const handleMcSelect = (idx: number) => {
    if (lastGrade || !question) return
    setMcSelected(idx)
    const timeSpent = integrity.takeQuestionTime()
    recordAndAdvance({
      question,
      answerIndex: idx,
      isCorrect: idx === (question as EvalQuestionMC).correctIndex,
      timeSpent,
    })
  }

  const handleOpenSubmit = async () => {
    if (lastGrade || !question || grading) return
    if (openText.trim().length < 15) return
    setGrading(true)
    const timeSpent = integrity.takeQuestionTime()
    const q = question as Extract<EvalQuestion, { type: 'open' }>
    const grade = await gradeOpenAnswer(q.question, q.expected, openText)
    setGrading(false)
    recordAndAdvance({
      question,
      answerText: openText,
      aiScore: grade.score,
      aiVerdict: grade.verdict,
      aiFeedback: grade.feedback,
      timeSpent,
    })
  }

  const handleNext = async () => {
    setLastGrade(null)
    setMcSelected(null)
    setOpenText('')
    if (current + 1 >= questions.length) {
      await finish()
    } else {
      setCurrent((c) => c + 1)
      integrity.markQuestionStart()
    }
  }

  const scoreOf = (a: AnswerState): number => {
    if (a.question.type === 'mc') return a.isCorrect ? 100 : 0
    return a.aiScore ?? 0
  }

  const finish = async () => {
    setSaving(true)
    const allAnswers = answers
    const totalScore = allAnswers.reduce((sum, a) => sum + scoreOf(a), 0)
    const scorePercent = Math.round(totalScore / allAnswers.length)
    const passed = scorePercent >= passPercent
    const openCount = allAnswers.filter((a) => a.question.type === 'open').length
    const avgTime = allAnswers.reduce((s, a) => s + a.timeSpent, 0) / Math.max(1, allAnswers.length)
    const seal = computeIntegritySeal({
      visibilitySwitches: integrity.visibilitySwitches,
      pasteBlocks: integrity.pasteBlocks,
      copyBlocks: integrity.copyBlocks,
      avgSecondsPerQuestion: avgTime,
      openQuestionCount: openCount,
    })

    setFinalResult({ scorePercent, passed, seal })
    setFinished(true)

    // Persiste no Skip Cloud (tentativa + respostas).
    try {
      if (user) {
        const correctCount = allAnswers.filter(
          (a) => (a.question.type === 'mc' && a.isCorrect) || a.aiVerdict === 'aprovado',
        ).length
        const attempt = await createAttempt({
          user_id: user.id,
          trail_id: trailId,
          kind,
          checkpoint_key: checkpointKey,
          question_count: allAnswers.length,
          correct_count: correctCount,
          score_percent: scorePercent,
          passed,
          attempt_number: attemptNumber,
          total_duration_seconds: integrity.elapsedSeconds,
          active_duration_seconds: integrity.elapsedSeconds,
          visibility_switches: integrity.visibilitySwitches,
          paste_blocks: integrity.pasteBlocks,
          copy_blocks: integrity.copyBlocks,
          integrity_seal: seal,
          started_at: startedAtRef.current,
          finished_at: new Date().toISOString(),
        })
        await Promise.all(
          allAnswers.map((a) =>
            saveAnswer({
              user_id: user.id,
              attempt_id: attempt.id,
              question_id: a.question.id,
              question_type: a.question.type,
              question_text: a.question.question,
              answer_text: a.answerText,
              answer_index: a.answerIndex,
              is_correct: a.isCorrect,
              ai_score: a.aiScore,
              ai_verdict: a.aiVerdict,
              ai_feedback: a.aiFeedback,
              time_spent_seconds: a.timeSpent,
            }),
          ),
        )
      }
    } catch (e) {
      console.error('Falha ao salvar avaliação:', e)
    } finally {
      setSaving(false)
      if (passed) onPass()
    }
  }

  const handleRetry = async () => {
    // Refaz com questões DIFERENTES: soma as vistas agora às anteriores.
    const nowSeen = Array.from(new Set([...seenIds, ...answers.map((a) => a.question.id)]))
    setSeenIds(nowSeen)
    setAttemptNumber((n) => n + 1)
    const drawn = drawQuestions(bank, questionCount, nowSeen).map((q) =>
      q.type === 'mc' ? shuffleOptions(q as EvalQuestionMC) : q,
    )
    setQuestions(drawn)
    setAnswers([])
    setCurrent(0)
    setMcSelected(null)
    setOpenText('')
    setLastGrade(null)
    setFinished(false)
    setFinalResult(null)
    integrity.reset()
    integrity.markQuestionStart()
  }

  const progress = useMemo(
    () => (questions.length > 0 ? Math.round((answers.length / questions.length) * 100) : 0),
    [answers.length, questions.length],
  )

  if (loadingSeen || questions.length === 0) {
    return (
      <div className="glass flex items-center justify-center gap-3 p-10">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Preparando avaliação…</span>
      </div>
    )
  }

  // Tela de resultado
  if (finished && finalResult) {
    const { scorePercent, passed, seal } = finalResult
    const SealIcon = seal === 'limpo' ? ShieldCheck : ShieldAlert
    return (
      <div className="glass animate-pop p-8 text-center">
        <div
          className={cn(
            'mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl',
            passed ? 'bg-primary/15 animate-pulse-glow' : 'bg-destructive/15',
          )}
        >
          {passed ? '✅' : '🔁'}
        </div>
        <h3 className="font-display text-2xl font-bold">
          {passed ? 'Aprovado!' : 'Ainda não passou'}
        </h3>
        <p className="mt-2 text-muted-foreground">
          Nota: <span className="font-bold text-foreground">{scorePercent}%</span>
          {' · '}mínimo {passPercent}%
        </p>

        <div
          className={cn(
            'mx-auto mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold',
            seal === 'limpo' && 'border-primary/40 bg-primary/10 text-primary',
            seal === 'suspeito' && 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
            seal === 'alerta' && 'border-destructive/40 bg-destructive/10 text-destructive',
          )}
        >
          <SealIcon className="h-4 w-4" /> {SEAL_LABEL[seal]}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-border bg-secondary/40 p-3">
            <p className="font-display text-lg font-bold">{fmt(integrity.elapsedSeconds)}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tempo</p>
          </div>
          <div className="rounded-xl border border-border bg-secondary/40 p-3">
            <p className="font-display text-lg font-bold">{integrity.visibilitySwitches}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Saídas</p>
          </div>
          <div className="rounded-xl border border-border bg-secondary/40 p-3">
            <p className="font-display text-lg font-bold">{integrity.pasteBlocks}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Colagens</p>
          </div>
        </div>

        {saving && (
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" /> Salvando resultado…
          </p>
        )}

        {!passed && !saving && (
          <Button onClick={handleRetry} className="mt-6 h-11 gap-2 font-semibold">
            <RotateCcw className="h-4 w-4" /> Refazer com novas questões
          </Button>
        )}
      </div>
    )
  }

  const isOpen = question.type === 'open'

  return (
    <div className="glass p-6 sm:p-8">
      {/* Aviso anti-cola */}
      {integrity.showWarning && (
        <div className="animate-fade-up mb-5 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-destructive">
              Você saiu da prova {integrity.visibilitySwitches}{' '}
              {integrity.visibilitySwitches === 1 ? 'vez' : 'vezes'}
              {integrity.pasteBlocks > 0 && ` · colagens bloqueadas: ${integrity.pasteBlocks}`}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Isso fica registrado no seu selo de integridade. Responda com o que você sabe.
            </p>
          </div>
          <button
            onClick={integrity.dismissWarning}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <span className="pill pill-glow">
          Questão {current + 1} de {questions.length}
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tabular-nums',
            questionTimeLeft <= 10
              ? 'bg-destructive/15 text-destructive'
              : 'bg-secondary text-muted-foreground',
          )}
        >
          <Clock className="h-3.5 w-3.5" /> {fmt(questionTimeLeft)}
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span
          className={cn(
            'rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
            isOpen ? 'bg-purple-500/15 text-purple-300' : 'bg-blue-500/15 text-blue-300',
          )}
        >
          {isOpen ? 'Discursiva' : 'Múltipla escolha'}
        </span>
      </div>

      <h3 className="font-display text-lg font-semibold leading-snug sm:text-xl">
        {question.question}
      </h3>

      {/* Múltipla escolha */}
      {!isOpen && (
        <div className="mt-6 space-y-3">
          {(question as EvalQuestionMC).options.map((opt, idx) => {
            const revealed = lastGrade !== null
            const isCorrect = idx === (question as EvalQuestionMC).correctIndex
            const isSelected = idx === mcSelected
            return (
              <button
                key={idx}
                onClick={() => handleMcSelect(idx)}
                disabled={revealed}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-all',
                  !revealed &&
                    'border-border bg-secondary/50 hover:border-primary/50 hover:bg-primary/5',
                  revealed && isCorrect && 'border-primary/60 bg-primary/10',
                  revealed && isSelected && !isCorrect && 'border-destructive/60 bg-destructive/10',
                  revealed &&
                    !isSelected &&
                    !isCorrect &&
                    'border-border bg-secondary/30 opacity-50',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold',
                    revealed && isCorrect
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/40',
                    revealed &&
                      isSelected &&
                      !isCorrect &&
                      'border-destructive bg-destructive text-destructive-foreground',
                  )}
                >
                  {revealed && isCorrect ? (
                    <Check className="h-3 w-3" />
                  ) : revealed && isSelected ? (
                    <X className="h-3 w-3" />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </span>
                <span className="leading-relaxed">{opt}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Discursiva */}
      {isOpen && !lastGrade && (
        <div className="mt-6">
          <Textarea
            value={openText}
            onChange={(e) => setOpenText(e.target.value)}
            placeholder="Explique com suas próprias palavras… (mínimo algumas frases; copiar/colar está bloqueado)"
            className="min-h-[160px] resize-none bg-secondary/40 text-sm leading-relaxed"
            disabled={grading}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {openText.trim().length < 15
                ? 'Escreva um pouco mais para enviar'
                : `${openText.trim().length} caracteres`}
            </span>
            <Button
              onClick={handleOpenSubmit}
              disabled={grading || openText.trim().length < 15}
              className="btn-glow h-11 gap-2 font-semibold"
            >
              {grading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Avaliando…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Enviar resposta
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Feedback pós-resposta */}
      {lastGrade && (
        <div className="animate-fade-up mt-5 space-y-4">
          {lastGrade.question.type === 'mc' ? (
            <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
              <p className="text-sm leading-relaxed text-foreground/90">
                {(lastGrade.question as EvalQuestionMC).explanation}
              </p>
            </div>
          ) : (
            <div
              className={cn(
                'rounded-xl border p-4',
                lastGrade.aiVerdict === 'aprovado'
                  ? 'border-primary/30 bg-primary/5'
                  : lastGrade.aiVerdict === 'parcial'
                    ? 'border-yellow-500/30 bg-yellow-500/5'
                    : 'border-destructive/30 bg-destructive/5',
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn(
                    'rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                    lastGrade.aiVerdict === 'aprovado'
                      ? 'bg-primary/15 text-primary'
                      : lastGrade.aiVerdict === 'parcial'
                        ? 'bg-yellow-500/15 text-yellow-300'
                        : 'bg-destructive/15 text-destructive',
                  )}
                >
                  {lastGrade.aiVerdict} · {lastGrade.aiScore}/100
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  avaliação por IA
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{lastGrade.aiFeedback}</p>
            </div>
          )}
          <Button onClick={handleNext} className="btn-glow h-11 w-full font-semibold sm:w-auto">
            {current + 1 >= questions.length ? 'Ver resultado' : 'Próxima questão'}
          </Button>
        </div>
      )}
    </div>
  )
}
