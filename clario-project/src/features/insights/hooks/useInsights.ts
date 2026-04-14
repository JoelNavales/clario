import { useState, useEffect, useCallback } from 'react'
import { insightService } from '../services/insightService'
import type { Database } from '../../../lib/database.types'
import { useAuth } from '../../auth/hooks/useAuth'

type Insight = Database['public']['Tables']['insights']['Row']

export function useInsights() {
  const { user } = useAuth()
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    try {
      const fetchedInsights = await insightService.fetchInsights(user.id)
      setInsights(fetchedInsights)
    } catch (err: any) {
      setError(err.message || 'Failed to load insights')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadData()
  }, [loadData])

  const addInsight = async (text: string) => {
    if (!user) return
    try {
      const newInsight = await insightService.createInsight(user.id, text)
      setInsights(prev => [newInsight, ...prev])
    } catch (err: any) {
      setError(err.message || 'Failed to add insight')
      throw err
    }
  }

  return {
    insights,
    isLoading,
    error,
    addInsight,
    refetch: loadData
  }
}
