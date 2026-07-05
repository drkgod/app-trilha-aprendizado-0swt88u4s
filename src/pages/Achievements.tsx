import { Trophy } from 'lucide-react'
import { useAppStore, ACHIEVEMENTS } from '@/hooks/use-app-store'
import { cn } from '@/lib/utils'

export default function Achievements() {
  const { unlockedAchievements } = useAppStore()

  return (
    <div className="space-y-8">
      <header className="animate-fade-up">
        <span className="kicker">Sala de troféus</span>
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
          Conquistas{' '}
          <span className="text-primary text-glow">
            {unlockedAchievements.length}/{ACHIEVEMENTS.length}
          </span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Cada marco da jornada fica registrado aqui. As apagadas ainda esperam por você.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((ach, i) => {
          const unlocked = unlockedAchievements.includes(ach.id)
          return (
            <div
              key={ach.id}
              className={cn(
                'glass animate-fade-up flex items-center gap-4 p-5 transition-all',
                unlocked ? 'border-primary/25' : 'opacity-45 grayscale',
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div
                className={cn(
                  'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl',
                  unlocked ? 'bg-primary/12 bg-primary/10' : 'bg-secondary',
                )}
                style={
                  unlocked ? { boxShadow: '0 0 20px -6px hsl(151 100% 45% / 0.5)' } : undefined
                }
              >
                {unlocked ? ach.icon : <Trophy className="h-6 w-6 text-muted-foreground" />}
              </div>
              <div className="min-w-0">
                <h3 className="font-display truncate font-bold">{ach.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{ach.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
