import { Link } from 'react-router-dom'
import { Check, Lock, Star, Swords } from 'lucide-react'
import type { Trail, Topic } from '@/data/types'
import { cn } from '@/lib/utils'

interface TrailMapProps {
  trail: Trail
  isTopicCompleted: (topicId: string) => boolean
  isTopicUnlocked: (trailId: string, topicId: string) => boolean
  nextTopicId: string | null
}

const WIDTH = 360
const ROW_H = 116
const OFFSETS = [0, 72, 108, 72, 0, -72, -108, -72]

function nodePos(index: number) {
  return {
    x: WIDTH / 2 + OFFSETS[index % OFFSETS.length],
    y: index * ROW_H + 70,
  }
}

export function TrailMap({ trail, isTopicCompleted, isTopicUnlocked, nextTopicId }: TrailMapProps) {
  const topics = trail.topics
  const height = (topics.length - 1) * ROW_H + 140

  const points = topics.map((_, i) => nodePos(i))
  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const prev = points[i - 1]
      const midY = (prev.y + p.y) / 2
      return `C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
    })
    .join(' ')

  const lastDoneIndex = topics.reduce((acc, t, i) => (isTopicCompleted(t.id) ? i : acc), -1)

  return (
    <div className="relative mx-auto" style={{ width: WIDTH, height }}>
      <svg width={WIDTH} height={height} className="absolute inset-0" aria-hidden="true">
        <path
          d={pathD}
          fill="none"
          stroke="hsl(156 15% 15%)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="1 14"
        />
        {lastDoneIndex >= 0 && (
          <path
            d={points
              .slice(0, lastDoneIndex + 1)
              .map((p, i) => {
                if (i === 0) return `M ${p.x} ${p.y}`
                const prev = points[i - 1]
                const midY = (prev.y + p.y) / 2
                return `C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
              })
              .join(' ')}
            fill="none"
            stroke={trail.color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="1 14"
            className="animate-dash"
            style={{ filter: `drop-shadow(0 0 6px ${trail.colorGlow})` }}
          />
        )}
      </svg>

      {topics.map((topic, i) => {
        const pos = points[i]
        const done = isTopicCompleted(topic.id)
        const isNext = topic.id === nextTopicId
        const isBoss = topic.type === 'boss'
        const unlocked = isTopicUnlocked(trail.id, topic.id)
        const upcoming = !done && !isNext
        const locked = !unlocked && !done

        const inner = (
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'relative flex items-center justify-center rounded-full border-2 transition-transform duration-200 group-hover:scale-110 group-active:scale-95',
                isBoss ? 'h-[74px] w-[74px]' : 'h-[58px] w-[58px]',
                done && 'border-transparent',
                isNext && 'animate-pulse-glow border-transparent',
                upcoming && 'border-border bg-secondary/60',
              )}
              style={
                done
                  ? { background: trail.color, boxShadow: `0 0 22px -4px ${trail.colorGlow}` }
                  : isNext
                    ? {
                        background: `linear-gradient(135deg, ${trail.color}, ${trail.color}cc)`,
                        boxShadow: `0 0 28px -2px ${trail.colorGlow}`,
                      }
                    : undefined
              }
            >
              {done ? (
                isBoss ? (
                  <Star className="h-7 w-7 fill-background text-background" />
                ) : (
                  <Check className="h-6 w-6 text-background" strokeWidth={3.5} />
                )
              ) : isBoss ? (
                <Swords
                  className={cn('h-7 w-7', isNext ? 'text-background' : 'text-muted-foreground')}
                />
              ) : isNext ? (
                <span className="font-display text-lg font-bold text-background">
                  {topic.index}
                </span>
              ) : (
                <Lock className="h-4.5 w-4.5 h-5 w-5 text-muted-foreground/60" />
              )}

              {isNext && (
                <span
                  className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-background"
                  style={{ background: trail.color }}
                >
                  {isBoss ? 'Boss!' : 'Começar'}
                </span>
              )}
            </div>

            <span
              className={cn(
                'mt-2 max-w-[150px] text-center text-[11px] font-semibold leading-tight',
                done
                  ? 'text-foreground/80'
                  : isNext
                    ? 'text-foreground'
                    : 'text-muted-foreground/70',
              )}
            >
              {isBoss ? topic.title.replace('BOSS: ', '').replace('BOSS FINAL: ', '') : topic.title}
            </span>
            <span className="mt-0.5 text-[10px] font-medium text-muted-foreground/60">
              {isBoss ? '⚔️ Boss' : `Etapa ${topic.index}`} · +{topic.xp} XP
            </span>
          </div>
        )

        const wrapperClass = 'group absolute -translate-x-1/2 -translate-y-1/2'
        const wrapperStyle = { left: pos.x, top: pos.y }

        if (locked) {
          return (
            <div
              key={topic.id}
              className={cn(wrapperClass, 'cursor-not-allowed')}
              style={wrapperStyle}
              title="Conclua as etapas anteriores para desbloquear"
              aria-disabled="true"
            >
              {inner}
            </div>
          )
        }

        return (
          <Link
            key={topic.id}
            to={`/trail/${trail.id}/topic/${topic.id}`}
            className={wrapperClass}
            style={wrapperStyle}
          >
            {inner}
          </Link>
        )
      })}
    </div>
  )
}
