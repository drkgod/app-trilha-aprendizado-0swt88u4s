import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Lock, Circle, ChevronRight, Zap } from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { trails, type Topic } from '@/data/trails'

export default function TrailView() {
  const { trailId } = useParams()
  const { isTopicCompleted, getTrailProgress, completedTopicIds } = useAppStore()

  const trail = trails.find((t) => t.id === trailId)
  if (!trail) return <Navigate to="/" replace />

  const progress = getTrailProgress(trail.id)
  const priorityGroups = [
    { label: 'Prioridade Alta', priority: 'alta' as const, color: 'hsl(0 80% 60%)', emoji: '🔴' },
    {
      label: 'Prioridade Média',
      priority: 'media' as const,
      color: 'hsl(40 90% 60%)',
      emoji: '🟡',
    },
    {
      label: 'Prioridade Baixa',
      priority: 'baixa' as const,
      color: 'hsl(160 70% 50%)',
      emoji: '🟢',
    },
  ]

  // Unlock logic: a topic is unlocked if it's the first in its priority group,
  // or the previous topic in the same priority group is completed
  function isUnlocked(topic: Topic, groupTopics: Topic[]) {
    if (isTopicCompleted(topic.id)) return true
    const idx = groupTopics.findIndex((t) => t.id === topic.id)
    if (idx === 0) return true
    return isTopicCompleted(groupTopics[idx - 1].id)
  }

  function isCurrentTopic(topic: Topic, groupTopics: Topic[]) {
    if (isTopicCompleted(topic.id)) return false
    return isUnlocked(topic, groupTopics)
  }

  return (
    <div className="space-y-6 animate-fade-in-up pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 rounded-xl hover:bg-secondary/50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{trail.icon}</span>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: trail.color }}>
                {trail.name}
              </h1>
              <p className="text-sm text-muted-foreground">{trail.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            {progress.completed} de {progress.total} tópicos
          </span>
          <span className="text-sm font-bold" style={{ color: trail.color }}>
            {progress.percent}%
          </span>
        </div>
        <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress.percent}%`, background: trail.color }}
          />
        </div>
      </div>

      {/* Trail Map by Priority */}
      {priorityGroups.map((group) => {
        const groupTopics = trail.topics.filter((t) => t.priority === group.priority)
        if (groupTopics.length === 0) return null
        const groupCompleted = groupTopics.filter((t) => isTopicCompleted(t.id)).length

        return (
          <section key={group.priority} className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span>{group.emoji}</span>
              <h2
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: group.color }}
              >
                {group.label}
              </h2>
              <span className="text-xs text-muted-foreground ml-auto">
                {groupCompleted}/{groupTopics.length}
              </span>
            </div>

            <div className="space-y-2">
              {groupTopics.map((topic, i) => {
                const completed = isTopicCompleted(topic.id)
                const current = isCurrentTopic(topic, groupTopics)
                const locked = !isUnlocked(topic, groupTopics)

                return (
                  <div
                    key={topic.id}
                    className={`animate-fade-in-up`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {locked ? (
                      <div className="glass-card p-4 flex items-center gap-4 opacity-40 cursor-not-allowed">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary border-2 border-border">
                          <Lock size={16} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-muted-foreground truncate">
                            {topic.title}
                          </p>
                          <p className="text-xs text-muted-foreground/60">
                            Complete o tópico anterior para desbloquear
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <Zap size={12} /> {topic.xp} XP
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={`/trail/${trail.id}/topic/${topic.id}`}
                        className={`glass-card-hover p-4 flex items-center gap-4 group ${
                          current ? 'border-primary/30 glow-green-sm' : ''
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                            completed
                              ? 'node-completed'
                              : current
                                ? 'node-current animate-pulse-ring'
                                : 'bg-secondary border-2 border-border'
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 size={20} className="text-primary-foreground" />
                          ) : current ? (
                            <Circle size={16} className="text-primary" />
                          ) : (
                            <span className="text-xs font-bold text-muted-foreground">
                              {topic.index}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium text-sm truncate ${
                              completed
                                ? 'text-muted-foreground line-through'
                                : current
                                  ? 'text-foreground'
                                  : ''
                            }`}
                          >
                            {topic.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {topic.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className="text-xs font-medium flex items-center gap-1"
                            style={{ color: completed ? 'hsl(160 70% 50%)' : trail.color }}
                          >
                            <Zap size={12} /> {topic.xp}
                          </span>
                          <ChevronRight
                            size={16}
                            className="text-muted-foreground group-hover:text-foreground transition-colors"
                          />
                        </div>
                      </Link>
                    )}

                    {/* Connector line */}
                    {i < groupTopics.length - 1 && (
                      <div className="flex justify-start ml-9 py-0.5">
                        <div
                          className={`w-0.5 h-3 rounded-full ${
                            completed && isTopicCompleted(groupTopics[i + 1]?.id)
                              ? 'bg-primary/60'
                              : 'bg-border'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
