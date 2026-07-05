interface DailyGoalRingProps {
  completed: number
  goal: number
  size?: number
}

export function DailyGoalRing({ completed, goal, size = 148 }: DailyGoalRingProps) {
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const percent = goal > 0 ? Math.min(1, completed / goal) : 0
  const offset = circumference * (1 - percent)
  const done = completed >= goal && goal > 0

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(156 15% 13%)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(151 100% 45%)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.34, 1.2, 0.64, 1)',
            filter: done
              ? 'drop-shadow(0 0 10px hsl(151 100% 45% / 0.8))'
              : 'drop-shadow(0 0 6px hsl(151 100% 45% / 0.4))',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {done ? (
          <>
            <span className="text-3xl">🎉</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Dia concluído
            </span>
          </>
        ) : (
          <>
            <span className="font-display text-3xl font-bold text-foreground">
              {completed}
              <span className="text-lg text-muted-foreground">/{goal}</span>
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              etapas hoje
            </span>
          </>
        )}
      </div>
    </div>
  )
}
