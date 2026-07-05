import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { totalTopics } from '@/data/trails'
import { TrailIcon } from '@/components/TrailIcon'

export default function TrailsList() {
  const { trails, getTrailProgress } = useAppStore()

  return (
    <div className="space-y-8">
      <header className="animate-fade-up">
        <span className="kicker">Programa completo</span>
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
          7 trilhas, <span className="text-primary text-glow">{totalTopics} etapas</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Do fundamento ao projeto entregue: cada trilha termina num boss. Complete etapas, acumule
          XP e mantenha a sequência viva.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {trails.map((trail, i) => {
          const prog = getTrailProgress(trail.id)
          const estMinutes = trail.topics.reduce((s, t) => s + t.estMinutes, 0)
          return (
            <Link
              key={trail.id}
              to={`/trail/${trail.id}`}
              className="glass glass-hover animate-fade-up group flex flex-col p-6"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: `${trail.color}1a`,
                    boxShadow: `0 0 20px -8px ${trail.colorGlow}`,
                  }}
                >
                  <TrailIcon name={trail.icon} className="h-7 w-7" style={{ color: trail.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-xl font-bold">{trail.name}</h2>
                    {prog.percent === 100 && (
                      <span className="text-lg" title="Trilha completa">
                        🏆
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium" style={{ color: trail.color }}>
                    {trail.tagline}
                  </p>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {trail.description}
              </p>

              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="pill text-[10px]">
                  {prog.completed}/{prog.total} etapas
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> ~{Math.round(estMinutes / 60)}h
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Abrir mapa <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${prog.percent}%`,
                    background: trail.color,
                    boxShadow: `0 0 8px ${trail.colorGlow}`,
                  }}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
