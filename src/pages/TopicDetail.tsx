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
  Loader2,
} from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { trails } from '@/data/trails'
import { useState } from 'react'

export default function TopicDetail() {
  const { trailId, topicId } = useParams()
  const navigate = useNavigate()
  const { isTopicCompleted, toggleTopic } = useAppStore()
  const [toggling, setToggling] = useState(false)
  const [showXP, setShowXP] = useState(false)

  const trail = trails.find((t) => t.id === trailId)
  if (!trail) return <Navigate to="/" replace />

  const topicIndex = trail.topics.findIndex((t) => t.id === topicId)
  if (topicIndex === -1) return <Navigate to={`/trail/${trailId}`} replace />

  const topic = trail.topics[topicIndex]
  const prevTopic = topicIndex > 0 ? trail.topics[topicIndex - 1] : null
  const nextTopic = topicIndex < trail.topics.length - 1 ? trail.topics[topicIndex + 1] : null
  const completed = isTopicCompleted(topic.id)

  const handleToggle = async () => {
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
        {/* What to learn */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={18} className="text-primary" />
            <h2 className="font-semibold">O que aprender</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">{topic.description}</p>
        </div>

        {/* Practice */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Wrench size={18} className="text-amber-400" />
            <h2 className="font-semibold">Exercício Prático</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">{topic.practiceHint}</p>
        </div>

        {/* Project Context */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={18} className="text-blue-400" />
            <h2 className="font-semibold">Na Prática do Projeto</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">{topic.projectContext}</p>
        </div>
      </div>

      {/* Complete Button */}
      <div className="relative">
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            completed
              ? 'bg-secondary text-muted-foreground hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-border'
              : 'bg-primary text-primary-foreground glow-green hover:bg-primary/90'
          }`}
        >
          {toggling ? (
            <Loader2 size={18} className="animate-spin" />
          ) : completed ? (
            <>
              <CheckCircle2 size={18} /> Concluído — clique para desmarcar
            </>
          ) : (
            <>
              <Circle size={18} /> Marcar como concluído (+{topic.xp} XP)
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
