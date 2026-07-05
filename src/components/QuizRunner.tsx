import { useState } from 'react'
import { Check, X, Swords, RotateCcw } from 'lucide-react'
import type { QuizQuestion } from '@/data/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuizRunnerProps {
  questions: QuizQuestion[]
  passScore?: number
  onPass: () => void
  alreadyPassed?: boolean
}

export function QuizRunner({
  questions,
  passScore = 4,
  onPass,
  alreadyPassed = false,
}: QuizRunnerProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)

  const correctCount = answers.filter(Boolean).length
  const passed = correctCount >= passScore

  const question = questions[current]

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setAnswers((prev) => [...prev, idx === question.correctIndex])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
      const finalCorrect = answers.filter(Boolean).length
      if (finalCorrect >= passScore && !alreadyPassed) onPass()
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const handleRetry = () => {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  if (questions.length === 0) {
    return <p className="text-sm text-muted-foreground">Quiz indisponível para esta etapa.</p>
  }

  if (finished) {
    return (
      <div className="glass animate-pop p-8 text-center">
        <div
          className={cn(
            'mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl',
            passed ? 'bg-primary/15 animate-pulse-glow' : 'bg-destructive/15',
          )}
        >
          {passed ? '🏆' : '💀'}
        </div>
        <h3 className="font-display text-2xl font-bold">
          {passed ? 'Boss derrotado!' : 'O boss resistiu…'}
        </h3>
        <p className="mt-2 text-muted-foreground">
          Você acertou <span className="font-bold text-foreground">{correctCount}</span> de{' '}
          {questions.length} —{' '}
          {passed ? 'desafio vencido.' : `precisa de ${passScore} para vencer.`}
        </p>
        {!passed && (
          <Button onClick={handleRetry} className="mt-6 h-11 gap-2 font-semibold">
            <RotateCcw className="h-4 w-4" /> Tentar de novo
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="glass p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="pill pill-glow">
          <Swords className="h-3.5 w-3.5" /> Questão {current + 1} de {questions.length}
        </span>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 w-6 rounded-full transition-colors',
                i < answers.length
                  ? answers[i]
                    ? 'bg-primary'
                    : 'bg-destructive'
                  : i === current
                    ? 'bg-foreground/40'
                    : 'bg-border',
              )}
            />
          ))}
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold leading-snug sm:text-xl">
        {question.question}
      </h3>

      <div className="mt-6 space-y-3">
        {question.options.map((opt, idx) => {
          const isCorrect = idx === question.correctIndex
          const isSelected = idx === selected
          const revealed = selected !== null
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              className={cn(
                'flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-all',
                !revealed &&
                  'border-border bg-secondary/50 hover:border-primary/50 hover:bg-primary/5',
                revealed && isCorrect && 'border-primary/60 bg-primary/10',
                revealed && isSelected && !isCorrect && 'border-destructive/60 bg-destructive/10',
                revealed && !isSelected && !isCorrect && 'border-border bg-secondary/30 opacity-50',
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

      {selected !== null && (
        <div className="animate-fade-up mt-5 rounded-xl border border-primary/25 bg-primary/5 p-4">
          <p className="text-sm leading-relaxed text-foreground/90">{question.explanation}</p>
          <Button
            onClick={handleNext}
            className="btn-glow mt-4 h-11 w-full font-semibold sm:w-auto"
          >
            {current + 1 >= questions.length ? 'Ver resultado' : 'Próxima questão'}
          </Button>
        </div>
      )}
    </div>
  )
}
