import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Zap,
  BookOpen,
  Wrench,
  Briefcase,
  ExternalLink,
  Loader2,
  CheckSquare,
  Square,
  AlertCircle,
  X,
  HelpCircle,
} from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { trails } from '@/data/trails'
import { getQuizForTopic } from '@/data/quizzes'
import { useState, useEffect } from 'react'

export default function TopicDetail() {
  const { trailId, topicId } = useParams()
  const { isTopicCompleted, toggleTopic } = useAppStore()
  const [toggling, setToggling] = useState(false)
  const [showXP, setShowXP] = useState(false)

  // Interactive local steps checklist state
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({})

  // Quiz Modal state
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [validated, setValidated] = useState(false)
  const [quizErrors, setQuizErrors] = useState<Record<number, boolean>>({})

  // Reset checklist and quiz when topic changes
  useEffect(() => {
    setCheckedSteps({})
    setShowQuizModal(false)
    setSelectedAnswers({})
    setValidated(false)
    setQuizErrors({})
  }, [topicId])

  const trail = trails.find((t) => t.id === trailId)
  if (!trail) return <Navigate to="/" replace />

  const topicIndex = trail.topics.findIndex((t) => t.id === topicId)
  if (topicIndex === -1) return <Navigate to={`/trail/${trailId}`} replace />

  const topic = trail.topics[topicIndex]
  const prevTopic = topicIndex > 0 ? trail.topics[topicIndex - 1] : null
  const nextTopic = topicIndex < trail.topics.length - 1 ? trail.topics[topicIndex + 1] : null
  const completed = isTopicCompleted(topic.id)

  const topicQuiz = getQuizForTopic(topic.id, topic.title, trail.name)

  const handleToggleClick = () => {
    if (completed) {
      // If already completed, just toggle off
      performToggle()
    } else {
      // If completing, open the quiz first
      if (allStepsChecked) {
        setShowQuizModal(true)
      }
    }
  }

  const performToggle = async () => {
    setToggling(true)
    try {
      await toggleTopic(topic, trail.id)
      if (!completed) {
        setShowXP(true)
        setTimeout(() => setShowXP(false), 1500)
      }
    } finally {
      setToggling(false)
    }
  }

  const handleSelectAnswer = (qIdx: number, oIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))
    // Clear error for this question on edit
    if (validated) {
      setQuizErrors((prev) => ({ ...prev, [qIdx]: false }))
    }
  }

  const handleValidateQuiz = () => {
    const errors: Record<number, boolean> = {}
    let hasError = false

    topicQuiz.forEach((q, idx) => {
      const selected = selectedAnswers[idx]
      if (selected !== q.correctIndex) {
        errors[idx] = true
        hasError = true
      }
    })

    setQuizErrors(errors)
    setValidated(true)

    if (!hasError) {
      // All correct! Close modal and complete topic
      setShowQuizModal(false)
      performToggle()
    }
  }

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const allStepsChecked = topic.practiceSteps.every((_, idx) => checkedSteps[idx] === true)
  const canComplete = completed || allStepsChecked

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up pb-20 lg:pb-0">
      {/* Back nav */}
      <div className="flex items-center gap-3">
        <Link
          to={`/trail/${trail.id}`}
          className="p-2 rounded-xl hover:bg-secondary/50 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span style={{ color: trail.color }}>{trail.name}</span>
          <ChevronRight size={14} />
          <span>Tópico {topic.index}</span>
        </div>
      </div>

      {/* Header */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
              completed ? 'node-completed' : ''
            }`}
            style={
              !completed
                ? { background: `${trail.color}15`, border: `1px solid ${trail.color}30` }
                : {}
            }
          >
            {completed ? (
              <CheckCircle2 size={28} className="text-primary-foreground" />
            ) : (
              trail.icon
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`badge-${topic.priority}`}>{topic.priority}</span>
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Zap size={12} style={{ color: trail.color }} /> {topic.xp} XP
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">{topic.title}</h1>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="space-y-4">
        {/* Concept / Explain */}
        <div className="glass-card p-6 space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            <h2 className="font-semibold text-base">Conceito e Explicação</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
            {topic.concept}
          </p>
        </div>

        {/* References / Documentation Links */}
        {topic.references && topic.references.length > 0 && (
          <div className="glass-card p-6 space-y-3">
            <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
              Leituras Recomendadas
            </h3>
            <div className="flex flex-wrap gap-3">
              {topic.references.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-xs font-semibold hover:border-primary/45 hover:bg-secondary transition-all"
                >
                  <span>{ref.label}</span>
                  <ExternalLink size={12} className="text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step Practice */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Wrench size={18} className="text-amber-400" />
            <h2 className="font-semibold text-base">Passo a Passo Prático</h2>
          </div>
          <div className="space-y-2.5">
            {topic.practiceSteps.map((step, idx) => {
              const isChecked = checkedSteps[idx] || false
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-primary/5 border-primary/20 text-muted-foreground'
                      : 'bg-secondary/30 border-border/60 hover:border-border text-foreground'
                  }`}
                >
                  <button className="mt-0.5 flex-shrink-0 text-primary">
                    {isChecked ? (
                      <CheckSquare size={18} />
                    ) : (
                      <Square size={18} className="text-muted-foreground" />
                    )}
                  </button>
                  <p className={`text-sm leading-relaxed ${isChecked ? 'line-through' : ''}`}>
                    {step}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Project Context */}
        <div className="glass-card p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-blue-400" />
            <h2 className="font-semibold text-base">Na Prática do Projeto / Consultoria</h2>
          </div>
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-muted-foreground text-sm leading-relaxed">
            {topic.projectContext}
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="relative">
        <button
          onClick={handleToggleClick}
          disabled={toggling || !canComplete}
          className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            completed
              ? 'bg-secondary text-muted-foreground hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-border'
              : allStepsChecked
                ? 'bg-primary text-primary-foreground glow-green hover:bg-primary/90'
                : 'bg-secondary/50 text-muted-foreground cursor-not-allowed opacity-60 border border-border'
          }`}
        >
          {toggling ? (
            <Loader2 size={18} className="animate-spin" />
          ) : completed ? (
            <>
              <CheckCircle2 size={18} /> Concluído — clique para desmarcar
            </>
          ) : allStepsChecked ? (
            <>
              <Circle size={18} /> Validar Conhecimento para Concluir (+{topic.xp} XP)
            </>
          ) : (
            <>
              <AlertCircle size={18} /> Conclua todos os passos práticos acima para liberar (+
              {topic.xp} XP)
            </>
          )}
        </button>

        {/* XP Float animation */}
        {showXP && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
            <span className="text-primary font-bold text-xl animate-xp-float flex items-center gap-1">
              <Zap size={18} /> +{topic.xp} XP
            </span>
          </div>
        )}
      </div>

      {/* Prev / Next nav */}
      <div className="flex gap-3">
        {prevTopic ? (
          <Link
            to={`/trail/${trail.id}/topic/${prevTopic.id}`}
            className="flex-1 glass-card-hover p-4 flex items-center gap-3"
          >
            <ChevronLeft size={18} className="text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Anterior</p>
              <p className="text-sm font-medium truncate">{prevTopic.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextTopic ? (
          <Link
            to={`/trail/${trail.id}/topic/${nextTopic.id}`}
            className="flex-1 glass-card-hover p-4 flex items-center justify-end gap-3 text-right"
          >
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Próximo</p>
              <p className="text-sm font-medium truncate">{nextTopic.title}</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto flex flex-col p-6 sm:p-8 space-y-6 relative border-primary/30 glow-green-sm animate-scale-up my-8">
            {/* Close button */}
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute right-4 top-4 p-2 rounded-xl hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <HelpCircle size={22} className="animate-pulse" />
                <h2 className="text-lg font-bold">Questionário de Validação Técnica</h2>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed p-3.5 rounded-xl bg-primary/5 border border-primary/10">
                💡 <span className="font-semibold text-primary">Aviso</span>: Este questionário é
                apenas um pontapé inicial para validar seu raciocínio crítico. Estude o tema a fundo
                antes de responder. Você precisa responder{' '}
                <strong>todas as perguntas corretamente</strong> para concluir o tópico.
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-6 divide-y divide-border/40">
              {topicQuiz.map((q, qIdx) => (
                <div key={qIdx} className={`space-y-3 ${qIdx > 0 ? 'pt-6' : ''}`}>
                  <h3 className="text-sm font-semibold flex gap-2">
                    <span className="text-primary">{qIdx + 1}.</span>
                    <span>{q.question}</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((option, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx
                      const isError = validated && quizErrors[qIdx] && isSelected
                      const isCorrect = validated && !quizErrors[qIdx] && isSelected

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectAnswer(qIdx, oIdx)}
                          className={`text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 ${
                            isSelected
                              ? isError
                                ? 'bg-red-500/10 border-red-500/40 text-red-300'
                                : isCorrect
                                  ? 'bg-primary/10 border-primary/40 text-primary-foreground'
                                  : 'bg-primary/10 border-primary/40 text-primary font-medium'
                              : 'bg-secondary/20 border-border hover:border-primary/20 hover:bg-secondary/40'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border mt-0.5 ${
                              isSelected ? 'border-primary' : 'border-muted-foreground/30'
                            }`}
                          >
                            {isSelected && <span className="w-2 h-2 rounded-full bg-primary" />}
                          </span>
                          <span>{option}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Feedback explanation if error */}
                  {validated && quizErrors[qIdx] && (
                    <div className="p-3 text-xs rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 leading-relaxed flex gap-2">
                      <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">Incorreto:</span> {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Validation CTA */}
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setShowQuizModal(false)}
                className="flex-1 py-3 rounded-xl bg-secondary text-muted-foreground font-semibold text-xs border border-border hover:bg-secondary/80 transition-colors"
              >
                Voltar ao Conteúdo
              </button>
              <button
                onClick={handleValidateQuiz}
                disabled={Object.keys(selectedAnswers).length < topicQuiz.length}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-green-sm"
              >
                Validar Respostas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
