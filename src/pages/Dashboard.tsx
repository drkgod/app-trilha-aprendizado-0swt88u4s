import { Link } from 'react-router-dom'
import { Flame, Target, Zap, ChevronRight, BookOpen, CheckCircle2, Trophy } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useAppStore, ACHIEVEMENTS } from '@/hooks/use-app-store'
import { ConfettiEffect } from '@/components/ConfettiEffect'

export default function Dashboard() {
  const { user } = useAuth()
  const {
    trails,
    totalXP,
    streak,
    levelInfo,
    todayCompleted,
    dailyGoal,
    getTrailProgress,
    getNextTopic,
    getOverallProgress,
    unlockedAchievements,
    newAchievement,
    clearNewAchievement,
  } = useAppStore()

  const overall = getOverallProgress()
  const firstName = user?.name?.split(' ')[0] || 'Consultor'
  const dailyPercent = Math.min(100, Math.round((todayCompleted / dailyGoal) * 100))
  const circumference = 2 * Math.PI * 42
  const dashOffset = circumference - (dailyPercent / 100) * circumference

  // Find the trail with most progress to suggest continuing
  const trailsWithProgress = trails.map((t) => ({ ...t, progress: getTrailProgress(t.id) }))
  const activeTrail =
    trailsWithProgress.find((t) => t.progress.percent > 0 && t.progress.percent < 100) ||
    trailsWithProgress[0]
  const nextTopic = activeTrail ? getNextTopic(activeTrail.id) : null

  return (
    <div className="space-y-8 animate-fade-in-up pb-20 lg:pb-0">
      {/* Achievement popup */}
      {newAchievement && (
        <>
          <ConfettiEffect />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={clearNewAchievement}
          >
            <div
              className="glass-card p-8 max-w-sm mx-4 text-center animate-pop-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">{newAchievement.icon}</div>
              <h3 className="text-2xl font-bold mb-2">Conquista Desbloqueada!</h3>
              <p className="text-primary font-semibold text-lg mb-1">{newAchievement.title}</p>
              <p className="text-muted-foreground text-sm mb-6">{newAchievement.description}</p>
              <button
                onClick={clearNewAchievement}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm"
              >
                Continuar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Olá, {firstName}! <span className="inline-block animate-pop-in">👋</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            {todayCompleted >= dailyGoal
              ? 'Você bateu a meta de hoje! Continue assim 🌟'
              : 'Pronto para avançar na sua jornada hoje?'}
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Daily Progress Ring */}
        <div className="stat-card col-span-2 sm:col-span-1">
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(228 16% 18%)"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(160 84% 44%)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
              {todayCompleted}/{dailyGoal}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Meta Diária</p>
            <p className="font-bold text-sm">{dailyPercent}%</p>
          </div>
        </div>

        {/* Streak */}
        <div className="stat-card">
          <div className="text-2xl animate-flame">🔥</div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Ofensiva</p>
            <p className="font-bold text-sm">
              {streak} {streak === 1 ? 'dia' : 'dias'}
            </p>
          </div>
        </div>

        {/* Total XP */}
        <div className="stat-card">
          <Zap size={20} className="text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground font-medium">XP Total</p>
            <p className="font-bold text-sm">{totalXP.toLocaleString()}</p>
          </div>
        </div>

        {/* Level */}
        <div className="stat-card">
          <span className="text-2xl">{levelInfo.icon}</span>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Nível {levelInfo.level}</p>
            <p className="font-bold text-sm">{levelInfo.title}</p>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      {nextTopic && activeTrail && (
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Target size={18} className="text-primary" />
            Continue de onde parou
          </h2>
          <Link to={`/trail/${activeTrail.id}/topic/${nextTopic.id}`} className="block">
            <div className="glass-card-hover p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: `${activeTrail.color}15`,
                  border: `1px solid ${activeTrail.color}30`,
                }}
              >
                {activeTrail.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="eyebrow" style={{ color: activeTrail.color }}>
                    {activeTrail.name}
                  </span>
                  <span className={`badge-${nextTopic.priority}`}>{nextTopic.priority}</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg truncate">{nextTopic.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                  {nextTopic.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary flex-shrink-0">
                <span className="text-sm font-medium hidden sm:block">Continuar</span>
                <ChevronRight size={20} />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Trail Cards Grid */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-primary" />
          Suas Trilhas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trails.map((trail, i) => {
            const progress = getTrailProgress(trail.id)
            return (
              <Link
                key={trail.id}
                to={`/trail/${trail.id}`}
                className={`glass-card-hover p-5 flex flex-col gap-4 animate-fade-in-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${trail.color}12`, border: `1px solid ${trail.color}25` }}
                  >
                    {trail.icon}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {progress.completed}/{progress.total}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: trail.color }}>
                    {trail.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{trail.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${progress.percent}%`, background: trail.color }}
                    />
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground mt-1.5">
                    {progress.percent}% completo
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Overall Progress */}
      <section className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Progresso Geral</h2>
          <span className="text-2xl font-bold text-gradient">{overall.percent}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 rounded-full transition-all duration-1000"
            style={{ width: `${overall.percent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{overall.completed} tópicos concluídos</span>
          <span>{overall.total - overall.completed} restantes</span>
        </div>
      </section>

      {/* Recent Achievements */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Trophy size={18} className="text-amber-400" />
            Conquistas
          </h2>
          <Link to="/achievements" className="text-sm text-primary font-medium hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {ACHIEVEMENTS.slice(0, 6).map((ach) => {
            const unlocked = unlockedAchievements.includes(ach.id)
            return (
              <div
                key={ach.id}
                className={`glass-card p-3 text-center transition-all ${
                  unlocked ? 'border-primary/20' : 'opacity-40 grayscale'
                }`}
              >
                <div className={`text-2xl mb-1 ${unlocked ? '' : 'blur-[2px]'}`}>{ach.icon}</div>
                <p className="text-[10px] font-medium truncate">{ach.title}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
