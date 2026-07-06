import { useState, useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { getUsers } from '@/services/users'
import { getAllActivityLogs, type ActivityLog } from '@/services/activity-logs'
import { trails } from '@/data/trails'
import { UserActivityDialog } from '@/components/UserActivityDialog'
import { Loader2, Zap, AlertTriangle, ChevronRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function fmtDuration(s: number) {
  if (!s) return '0s'
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`
}

export default function AdminAudit() {
  const { isAdmin } = useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [trailFilter, setTrailFilter] = useState('all')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false)
      return
    }
    const load = async () => {
      try {
        const [u, l] = await Promise.all([getUsers(), getAllActivityLogs()])
        setUsers(u.filter((u: any) => u.email?.endsWith('@adapta.org')))
        setLogs(l)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isAdmin])

  const filteredLogs = useMemo(
    () => (trailFilter === 'all' ? logs : logs.filter((l) => l.trail_id === trailFilter)),
    [logs, trailFilter],
  )

  const stats = useMemo(
    () =>
      users.map((u) => {
        const ul = filteredLogs.filter((l) => l.user_id === u.id)
        const done = ul.filter((l) => l.is_completed)
        const avg = done.length
          ? Math.round(done.reduce((s, l) => s + l.active_duration_seconds, 0) / done.length)
          : 0
        return {
          user: u,
          logs: ul,
          completed: done.length,
          sessions: ul.length,
          avgActive: avg,
          suspicious: done.filter((l) => l.active_duration_seconds < 10).length,
        }
      }),
    [users, filteredLogs],
  )

  const selectedUser = selectedUserId ? stats.find((s) => s.user.id === selectedUserId) : null
  const totalSuspicious = stats.reduce((s, st) => s + st.suspicious, 0)

  if (!isAdmin) return <Navigate to="/" replace />

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )

  return (
    <div className="animate-fade-in-up space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Auditoria de Engajamento</h1>
        <p className="mt-1 text-muted-foreground">Monitore tempo e engajamento dos consultores</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={trailFilter} onValueChange={setTrailFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por trilha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as trilhas</SelectItem>
            {trails.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {totalSuspicious > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-400">
            <AlertTriangle className="h-3.5 w-3.5" /> {totalSuspicious} atividade(s) suspeita(s)
          </span>
        )}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Consultor</th>
                <th className="px-4 py-3 text-center">Concluídos</th>
                <th className="px-4 py-3 text-center">Sessões</th>
                <th className="px-4 py-3 text-center">Tempo Ativo Médio</th>
                <th className="px-4 py-3 text-center">Suspeitas</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {stats.map((s) => (
                <tr key={s.user.id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{s.user.name || 'Sem nome'}</div>
                    <div className="text-xs text-muted-foreground">{s.user.email}</div>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold">{s.completed}</td>
                  <td className="px-4 py-3 text-center">{s.sessions}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1">
                      <Zap className="h-3 w-3 text-primary" />
                      {fmtDuration(s.avgActive)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.suspicious > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-bold text-red-400">
                        <AlertTriangle className="h-3 w-3" />
                        {s.suspicious}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedUserId(s.user.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      Ver <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserActivityDialog
        open={!!selectedUserId}
        onOpenChange={(o) => !o && setSelectedUserId(null)}
        userName={selectedUser?.user.name || selectedUser?.user.email || ''}
        logs={selectedUser?.logs || []}
      />
    </div>
  )
}
