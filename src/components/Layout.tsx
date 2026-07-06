import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { Activity, Flame, Home, Map, Trophy, Shield, LogOut, Zap, Settings } from 'lucide-react'
import brandLogo from '@/assets/yj4kqowzrp9i82gt0moaelynprc-3747b.svg'
import { useAuth } from '@/hooks/use-auth'
import { useAppStore } from '@/hooks/use-app-store'
import { ConfettiEffect } from '@/components/ConfettiEffect'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const navItems = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/trails', label: 'Trilhas', icon: Map, end: false },
  { to: '/achievements', label: 'Conquistas', icon: Trophy, end: false },
]

export function Layout() {
  const { isAdmin, signOut } = useAuth()
  const { totalXP, streak, levelInfo, newAchievement, clearNewAchievement } = useAppStore()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-3">
          <NavLink to="/" className="flex items-center" aria-label="Página inicial">
            <img src={brandLogo} alt="Trilha Native" className="h-5 w-auto sm:h-6" />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  cn(
                    'flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )
                }
              >
                <Shield className="h-4 w-4" />
                Admin
              </NavLink>
            )}
            {isAdmin && (
              <NavLink
                to="/admin/audit"
                className={({ isActive }) =>
                  cn(
                    'flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )
                }
              >
                <Activity className="h-4 w-4" />
                Auditoria
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <span className="pill" title="Sequência de dias">
              <Flame
                className={cn(
                  'h-3.5 w-3.5',
                  streak > 0 ? 'text-orange-400' : 'text-muted-foreground',
                )}
              />
              {streak}
            </span>
            <span className="pill pill-glow" title="XP total">
              <Zap className="h-3.5 w-3.5" />
              {totalXP.toLocaleString('pt-BR')} XP
            </span>
            <span className="pill hidden sm:inline-flex" title={`Nível ${levelInfo.level}`}>
              {levelInfo.icon} {levelInfo.title}
            </span>
            <Link
              to="/account/email"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title="Configurações"
            >
              <Settings className="h-4 w-4" />
            </Link>
            <button
              onClick={handleSignOut}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container pb-28 pt-8 md:pb-16">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden">
        <div className="flex h-16 items-center justify-around px-2">
          {[
            ...navItems,
            ...(isAdmin
              ? [
                  { to: '/admin', label: 'Admin', icon: Shield, end: false },
                  { to: '/admin/audit', label: 'Auditoria', icon: Activity, end: false },
                ]
              : []),
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex h-12 min-w-16 flex-col items-center justify-center gap-0.5 rounded-xl px-3 text-[10px] font-bold uppercase tracking-wide transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Achievement unlock dialog */}
      <Dialog open={!!newAchievement} onOpenChange={(open) => !open && clearNewAchievement()}>
        <DialogContent className="glass max-w-sm border-primary/30 text-center">
          {newAchievement && (
            <>
              <ConfettiEffect />
              <DialogHeader className="items-center">
                <div className="animate-pop mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-5xl animate-pulse-glow">
                  {newAchievement.icon}
                </div>
                <span className="kicker justify-center">Conquista desbloqueada</span>
                <DialogTitle className="font-display text-2xl">{newAchievement.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {newAchievement.description}
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={clearNewAchievement}
                className="btn-glow mx-auto mt-2 h-11 w-full font-semibold"
              >
                Continuar
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
