import { Link, Outlet, useLocation } from 'react-router-dom'
import { Home, Compass, BookOpen, User, Search, Bell, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

export function Layout() {
  const location = useLocation()

  const navItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: BookOpen, label: 'Minhas Trilhas', path: '/my-paths' },
    { icon: Compass, label: 'Explorar', path: '/explore' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ]

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard'
    if (location.pathname.startsWith('/path/')) return 'Detalhes da Trilha'
    if (location.pathname.startsWith('/lesson/')) return 'Sala de Aula'
    return 'Trilha Learning'
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            T
          </div>
          <span className="font-bold text-lg tracking-tight">Trilha Learning</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <item.icon size={20} className={cn(isActive && 'text-primary')} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            <Settings size={20} />
            <span className="text-sm">Configurações</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-muted-foreground hover:bg-muted transition-colors mt-1">
            <LogOut size={20} />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
          <h1 className="font-semibold text-lg hidden sm:block">{getPageTitle()}</h1>

          <div className="flex items-center gap-4 ml-auto w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar aulas, trilhas..."
                className="pl-9 bg-muted/50 border-none h-10 w-full rounded-full"
              />
            </div>

            <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors hidden sm:block">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            <Avatar className="w-9 h-9 border cursor-pointer hidden sm:block">
              <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=42" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around p-2 pb-safe z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center p-2 min-w-[64px] transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <item.icon size={24} className={cn(isActive && 'animate-pop')} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
