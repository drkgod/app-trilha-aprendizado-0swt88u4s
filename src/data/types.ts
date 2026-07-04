export type Priority = 'alta' | 'media' | 'baixa'
export type TopicType = 'conceito' | 'pratica' | 'quiz'

export interface ReferenceLink {
  label: string
  url: string
}

export interface Topic {
  id: string
  index: number
  title: string
  priority: Priority
  type: TopicType
  shortDescription: string
  concept: string // detailed conceptual explanation
  references: ReferenceLink[] // official documentation links
  practiceSteps: string[] // step-by-step guide
  projectContext: string // how to apply in projects/consulting
  xp: number
}

export interface Trail {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  colorGlow: string
  description: string
  topics: Topic[]
}
