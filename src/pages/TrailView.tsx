import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { getTrailById } from '@/data/trails'
import { TrailMap } from '@/components/TrailMap'
import { TrailIcon } from '@/components/TrailIcon'

export default function TrailView() {
  const { trailId } = useParams<{ trailId: string }>()
  const { isTopicCompleted, getTrailProgress, getNextTopic } = useAppStore()

  const trail = trailId ? getTrailById(trailId) : undefined
  if (!trail) return <Navigate to="/trails" replace />

  const prog = getTrailProgress(trail.id)
  const nextTopic = getNextTopic(trail.id)
  const earnedXP = trail.topics.filter((t) => isTopicCompleted(t.id)).reduce((s, t) => s + t.xp, 0)
  const totalTrailXP = trail.topics.reduce((s, t) => s + t.xp, 0)

  return (
    <div className="space-y-8">
      <header className="animate-fade-up">
        <Link
          to="/trails"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Todas as trilhas
        </Link>

        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: `${trail.color}1a`,
              boxShadow: `0 0 28px -6px ${trail.colorGlow}`,
            }}
          >
            <TrailIcon name={trail.icon} className="h-8 w-8" style={{ color: trail.color }} />
          </div>
          <div className="flex-1">
            <span className="kicker">{trail.tagline}</span>
            <h1 className="font-display mt-1.5 text-3xl font-bold sm:text-4xl">{trail.name}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {trail.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="pill">
            {prog.completed}/{prog.total} etapas
          </span>
          <span className="pill pill-glow">
            <Zap className="h-3.5 w-3.5" /> {earnedXP}/{totalTrailXP} XP
          </span>
          {prog.percent === 100 && <span className="pill">🏆 Trilha dominada</span>}
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${prog.percent}%`,
              background: trail.color,
              boxShadow: `0 0 10px ${trail.colorGlow}`,
            }}
          />
        </div>
      </header>

      <section
        className="animate-fade-up overflow-x-hidden pb-8"
        style={{ animationDelay: '120ms' }}
      >
        <TrailMap
          trail={trail}
          isTopicCompleted={isTopicCompleted}
          nextTopicId={nextTopic?.id ?? null}
        />
      </section>
    </div>
  )
}
