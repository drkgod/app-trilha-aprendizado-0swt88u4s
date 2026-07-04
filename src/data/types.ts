export type Priority = 'alta' | 'media' | 'baixa'
export type TopicType = 'conceito' | 'pratica' | 'missao' | 'boss'
export type RefKind = 'doc' | 'curso' | 'video' | 'artigo' | 'tool'

export interface ReferenceLink {
  label: string
  url: string
  kind: RefKind
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Topic {
  id: string
  index: number
  title: string
  priority: Priority
  type: TopicType
  shortDescription: string
  /** Parágrafo denso de abertura — o "por que isso importa" para um consultor sênior. */
  concept: string
  /** Blocos de aprofundamento técnico, cada string é um parágrafo/bullet denso. */
  deepDive: string[]
  /** Erros clássicos e pegadinhas de campo. */
  pitfalls: string[]
  /** Checklist de prática — passos verificáveis. */
  practiceSteps: string[]
  /** Como isso aparece num projeto real de consultoria (mapeamento de processos, criação de projetos com IA). */
  projectContext: string
  /** Curadoria de materiais — docs oficiais, cursos, artigos. */
  references: ReferenceLink[]
  xp: number
  /** Estimativa de minutos de estudo. */
  estMinutes: number
}

export interface Trail {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  colorGlow: string
  tagline: string
  description: string
  topics: Topic[]
}
