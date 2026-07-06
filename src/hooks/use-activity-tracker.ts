import { useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createActivityLog, updateActivityLog } from '@/services/activity-logs'

const IDLE_THRESHOLD_MS = 60000

export function useActivityTracker(trailId: string, topicId: string, topicCompleted: boolean) {
  const { user } = useAuth()

  const logIdRef = useRef<string | null>(null)
  const totalSecondsRef = useRef(0)
  const activeSecondsRef = useRef(0)
  const switchesRef = useRef(0)
  const isVisibleRef = useRef(true)
  const isIdleRef = useRef(false)
  const lastInputRef = useRef(Date.now())
  const completedRef = useRef(topicCompleted)
  const finalizedRef = useRef(false)

  const finalize = useCallback(async (completed: boolean) => {
    if (finalizedRef.current || !logIdRef.current) return
    finalizedRef.current = true
    try {
      await updateActivityLog(logIdRef.current, {
        end_time: new Date().toISOString(),
        total_duration_seconds: totalSecondsRef.current,
        active_duration_seconds: activeSecondsRef.current,
        visibility_switches: switchesRef.current,
        is_completed: completed,
      })
    } catch {
      // silent fail — tracking is best-effort
    }
  }, [])

  useEffect(() => {
    if (!user || !trailId || !topicId) return
    let cancelled = false
    createActivityLog({
      user_id: user.id,
      trail_id: trailId,
      topic_id: topicId,
      start_time: new Date().toISOString(),
      total_duration_seconds: 0,
      active_duration_seconds: 0,
      visibility_switches: 0,
      is_completed: false,
    })
      .then((r) => {
        if (!cancelled) logIdRef.current = r.id
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [user, trailId, topicId])

  useEffect(() => {
    const tick = setInterval(() => {
      totalSecondsRef.current += 1
      if (Date.now() - lastInputRef.current > IDLE_THRESHOLD_MS) {
        isIdleRef.current = true
      }
      if (isVisibleRef.current && !isIdleRef.current) {
        activeSecondsRef.current += 1
      }
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        if (isVisibleRef.current) switchesRef.current += 1
        isVisibleRef.current = false
      } else {
        isVisibleRef.current = true
        lastInputRef.current = Date.now()
        isIdleRef.current = false
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    const reset = () => {
      lastInputRef.current = Date.now()
      isIdleRef.current = false
    }
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach((e) => document.addEventListener(e, reset, { passive: true }))
    return () => events.forEach((e) => document.removeEventListener(e, reset))
  }, [])

  useEffect(() => {
    if (!completedRef.current && topicCompleted) {
      completedRef.current = true
      finalize(true)
    }
  }, [topicCompleted, finalize])

  useEffect(() => {
    return () => finalize(completedRef.current)
  }, [finalize])
}
