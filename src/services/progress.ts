import pb from '@/lib/pocketbase/client'

export interface ProgressRecord {
  id: string
  user_id: string
  topic_id: string
  trail_id: string
  xp_earned: number
  completed_at: string
  created: string
}

export interface StreakRecord {
  id: string
  user_id: string
  current_streak: number
  longest_streak: number
  last_study_date: string
  daily_goal: number
  today_completed: number
}

// ── Progress ──────────────────────────────────────────────────
export const getUserProgress = (userId: string) =>
  pb.collection('user_progress').getFullList<ProgressRecord>({
    filter: pb.filter('user_id = {:uid}', { uid: userId }),
    sort: '-completed_at',
  })

export const completeTopic = (userId: string, topicId: string, trailId: string, xp: number) =>
  pb.collection('user_progress').create<ProgressRecord>({
    user_id: userId,
    topic_id: topicId,
    trail_id: trailId,
    xp_earned: xp,
    completed_at: new Date().toISOString(),
  })

export const uncompleteTopic = async (userId: string, topicId: string) => {
  try {
    const record = await pb
      .collection('user_progress')
      .getFirstListItem<ProgressRecord>(
        pb.filter('user_id = {:uid} && topic_id = {:tid}', { uid: userId, tid: topicId }),
      )
    await pb.collection('user_progress').delete(record.id)
  } catch (_) {
    // not found — no-op
  }
}

// ── Streaks ───────────────────────────────────────────────────
export const getUserStreak = async (userId: string): Promise<StreakRecord | null> => {
  try {
    return await pb
      .collection('user_streaks')
      .getFirstListItem<StreakRecord>(pb.filter('user_id = {:uid}', { uid: userId }))
  } catch (_) {
    return null
  }
}

export const upsertStreak = async (userId: string, data: Partial<StreakRecord>) => {
  const existing = await getUserStreak(userId)
  if (existing) {
    return pb.collection('user_streaks').update<StreakRecord>(existing.id, data)
  }
  return pb.collection('user_streaks').create<StreakRecord>({
    user_id: userId,
    current_streak: 0,
    longest_streak: 0,
    last_study_date: '',
    daily_goal: 3,
    today_completed: 0,
    ...data,
  })
}
