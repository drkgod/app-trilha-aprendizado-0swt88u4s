import {
  BrainCircuit,
  Terminal,
  Bot,
  Sparkles,
  GitBranch,
  Database,
  Rocket,
  Infinity as InfinityIcon,
  FileCode2,
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
  Infinity: InfinityIcon,
  FileCode2,
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
