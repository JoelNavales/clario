import { supabase } from '../../../lib/supabase'
import type { Database } from '../../../lib/database.types'

type Habit = Database['public']['Tables']['habits']['Row']
type HabitLog = Database['public']['Tables']['habit_logs']['Row']

export const habitService = {
  async fetchHabits(userId: string): Promise<Habit[]> {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async fetchHabitLogs(userId: string): Promise<HabitLog[]> {
    const { data, error } = await supabase
      .from('habit_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createHabit(userId: string, title: string): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .insert({ user_id: userId, title })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async logHabit(userId: string, habitId: number): Promise<HabitLog> {
    const date = new Date().toISOString().split('T')[0]
    
    // Check if already logged today
    const { data: existing } = await supabase
      .from('habit_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('habit_id', habitId)
      .eq('date', date)
      .single()

    if (existing) {
      return existing // Already logged today
    }

    const { data, error } = await supabase
      .from('habit_logs')
      .insert({ user_id: userId, habit_id: habitId, date })
      .select()
      .single()

    if (error) throw error
    return data
  },
  
  async unlogHabit(userId: string, habitId: number): Promise<void> {
    const date = new Date().toISOString().split('T')[0]
    const { error } = await supabase
      .from('habit_logs')
      .delete()
      .eq('user_id', userId)
      .eq('habit_id', habitId)
      .eq('date', date)

    if (error) throw error
  }
}
