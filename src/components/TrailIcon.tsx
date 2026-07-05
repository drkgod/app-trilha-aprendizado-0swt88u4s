import {
  BrainCircuit,
  Terminal,
  Bot,
  Sparkles,
  GitBranch,
  Database,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  BrainCircuit,
  Terminal,
  Bot,
  Sparkles,
  GitBranch,
  Database,
  Rocket,
}

export function TrailIcon({
  name,
  className,
  style,
}: {
  name: string
  className?: string
  style?: React.CSSProperties
}) {
  const Icon = iconMap[name] ?? Sparkles
  return <Icon className={className} style={style} />
}
