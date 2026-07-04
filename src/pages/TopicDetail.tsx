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
} from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { trails } from '@/data/trails'
import { useState, useEffect } from 'react'

export default function TopicDetail() {
  const { trailId, topicId } = useParams()
  const { isTopicCompleted, toggleTopic } = useAppStore()
  const [toggling, setToggling] = useState(false)
  const [showXP, setShowXP] = useState(false)

  // Interactive local steps checklist state
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({})

  // Reset checklist when topic changes (call hook unconditionally at the top)
  useEffect(() => {
    setCheckedSteps({})
  }, [topicId])

  const trail = trails.find((t) => t.id === trailId)
  if (!trail) return <Navigate to="/" replace />

  const topicIndex = trail.topics.findIndex((t) => t.id === topicId)
  if (topicIndex === -1) return <Navigate to={`/trail/${trailId}`} replace />

  const topic = trail.topics[topicIndex]
  const prevTopic = topicIndex > 0 ? trail.topics[topicIndex - 1] : null
  const nextTopic = topicIndex < trail.topics.length - 1 ? trail.topics[topicIndex + 1] : null
  const completed = isTopicCompleted(topic.id)

  const handleToggle = async () => {
    if (!completed && !allStepsChecked) return
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
          onClick={handleToggle}
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
              <Circle size={18} /> Marcar como concluído (+{topic.xp} XP)
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
    </div>
  )
}
