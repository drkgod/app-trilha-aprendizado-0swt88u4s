import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { trails, type Trail, type Topic } from '@/data/trails'
import { useAuth } from '@/hooks/use-auth'
import {
  getUserProgress,
  completeTopic as apiComplete,
  uncompleteTopic as apiUncomplete,
  getUserStreak,
  upsertStreak,
  type ProgressRecord,
  type StreakRecord,
} from '@/services/progress'

// ── Gamification constants ──
export const LEVELS = [
  { min: 0, title: 'Aprendiz', icon: '🌱' },
  { min: 100, title: 'Aprendiz', icon: '🌱' },
  { min: 250, title: 'Aprendiz', icon: '🌱' },
  { min: 450, title: 'Explorador', icon: '🧭' },
  { min: 700, title: 'Explorador', icon: '🧭' },
  { min: 1000, title: 'Explorador', icon: '🧭' },
  { min: 1350, title: 'Construtor', icon: '🛠️' },
  { min: 1750, title: 'Construtor', icon: '🛠️' },
  { min: 2200, title: 'Construtor', icon: '🛠️' },
  { min: 2700, title: 'Construtor', icon: '🛠️' },
  { min: 3250, title: 'Arquiteto', icon: '🏗️' },
  { min: 3850, title: 'Arquiteto', icon: '🏗️' },
  { min: 4500, title: 'Arquiteto', icon: '🏗️' },
  { min: 5200, title: 'Arquiteto', icon: '🏗️' },
  { min: 5950, title: 'Arquiteto', icon: '🏗️' },
  { min: 6750, title: 'Mestre', icon: '👑' },
  { min: 7600, title: 'Mestre', icon: '👑' },
  { min: 8500, title: 'Mestre', icon: '👑' },
  { min: 9450, title: 'Mestre', icon: '👑' },
  { min: 10450, title: 'Mestre', icon: '👑' },
]

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (state: AppStateData) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-topic',
    title: 'Primeiro Passo',
    description: 'Complete seu primeiro tópico',
    icon: '🌟',
    condition: (s) => s.completedTopicIds.length >= 1,
  },
  {
    id: 'five-topics',
    title: 'Maratonista',
    description: 'Complete 5 tópicos',
    icon: '🏃',
    condition: (s) => s.completedTopicIds.length >= 5,
  },
  {
    id: 'ten-topics',
    title: 'Dedicado',
    description: 'Complete 10 tópicos',
    icon: '💪',
    condition: (s) => s.completedTopicIds.length >= 10,
  },
  {
    id: 'twenty-topics',
    title: 'Imparável',
    description: 'Complete 20 tópicos',
    icon: '🚀',
    condition: (s) => s.completedTopicIds.length >= 20,
  },
  {
    id: 'fifty-topics',
    title: 'Meio Centenário',
    description: 'Complete 50 tópicos',
    icon: '🎖️',
    condition: (s) => s.completedTopicIds.length >= 50,
  },
  {
    id: 'all-topics',
    title: 'Lendário',
    description: 'Complete todos os 114 tópicos',
    icon: '🏆',
    condition: (s) => s.completedTopicIds.length >= 114,
  },
  {
    id: 'streak-3',
    title: 'Consistência',
    description: '3 dias seguidos estudando',
    icon: '🔥',
    condition: (s) => s.streak >= 3,
  },
  {
    id: 'streak-7',
    title: 'Streak Master',
    description: '7 dias seguidos estudando',
    icon: '🔥',
    condition: (s) => s.streak >= 7,
  },
  {
    id: 'streak-14',
    title: 'Inabalável',
    description: '14 dias seguidos estudando',
    icon: '⚡',
    condition: (s) => s.streak >= 14,
  },
  {
    id: 'streak-30',
    title: 'Máquina',
    description: '30 dias seguidos estudando',
    icon: '🤖',
    condition: (s) => s.streak >= 30,
  },
  {
    id: 'claude-code-done',
    title: 'Claude Whisperer',
    description: 'Complete toda a trilha Claude Code',
    icon: '🟠',
    condition: (s) => isTrailComplete(s, 'claude-code'),
  },
  {
    id: 'codex-done',
    title: 'Codex Commander',
    description: 'Complete toda a trilha Codex',
    icon: '🟣',
    condition: (s) => isTrailComplete(s, 'codex'),
  },
  {
    id: 'claude-ai-done',
    title: 'AI Architect',
    description: 'Complete toda a trilha Claude.ai',
    icon: '🔵',
    condition: (s) => isTrailComplete(s, 'claude-ai'),
  },
  {
    id: 'github-done',
    title: 'Git Ninja',
    description: 'Complete toda a trilha GitHub',
    icon: '⚫',
    condition: (s) => isTrailComplete(s, 'github'),
  },
  {
    id: 'supabase-done',
    title: 'Supabase Sage',
    description: 'Complete toda a trilha Supabase',
    icon: '🟢',
    condition: (s) => isTrailComplete(s, 'supabase'),
  },
  {
    id: 'full-stack',
    title: 'Full Stack Consultant',
    description: 'Complete tópicos em todas as 5 trilhas',
    icon: '🌍',
    condition: (s) => {
      return trails.every((trail) => trail.topics.some((t) => s.completedTopicIds.includes(t.id)))
    },
  },
  {
    id: 'xp-1000',
    title: 'Milhar de XP',
    description: 'Acumule 1000 XP',
    icon: '💰',
    condition: (s) => s.totalXP >= 1000,
  },
  {
    id: 'xp-3000',
    title: 'XP Hoarder',
    description: 'Acumule 3000 XP',
    icon: '💎',
    condition: (s) => s.totalXP >= 3000,
  },
  {
    id: 'all-alta',
    title: 'Prioridades Certas',
    description: 'Complete todos os tópicos de prioridade Alta',
    icon: '🎯',
    condition: (s) => {
      const allAlta = trails.flatMap((tr) => tr.topics.filter((t) => t.priority === 'alta'))
      return allAlta.every((t) => s.completedTopicIds.includes(t.id))
    },
  },
]

function isTrailComplete(state: AppStateData, trailId: string): boolean {
  const trail = trails.find((t) => t.id === trailId)
  if (!trail) return false
  return trail.topics.every((t) => state.completedTopicIds.includes(t.id))
}

function getLevel(xp: number) {
  let level = 0
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) {
      level = i + 1
      break
    }
  }
  return level
}

function getLevelInfo(xp: number) {
  const level = getLevel(xp)
  const current = LEVELS[Math.min(level - 1, LEVELS.length - 1)]
  const next = LEVELS[Math.min(level, LEVELS.length - 1)]
  const xpInLevel = xp - current.min
  const xpForNext = next.min - current.min || 1
  return {
    level,
    title: current.title,
    icon: current.icon,
    xpInLevel,
    xpForNext,
    progress: Math.min(100, Math.round((xpInLevel / xpForNext) * 100)),
  }
}

interface AppStateData {
  completedTopicIds: string[]
  totalXP: number
  streak: number
}

interface AppState {
  trails: Trail[]
  completedTopicIds: string[]
  totalXP: number
  streak: number
  longestStreak: number
  dailyGoal: number
  todayCompleted: number
  loading: boolean
  levelInfo: ReturnType<typeof getLevelInfo>
  unlockedAchievements: string[]
  newAchievement: Achievement | null
  clearNewAchievement: () => void
  isTopicCompleted: (topicId: string) => boolean
  getTrailProgress: (trailId: string) => { completed: number; total: number; percent: number }
  toggleTopic: (topic: Topic, trailId: string) => Promise<void>
  getNextTopic: (trailId: string) => Topic | null
  getOverallProgress: () => { completed: number; total: number; percent: number }
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([])
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([])
  const [streakData, setStreakData] = useState<{
    streak: number
    longest: number
    dailyGoal: number
    todayCompleted: number
  }>({ streak: 0, longest: 0, dailyGoal: 3, todayCompleted: 0 })
  const [loading, setLoading] = useState(true)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [prevUnlocked, setPrevUnlocked] = useState<string[]>([])

  // Load progress from PocketBase when authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false)
      return
    }
    const load = async () => {
      try {
        const [progress, streak] = await Promise.all([
          getUserProgress(user.id),
          getUserStreak(user.id),
        ])
        setProgressRecords(progress)
        setCompletedTopicIds(progress.map((p) => p.topic_id))
        if (streak) {
          const today = new Date().toISOString().split('T')[0]
          const isToday = streak.last_study_date === today
          setStreakData({
            streak: streak.current_streak,
            longest: streak.longest_streak,
            dailyGoal: streak.daily_goal,
            todayCompleted: isToday ? streak.today_completed : 0,
          })
        }
      } catch (e) {
        console.error('Failed to load progress:', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isAuthenticated, user?.id])

  const totalXP = useMemo(
    () => progressRecords.reduce((sum, p) => sum + p.xp_earned, 0),
    [progressRecords],
  )
  const levelInfo = useMemo(() => getLevelInfo(totalXP), [totalXP])

  const stateData: AppStateData = useMemo(
    () => ({
      completedTopicIds,
      totalXP,
      streak: streakData.streak,
    }),
    [completedTopicIds, totalXP, streakData.streak],
  )

  const unlockedAchievements = useMemo(
    () => ACHIEVEMENTS.filter((a) => a.condition(stateData)).map((a) => a.id),
    [stateData],
  )

  // Detect new achievements
  useEffect(() => {
    if (prevUnlocked.length === 0 && unlockedAchievements.length > 0) {
      setPrevUnlocked(unlockedAchievements)
      return
    }
    const newOnes = unlockedAchievements.filter((id) => !prevUnlocked.includes(id))
    if (newOnes.length > 0) {
      const ach = ACHIEVEMENTS.find((a) => a.id === newOnes[0])
      if (ach) setNewAchievement(ach)
    }
    setPrevUnlocked(unlockedAchievements)
  }, [unlockedAchievements])

  const isTopicCompleted = useCallback(
    (topicId: string) => completedTopicIds.includes(topicId),
    [completedTopicIds],
  )

  const getTrailProgress = useCallback(
    (trailId: string) => {
      const trail = trails.find((t) => t.id === trailId)
      if (!trail) return { completed: 0, total: 0, percent: 0 }
      const completed = trail.topics.filter((t) => completedTopicIds.includes(t.id)).length
      return {
        completed,
        total: trail.topics.length,
        percent: Math.round((completed / trail.topics.length) * 100),
      }
    },
    [completedTopicIds],
  )

  const getOverallProgress = useCallback(() => {
    const total = trails.reduce((s, t) => s + t.topics.length, 0)
    const completed = completedTopicIds.length
    return { completed, total, percent: Math.round((completed / total) * 100) }
  }, [completedTopicIds])

  const getNextTopic = useCallback(
    (trailId: string) => {
      const trail = trails.find((t) => t.id === trailId)
      if (!trail) return null
      return trail.topics.find((t) => !completedTopicIds.includes(t.id)) || null
    },
    [completedTopicIds],
  )

  const toggleTopic = useCallback(
    async (topic: Topic, trailId: string) => {
      if (!user) return
      const isCompleted = completedTopicIds.includes(topic.id)
      if (isCompleted) {
        // Uncomplete
        await apiUncomplete(user.id, topic.id)
        setCompletedTopicIds((prev) => prev.filter((id) => id !== topic.id))
        setProgressRecords((prev) => prev.filter((p) => p.topic_id !== topic.id))
      } else {
        // Complete
        const record = await apiComplete(user.id, topic.id, trailId, topic.xp)
        setCompletedTopicIds((prev) => [...prev, topic.id])
        setProgressRecords((prev) => [...prev, record])

        // Update streak
        const today = new Date().toISOString().split('T')[0]
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        const isToday =
          streakData.streak > 0 && today === (await getUserStreak(user.id))?.last_study_date
        let newStreak = streakData.streak
        const lastDate = (await getUserStreak(user.id))?.last_study_date || ''
        if (lastDate === today) {
          // same day, just increment today_completed
        } else if (lastDate === yesterday) {
          newStreak += 1
        } else {
          newStreak = 1
        }
        const newToday = lastDate === today ? streakData.todayCompleted + 1 : 1
        const newLongest = Math.max(streakData.longest, newStreak)
        await upsertStreak(user.id, {
          current_streak: newStreak,
          longest_streak: newLongest,
          last_study_date: today,
          today_completed: newToday,
          daily_goal: streakData.dailyGoal,
        })
        setStreakData({
          streak: newStreak,
          longest: newLongest,
          dailyGoal: streakData.dailyGoal,
          todayCompleted: newToday,
        })
      }
    },
    [user, completedTopicIds, streakData],
  )

  const value = useMemo<AppState>(
    () => ({
      trails,
      completedTopicIds,
      totalXP,
      streak: streakData.streak,
      longestStreak: streakData.longest,
      dailyGoal: streakData.dailyGoal,
      todayCompleted: streakData.todayCompleted,
      loading,
      levelInfo,
      unlockedAchievements,
      newAchievement,
      clearNewAchievement: () => setNewAchievement(null),
      isTopicCompleted,
      getTrailProgress,
      toggleTopic,
      getNextTopic,
      getOverallProgress,
    }),
    [
      completedTopicIds,
      totalXP,
      streakData,
      loading,
      levelInfo,
      unlockedAchievements,
      newAchievement,
      isTopicCompleted,
      getTrailProgress,
      toggleTopic,
      getNextTopic,
      getOverallProgress,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppStore() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppStore must be used within an AppProvider')
  return context
}
