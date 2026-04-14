import { useState, useEffect, useCallback } from 'react'
import { habitService } from '../services/habitService'
import type { Database } from '../../../lib/database.types'
import { useAuth } from '../../auth/hooks/useAuth'

type Habit = Database['public']['Tables']['habits']['Row']
type HabitLog = Database['public']['Tables']['habit_logs']['Row']

export interface HabitWithStats extends Habit {
  completedToday: boolean
  streak: number
}

export function useHabits() {
  const { user } = useAuth()
  const [habits, setHabits] = useState<HabitWithStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const calculateStreak = (habitId: number, logs: HabitLog[]): number => {
    const habitLogs = logs.filter(l => l.habit_id === habitId).map(l => l.date).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    if (habitLogs.length === 0) return 0

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0,0,0,0) // Today
    
    // Check if missed today
    let firstLogDate = new Date(habitLogs[0])
    firstLogDate.setHours(0,0,0,0)
    
    const diffDaysToFirstLog = Math.floor((currentDate.getTime() - firstLogDate.getTime()) / (1000 * 3600 * 24))
    if (diffDaysToFirstLog > 1) {
      return 0 // Streak broken
    }

    let checkDateStr = firstLogDate.toISOString().split('T')[0]
    let logIndex = 0

    while (logIndex < habitLogs.length && habitLogs[logIndex] === checkDateStr) {
      streak++
      // Move to previous day
      const nextCheckDate = new Date(checkDateStr)
      nextCheckDate.setDate(nextCheckDate.getDate() - 1)
      checkDateStr = nextCheckDate.toISOString().split('T')[0]
      logIndex++
    }
    
    return streak
  }

  const loadData = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    try {
      const [fetchedHabits, fetchedLogs] = await Promise.all([
        habitService.fetchHabits(user.id),
        habitService.fetchHabitLogs(user.id)
      ])
      
      const today = new Date().toISOString().split('T')[0]
      const habitsWithStats = fetchedHabits.map(habit => {
        const completedToday = fetchedLogs.some(log => log.habit_id === habit.id && log.date === today)
        const streak = calculateStreak(habit.id, fetchedLogs)
        return { ...habit, completedToday, streak }
      })
      
      setHabits(habitsWithStats)
    } catch (err: any) {
      setError(err.message || 'Failed to load habits')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadData()
  }, [loadData])

  const addHabit = async (title: string) => {
    if (!user) return
    try {
      await habitService.createHabit(user.id, title)
      await loadData()
    } catch (err: any) {
      setError(err.message || 'Failed to add habit')
      throw err
    }
  }

  const toggleHabit = async (habitId: number, currentlyCompleted: boolean) => {
    if (!user) return
    
    // Optimistic update
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
         const newCompleted = !currentlyCompleted;
         return {
           ...h,
           completedToday: newCompleted,
           streak: newCompleted ? h.streak + (h.completedToday ? 0 : 1) : Math.max(0, h.streak - 1)
         }
      }
      return h;
    }))

    try {
      if (currentlyCompleted) {
        await habitService.unlogHabit(user.id, habitId)
      } else {
        await habitService.logHabit(user.id, habitId)
      }
      // Re-sync with server
      await loadData()
    } catch (err: any) {
      setError(err.message || 'Failed to toggle habit')
      await loadData() // Re-sync to fix optimistic update
      throw err
    }
  }

  return {
    habits,
    isLoading,
    error,
    addHabit,
    toggleHabit,
    refetch: loadData
  }
}
