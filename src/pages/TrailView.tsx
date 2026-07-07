import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Zap, ShieldCheck } from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { getTrailById } from '@/data/trails'
import { hasEvalBank } from '@/data/eval-banks'
import { TrailMap } from '@/components/TrailMap'
import { TrailTutor } from '@/components/TrailTutor'
import { TrailIcon } from '@/components/TrailIcon'

export default function TrailView() {
  const { trailId } = useParams<{ trailId: string }>()
  const { isTopicCompleted, isTopicUnlocked, getTrailProgress, getNextTopic } = useAppStore()

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
          isTopicUnlocked={isTopicUnlocked}
          nextTopicId={nextTopic?.id ?? null}
        />
      </section>

      <TrailTutor trail={trail} />

      {hasEvalBank(trail.id) && (
        <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="glass flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Modo Avaliação</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  A prova séria da trilha: questões sorteadas de um banco extenso, com discursivas
                  avaliadas por IA e selo de integridade.
                </p>
              </div>
            </div>
            <Link
              to={`/trail/${trail.id}/exam`}
              className="btn-glow inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold"
            >
              <ShieldCheck className="h-4 w-4" /> Fazer avaliação
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
