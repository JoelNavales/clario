import { useState, useEffect, useCallback } from 'react'
import { moodService } from '../services/moodService'
import type { Database } from '../../../lib/database.types'
import { useAuth } from '../../auth/hooks/useAuth'

type Mood = Database['public']['Tables']['moods']['Row']

interface MoodCache {
  todayMood: Mood | null
  weeklyMoods: Mood[]
}

// ── Cache helpers (memory + sessionStorage so back-navigation works) ──────────
const memCache = new Map<string, MoodCache>()

function readMoodCache(userId: string): MoodCache | null {
  if (memCache.has(userId)) return memCache.get(userId)!
  try {
    const raw = sessionStorage.getItem(`clario_mood_${userId}`)
    if (raw) {
      const data = JSON.parse(raw) as MoodCache
      memCache.set(userId, data)
      return data
    }
  } catch { /* sessionStorage unavailable */ }
  return null
}

function writeMoodCache(userId: string, data: MoodCache) {
  memCache.set(userId, data)
  try { sessionStorage.setItem(`clario_mood_${userId}`, JSON.stringify(data)) } catch { /* ignore */ }
}

export function useMood() {
  const { user } = useAuth()
  const [todayMood, setTodayMood] = useState<Mood | null>(null)
  const [weeklyMoods, setWeeklyMoods] = useState<Mood[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restore from cache the moment we know who the user is (before network)
  useEffect(() => {
    if (!user) return
    const cached = readMoodCache(user.id)
    if (cached) {
      setTodayMood(cached.todayMood)
      setWeeklyMoods(cached.weeklyMoods)
      setIsLoading(false)
    }
  }, [user?.id])

  const loadData = useCallback(async () => {
    if (!user) return
    if (!readMoodCache(user.id)) setIsLoading(true)
    setError(null)
    try {
      const [today, weekly] = await Promise.all([
        moodService.fetchTodayMood(user.id),
        moodService.fetchLast7DaysMoods(user.id)
      ])
      setTodayMood(today)
      setWeeklyMoods(weekly)
      writeMoodCache(user.id, { todayMood: today, weeklyMoods: weekly })
    } catch (err: any) {
      setError(err.message || 'Failed to load mood data')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') loadData() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [loadData])

  const setMood = async (moodId: string) => {
    if (!user) return
    setError(null)

    const optimistic: Mood = {
      id: todayMood?.id ?? -1,
      user_id: user.id,
      mood_id: moodId,
      mood_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    }
    const prevCached = readMoodCache(user.id)
    setTodayMood(optimistic)
    writeMoodCache(user.id, { todayMood: optimistic, weeklyMoods: weeklyMoods })

    moodService.insertMood(user.id, moodId)
      .then(() => loadData())
      .catch(err => {
        setError(err.message || 'Failed to save mood')
        setTodayMood(prevCached?.todayMood ?? null)
        if (prevCached) writeMoodCache(user.id, prevCached)
      })
  }

  return {
    todayMood,
    weeklyMoods,
    isLoading,
    error,
    setMood,
    refetch: loadData
  }
}
