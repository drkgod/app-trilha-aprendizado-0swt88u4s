import { useAppStore, ACHIEVEMENTS } from '@/hooks/use-app-store'
import { Trophy, Zap, Flame, CheckCircle2, Target } from 'lucide-react'

export default function Achievements() {
  const { unlockedAchievements, totalXP, streak, longestStreak, getOverallProgress } = useAppStore()
  const overall = getOverallProgress()

  return (
    <div className="space-y-8 animate-fade-in-up pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <Trophy className="text-amber-400" /> Conquistas
        </h1>
        <p className="text-muted-foreground mt-1">
          Desbloqueie badges completando tópicos e mantendo consistência
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="stat-card">
          <Zap size={20} className="text-amber-400" />
          <div>
            <p className="text-xs text-muted-foreground">XP Total</p>
            <p className="font-bold">{totalXP.toLocaleString()}</p>
          </div>
        </div>
        <div className="stat-card">
          <Flame size={20} className="text-orange-400" />
          <div>
            <p className="text-xs text-muted-foreground">Maior Ofensiva</p>
            <p className="font-bold">{longestStreak} dias</p>
          </div>
        </div>
        <div className="stat-card">
          <CheckCircle2 size={20} className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Tópicos</p>
            <p className="font-bold">
              {overall.completed}/{overall.total}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <Target size={20} className="text-purple-400" />
          <div>
            <p className="text-xs text-muted-foreground">Conquistas</p>
            <p className="font-bold">
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACHIEVEMENTS.map((ach, i) => {
          const unlocked = unlockedAchievements.includes(ach.id)
          return (
            <div
              key={ach.id}
              className={`glass-card p-5 flex items-start gap-4 transition-all animate-fade-in-up ${
                unlocked ? 'border-primary/20' : 'opacity-50 grayscale'
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                  unlocked
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-secondary border border-border'
                }`}
              >
                {unlocked ? ach.icon : '🔒'}
              </div>
              <div>
                <h3 className="font-bold text-sm">{ach.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{ach.description}</p>
                {unlocked && (
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-primary uppercase tracking-wider">
                    <CheckCircle2 size={12} /> Desbloqueado
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
