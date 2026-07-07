import pb from '@/lib/pocketbase/client'

export interface EvalAttemptRecord {
  id: string
  user_id: string
  trail_id: string
  kind: 'checkpoint' | 'exam'
  checkpoint_key?: string
  question_count: number
  correct_count: number
  score_percent: number
  passed: boolean
  attempt_number: number
  total_duration_seconds: number
  active_duration_seconds: number
  visibility_switches: number
  paste_blocks: number
  copy_blocks: number
  integrity_seal: string
  started_at: string
  finished_at: string
  created: string
}

export interface EvalAnswerRecord {
  id: string
  user_id: string
  attempt_id: string
  question_id: string
  question_type: 'mc' | 'open'
  question_text?: string
  answer_text?: string
  answer_index?: number
  is_correct?: boolean
  ai_score?: number
  ai_verdict?: string
  ai_feedback?: string
  time_spent_seconds?: number
}

export interface GradeResult {
  score: number
  verdict: 'aprovado' | 'parcial' | 'reprovado'
  feedback: string
  errorId?: string
}

// Chama o hook de correção por IA (rota custom do Skip). A key da IA fica no gateway do Skip.
export const gradeOpenAnswer = async (
  question: string,
  expected: string,
  answer: string,
): Promise<GradeResult> => {
  try {
    const res = await pb.send('/backend/v1/grade-answer', {
      method: 'POST',
      body: { question, expected, answer },
    })
    return res as GradeResult
  } catch (e) {
    // Falha de rede/servidor: não trava o fluxo — marca como parcial para revisão.
    return {
      score: 50,
      verdict: 'parcial',
      feedback: 'A avaliação automática está indisponível. Sua resposta foi registrada.',
    }
  }
}

export const createAttempt = (data: Partial<EvalAttemptRecord>) =>
  pb.collection('eval_attempts').create<EvalAttemptRecord>(data)

export const saveAnswer = (data: Partial<EvalAnswerRecord>) =>
  pb.collection('eval_answers').create<EvalAnswerRecord>(data)

// Quantas vezes o usuário já tentou este checkpoint/exame (para o attempt_number e sorteio sem repetição).
export const countAttempts = async (
  userId: string,
  trailId: string,
  kind: 'checkpoint' | 'exam',
  checkpointKey?: string,
): Promise<number> => {
  try {
    const filter = checkpointKey
      ? pb.filter('user_id = {:u} && trail_id = {:t} && kind = {:k} && checkpoint_key = {:c}', {
          u: userId,
          t: trailId,
          k: kind,
          c: checkpointKey,
        })
      : pb.filter('user_id = {:u} && trail_id = {:t} && kind = {:k}', {
          u: userId,
          t: trailId,
          k: kind,
        })
    const list = await pb.collection('eval_attempts').getList<EvalAttemptRecord>(1, 1, { filter })
    return list.totalItems
  } catch (_) {
    return 0
  }
}

// Ids de questões que o usuário já viu neste checkpoint/exame (para sortear questões diferentes ao refazer).
export const getSeenQuestionIds = async (
  userId: string,
  trailId: string,
  kind: 'checkpoint' | 'exam',
  checkpointKey?: string,
): Promise<string[]> => {
  try {
    const attemptFilter = checkpointKey
      ? pb.filter('user_id = {:u} && trail_id = {:t} && kind = {:k} && checkpoint_key = {:c}', {
          u: userId,
          t: trailId,
          k: kind,
          c: checkpointKey,
        })
      : pb.filter('user_id = {:u} && trail_id = {:t} && kind = {:k}', {
          u: userId,
          t: trailId,
          k: kind,
        })
    const attempts = await pb
      .collection('eval_attempts')
      .getFullList<EvalAttemptRecord>({ filter: attemptFilter })
    if (attempts.length === 0) return []
    const ids = attempts.map((a) => a.id)
    const orFilter = ids.map((id) => `attempt_id = "${id}"`).join(' || ')
    const answers = await pb
      .collection('eval_answers')
      .getFullList<EvalAnswerRecord>({ filter: orFilter })
    return Array.from(new Set(answers.map((a) => a.question_id)))
  } catch (_) {
    return []
  }
}

// Admin: todas as tentativas (para o painel de acompanhamento).
export const getAllAttempts = () =>
  pb.collection('eval_attempts').getFullList<EvalAttemptRecord>({ sort: '-created' })
