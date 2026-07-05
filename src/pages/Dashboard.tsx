import { useMemo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Play, Trophy, Zap } from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { useAuth } from '@/hooks/use-auth'
import { DailyGoalRing } from '@/components/DailyGoalRing'
import { ConfettiEffect } from '@/components/ConfettiEffect'
import { TrailIcon } from '@/components/TrailIcon'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'

export default function Dashboard() {
  const { user } = useAuth()
  const {
    trails,
    loading,
    totalXP,
    streak,
    dailyGoal,
    todayCompleted,
    levelInfo,
    getTrailProgress,
    getNextTopic,
    getOverallProgress,
    unlockedAchievements,
  } = useAppStore()

  const [celebrate, setCelebrate] = useState(false)
  const goalDone = todayCompleted >= dailyGoal && dailyGoal > 0

  useEffect(() => {
    if (goalDone) {
      setCelebrate(true)
      const t = setTimeout(() => setCelebrate(false), 2500)
      return () => clearTimeout(t)
    }
  }, [goalDone])

  const overall = getOverallProgress()

  const continueTarget = useMemo(() => {
    for (const trail of trails) {
      const prog = getTrailProgress(trail.id)
      if (prog.completed > 0 && prog.percent < 100) {
        const next = getNextTopic(trail.id)
        if (next) return { trail, topic: next }
      }
    }
    for (const trail of trails) {
      const next = getNextTopic(trail.id)
      if (next) return { trail, topic: next }
    }
    return null
  }, [trails, getTrailProgress, getNextTopic])

  const firstName = (user?.name || user?.email || 'Consultor').split(/[\s@]/)[0]

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {celebrate && <ConfettiEffect />}

      {/* Hero */}
      <section className="animate-fade-up">
        <span className="kicker">Sua jornada</span>
        <h1 className="font-display mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          E aí, <span className="capitalize">{firstName}</span>.{' '}
          {goalDone ? (
            <span className="text-primary text-glow">Dia concluído. 🔥</span>
          ) : (
            <>
              Bora <span className="text-primary text-glow">evoluir hoje?</span>
            </>
          )}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="pill pill-glow">
            <Zap className="h-3.5 w-3.5" /> {totalXP.toLocaleString('pt-BR')} XP
          </span>
          <span className="pill">
            <Flame className="h-3.5 w-3.5 text-orange-400" /> {streak}{' '}
            {streak === 1 ? 'dia' : 'dias'} de sequência
          </span>
          <span className="pill">
            {levelInfo.icon} Nível {levelInfo.level} · {levelInfo.title}
          </span>
          <span className="pill">
            <Trophy className="h-3.5 w-3.5 text-amber-400" /> {unlockedAchievements.length}{' '}
            conquistas
          </span>
        </div>
      </section>

      {/* Daily goal + Continue */}
      <section className="grid gap-4 md:grid-cols-5">
        <div
          className="glass animate-fade-up flex items-center gap-6 p-6 md:col-span-2"
          style={{ animationDelay: '80ms' }}
        >
          <DailyGoalRing completed={todayCompleted} goal={dailyGoal} />
          <div>
            <span className="kicker">Meta diária</span>
            <h2 className="font-display mt-2 text-xl font-bold">
              {goalDone
                ? 'Você concluiu seu dia!'
                : `Faltam ${Math.max(0, dailyGoal - todayCompleted)} etapas`}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {goalDone
                ? 'Sequência protegida. Amanhã tem mais.'
                : 'Complete etapas para manter a chama acesa.'}
            </p>
          </div>
        </div>

        {continueTarget ? (
          <Link
            to={`/trail/${continueTarget.trail.id}/topic/${continueTarget.topic.id}`}
            className="glass glass-hover animate-fade-up group flex items-center gap-5 p-6 md:col-span-3"
            style={{ animationDelay: '140ms' }}
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: `${continueTarget.trail.color}1a`,
                boxShadow: `0 0 24px -8px ${continueTarget.trail.colorGlow}`,
              }}
            >
              <TrailIcon
                name={continueTarget.trail.icon}
                className="h-8 w-8"
                style={{ color: continueTarget.trail.color }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="kicker">Continuar de onde parou</span>
              <h2 className="font-display mt-1.5 truncate text-lg font-bold sm:text-xl">
                {continueTarget.topic.title}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {continueTarget.trail.name} · Etapa {continueTarget.topic.index} · +
                {continueTarget.topic.xp} XP
              </p>
            </div>
            <div className="btn-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-primary-foreground text-primary-foreground" />
            </div>
          </Link>
        ) : (
          <div className="glass animate-fade-up flex items-center justify-center p-6 md:col-span-3">
            <p className="text-center font-display text-xl font-bold">
              🏆 Você completou TUDO. Lendário.
            </p>
          </div>
        )}
      </section>

      {/* Overall progress */}
      <section className="glass animate-fade-up p-6" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between">
          <span className="kicker">Progresso geral</span>
          <span className="font-display text-sm font-bold text-primary">
            {overall.completed}/{overall.total} etapas · {overall.percent}%
          </span>
        </div>
        <Progress value={overall.percent} className="mt-3 h-2.5" />
      </section>

      {/* Trails grid */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="kicker">As 7 trilhas</span>
            <h2 className="font-display mt-2 text-2xl font-bold sm:text-3xl">
              Escolha seu caminho
            </h2>
          </div>
          <Link
            to="/trails"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trails.map((trail, i) => {
            const prog = getTrailProgress(trail.id)
            return (
              <Link
                key={trail.id}
                to={`/trail/${trail.id}`}
                className="glass glass-hover animate-fade-up flex flex-col p-5"
                style={{ animationDelay: `${240 + i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${trail.color}1a` }}
                  >
                    <TrailIcon
                      name={trail.icon}
                      className="h-6 w-6"
                      style={{ color: trail.color }}
                    />
                  </div>
                  <span className="pill text-[10px]">
                    {prog.completed}/{prog.total}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg font-bold">{trail.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{trail.tagline}</p>
                <div className="mt-4">
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${prog.percent}%`,
                        background: trail.color,
                        boxShadow: `0 0 8px ${trail.colorGlow}`,
                      }}
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
