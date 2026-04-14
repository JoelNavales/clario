import { supabase } from '../../../lib/supabase'
import type { Database } from '../../../lib/database.types'

type Mood = Database['public']['Tables']['moods']['Row']

export const moodService = {
  async fetchTodayMood(userId: string): Promise<Mood | null> {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('user_id', userId)
      .eq('mood_date', today)
      .limit(1)

    if (error) throw error
    return data?.[0] || null
  },

  async fetchLast7DaysMoods(userId: string): Promise<Mood[]> {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('user_id', userId)
      .gte('mood_date', sevenDaysAgoStr)
      .order('mood_date', { ascending: false })

    if (error) throw error
    return data || []
  },

  async insertMood(userId: string, moodId: string): Promise<Mood> {
    const today = new Date().toISOString().split('T')[0]
    
    // Check if already exists for today
    const { data: existingRows } = await supabase
      .from('moods')
      .select('*')
      .eq('user_id', userId)
      .eq('mood_date', today)
      .limit(1)
      
    if (existingRows && existingRows.length > 0) {
      // Update existing
      const { data, error } = await supabase
        .from('moods')
        .update({ mood_id: moodId })
        .eq('id', existingRows[0].id)
        .select()
        .single()
      if (error) throw error
      return data
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('moods')
        .insert({ user_id: userId, mood_id: moodId, mood_date: today })
        .select()
        .single()
      if (error) throw error
      return data
    }
  }
}
