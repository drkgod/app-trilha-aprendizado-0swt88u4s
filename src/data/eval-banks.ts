import type { EvalQuestion } from './eval-types'
import { compoundEvalBank } from './eval-bank-compound'

// Registry: liga cada trilha ao seu banco de questões de avaliação.
// À medida que os bancos das outras trilhas forem escritos, importe e registre aqui.
const banks: Record<string, EvalQuestion[]> = {
  compound: compoundEvalBank,
}

export function getEvalBank(trailId: string): EvalQuestion[] {
  return banks[trailId] ?? []
}

export function hasEvalBank(trailId: string): boolean {
  return (banks[trailId]?.length ?? 0) > 0
}

// Configuração dos checkpoints e do exame por trilha.
export const CHECKPOINT_EVERY = 3 // um checkpoint a cada 3 blocos concluídos
export const CHECKPOINT_QUESTIONS = 4
export const CHECKPOINT_PASS_PERCENT = 70
export const CHECKPOINT_SECONDS = 45

export const EXAM_QUESTIONS = 12
export const EXAM_PASS_PERCENT = 75
export const EXAM_SECONDS = 60
