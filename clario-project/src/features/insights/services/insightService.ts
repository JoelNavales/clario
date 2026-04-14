import { supabase } from '../../../lib/supabase'
import type { Database } from '../../../lib/database.types'

type Insight = Database['public']['Tables']['insights']['Row']

export const insightService = {
  async fetchInsights(userId: string): Promise<Insight[]> {
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createInsight(userId: string, text: string): Promise<Insight> {
    const { data, error } = await supabase
      .from('insights')
      .insert({ user_id: userId, text })
      .select()
      .single()

    if (error) throw error
    return data
  }
}
