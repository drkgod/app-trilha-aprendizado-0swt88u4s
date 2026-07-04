import { Link } from 'react-router-dom'
import { useAppStore } from '@/hooks/use-app-store'
import { trails, totalTopics } from '@/data/trails'
import { ChevronRight, BookOpen } from 'lucide-react'

export default function TrailsList() {
  const { getTrailProgress } = useAppStore()

  return (
    <div className="space-y-6 animate-fade-in-up pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <BookOpen className="text-primary" /> Todas as Trilhas
        </h1>
        <p className="text-muted-foreground mt-1">
          {trails.length} trilhas · {totalTopics} tópicos · Do mapeamento de processos ao domínio
          completo da stack
        </p>
      </div>

      <div className="space-y-4">
        {trails.map((trail, i) => {
          const progress = getTrailProgress(trail.id)
          const alta = trail.topics.filter((t) => t.priority === 'alta').length
          const media = trail.topics.filter((t) => t.priority === 'media').length
          const baixa = trail.topics.filter((t) => t.priority === 'baixa').length

          return (
            <Link
              key={trail.id}
              to={`/trail/${trail.id}`}
              className="glass-card-hover p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: `${trail.color}12`, border: `1px solid ${trail.color}25` }}
              >
                {trail.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold" style={{ color: trail.color }}>
                  {trail.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {trail.description}
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {trail.topics.length} tópicos
                  </span>
                  <span className="badge-alta">{alta} alta</span>
                  <span className="badge-media">{media} média</span>
                  <span className="badge-baixa">{baixa} baixa</span>
                </div>
                <div className="mt-3">
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden w-full max-w-xs">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${progress.percent}%`, background: trail.color }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {progress.completed}/{progress.total} · {progress.percent}%
                  </p>
                </div>
              </div>
              <ChevronRight
                size={20}
                className="text-muted-foreground flex-shrink-0 hidden sm:block"
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
