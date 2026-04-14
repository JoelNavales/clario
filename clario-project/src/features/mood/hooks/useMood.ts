import { useState, useEffect, useCallback } from 'react'
import { moodService } from '../services/moodService'
import type { Database } from '../../../lib/database.types'
import { useAuth } from '../../auth/hooks/useAuth'

type Mood = Database['public']['Tables']['moods']['Row']

export function useMood() {
  const { user } = useAuth()
  const [todayMood, setTodayMood] = useState<Mood | null>(null)
  const [weeklyMoods, setWeeklyMoods] = useState<Mood[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    try {
      const [today, weekly] = await Promise.all([
        moodService.fetchTodayMood(user.id),
        moodService.fetchLast7DaysMoods(user.id)
      ])
      setTodayMood(today)
      setWeeklyMoods(weekly)
    } catch (err: any) {
      setError(err.message || 'Failed to load mood data')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadData()
  }, [loadData])

  const setMood = async (moodId: string) => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    try {
      await moodService.insertMood(user.id, moodId)
      await loadData() // Reload to get updated today & weekly
    } catch (err: any) {
      setError(err.message || 'Failed to save mood')
      throw err
    } finally {
      setIsLoading(false)
    }
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
