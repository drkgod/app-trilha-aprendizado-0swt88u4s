import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Map, Trophy, LogOut, Shield, Menu, X } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useAppStore } from '@/hooks/use-app-store'
import { useState } from 'react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trails', icon: Map, label: 'Trilhas' },
  { to: '/achievements', icon: Trophy, label: 'Conquistas' },
]

export function Layout() {
  const { user, signOut, isAdmin } = useAuth()
  const { levelInfo, totalXP } = useAppStore()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-border/50 glass-card rounded-none min-h-screen fixed left-0 top-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <h1
                className="font-bold text-lg tracking-tight"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                Antigravity
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium tracking-wider uppercase">
                Trilha de Aprendizado
              </p>
            </div>
          </div>
        </div>

        {/* User card */}
        <div className="p-4 mx-4 mt-4 rounded-xl bg-secondary/30 border border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
              {levelInfo.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name || 'Consultor'}</p>
              <p className="text-xs text-muted-foreground">
                Nv.{levelInfo.level} · {levelInfo.title}
              </p>
            </div>
          </div>
          {/* XP Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] font-medium text-muted-foreground mb-1">
              <span>{totalXP} XP</span>
              <span>{levelInfo.progress}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${levelInfo.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`
              }
            >
              <Shield size={18} />
              Admin
            </NavLink>
          )}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-border/30">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/5 w-full transition-all"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-border/50 glass-card rounded-none sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚀</span>
          <h1 className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>
            Antigravity
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">Nv.{levelInfo.level}</span>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] z-40 glass-card rounded-none border-b border-border/50 p-4 space-y-1 animate-fade-in">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground"
            >
              <Shield size={18} /> Admin
            </NavLink>
          )}
          <button
            onClick={() => {
              signOut()
              setMobileMenuOpen(false)
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 w-full"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 glass-card rounded-none border-t border-border/50 flex z-40">
        {navItems.map((item) => {
          const isActive =
            item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={`flex-1 flex flex-col items-center py-3 gap-1 text-[10px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
