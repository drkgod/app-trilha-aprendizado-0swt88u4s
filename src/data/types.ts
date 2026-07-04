/* Tipos centrais do domínio da trilha de aprendizado */
import type { LucideIcon } from 'lucide-react'

export type NodeKind = 'lesson' | 'boss'

export interface QuizQuestion {
  q: string
  options: string[]
  correct: number
  explain: string
}

export interface TrailNode {
  id: string
  title: string
  kind: NodeKind
  xp: number
  minutes: number
  why: string
  content: string[]
  practice: string[]
  scope: string
  links: { label: string; url: string }[]
  quiz: QuizQuestion[]
  checklist?: string[]
}

export interface Trail {
  id: string
  order: number
  title: string
  tagline: string
  color: string
  icon: LucideIcon
  nodes: TrailNode[]
}

export interface BadgeDef {
  id: string
  title: string
  description: string
  emoji: string
}

export interface LevelDef {
  level: number
  title: string
  minXp: number
}

export interface Profile {
  id: string
  name: string
  emoji: string
}

export interface ProgressState {
  xp: number
  completed: string[]
  perfect: string[]
  badges: string[]
  streak: number
  lastDay: string
  dailyDay: string
  dailyCount: number
}

export interface CompletionResult {
  gainedXp: number
  newBadges: BadgeDef[]
  leveledUp: boolean
  newLevelTitle: string
  dailyDone: boolean
}
