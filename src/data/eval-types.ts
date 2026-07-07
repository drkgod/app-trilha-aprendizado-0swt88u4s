// Tipos e utilitários do sistema de avaliação (checkpoints + modo Avaliação).
// O banco de questões vive em eval-bank-*.ts, um arquivo por trilha.

export type EvalQuestionType = 'mc' | 'open'

export interface EvalQuestionMC {
  id: string
  type: 'mc'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface EvalQuestionOpen {
  id: string
  type: 'open'
  question: string
  /** Resposta-modelo usada como referência pela IA corretora (não é mostrada antes de responder). */
  expected: string
}

export type EvalQuestion = EvalQuestionMC | EvalQuestionOpen

export interface TrailEvalBank {
  trailId: string
  questions: EvalQuestion[]
}

// Sorteio Fisher-Yates — embaralha sem viés.
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Sorteia N questões do banco, evitando repetir as já vistas (para refazer com questões diferentes).
// Se o banco esgotar, permite repetir a partir das menos recentes.
export function drawQuestions(
  bank: EvalQuestion[],
  count: number,
  excludeIds: string[] = [],
): EvalQuestion[] {
  const fresh = bank.filter((q) => !excludeIds.includes(q.id))
  const pool = fresh.length >= count ? fresh : bank
  return shuffle(pool).slice(0, Math.min(count, pool.length))
}

// Embaralha as alternativas de uma questão de múltipla escolha, mantendo o índice correto coerente.
export function shuffleOptions(q: EvalQuestionMC): EvalQuestionMC {
  const indexed = q.options.map((opt, i) => ({ opt, i }))
  const shuffled = shuffle(indexed)
  return {
    ...q,
    options: shuffled.map((s) => s.opt),
    correctIndex: shuffled.findIndex((s) => s.i === q.correctIndex),
  }
}

// Selo de integridade calculado a partir dos sinais de tracking.
export type IntegritySeal = 'limpo' | 'suspeito' | 'alerta'

export function computeIntegritySeal(signals: {
  visibilitySwitches: number
  pasteBlocks: number
  copyBlocks: number
  avgSecondsPerQuestion: number
  openQuestionCount: number
}): IntegritySeal {
  const { visibilitySwitches, pasteBlocks, avgSecondsPerQuestion, openQuestionCount } = signals
  // Alerta: muitos sinais fortes de consulta externa.
  if (visibilitySwitches >= 4 || pasteBlocks >= 3) return 'alerta'
  // Suspeito: algum sinal, ou respostas rápidas demais em prova com discursivas.
  if (
    visibilitySwitches >= 1 ||
    pasteBlocks >= 1 ||
    (openQuestionCount > 0 && avgSecondsPerQuestion < 12)
  ) {
    return 'suspeito'
  }
  return 'limpo'
}

export const SEAL_LABEL: Record<IntegritySeal, string> = {
  limpo: 'Concluído sem sair da prova',
  suspeito: 'Alguns sinais de distração',
  alerta: 'Múltiplas saídas durante a prova',
}
