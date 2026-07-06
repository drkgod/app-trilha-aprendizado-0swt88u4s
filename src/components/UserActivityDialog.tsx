import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getTopicById } from '@/data/trails'
import type { ActivityLog } from '@/services/activity-logs'
import { Clock, Zap, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  userName: string
  logs: ActivityLog[]
}

function fmtDuration(s: number) {
  if (!s) return '0s'
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function UserActivityDialog({ open, onOpenChange, userName, logs }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-h-[85vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Atividades — {userName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          {logs.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nenhuma atividade registrada
            </p>
          ) : (
            logs.map((log) => {
              const { trail, topic } = getTopicById(log.trail_id, log.topic_id)
              const suspicious = log.is_completed && log.active_duration_seconds < 10
              return (
                <div
                  key={log.id}
                  className={cn(
                    'rounded-xl border p-3.5',
                    suspicious
                      ? 'border-red-500/40 bg-red-500/10'
                      : log.is_completed
                        ? 'border-primary/20 bg-primary/5'
                        : 'border-border bg-secondary/40',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {trail?.name ?? log.trail_id} — {topic?.title ?? log.topic_id}
                      </p>
                      <p className="text-xs text-muted-foreground">{fmtDate(log.start_time)}</p>
                    </div>
                    {suspicious ? (
                      <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-red-400">
                        <AlertTriangle className="h-3 w-3" /> Suspeito
                      </span>
                    ) : log.is_completed ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    ) : null}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Total: {fmtDuration(log.total_duration_seconds)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Ativo: {fmtDuration(log.active_duration_seconds)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> Trocas: {log.visibility_switches}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
