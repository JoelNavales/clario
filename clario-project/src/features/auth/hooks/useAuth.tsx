import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../../../lib/supabase'
import { authService } from '../services/authService'
import type { Database } from '../../../lib/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
  session: Session | null
  user: User | null
  profile: Profile | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!mounted) return;
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (mounted) setIsLoading(false)
        
        if (session?.user) {
          try {
             // Fetch profile in the background without blocking the UI
             const profileData = await authService.getProfile(session.user.id)
             if (mounted) setProfile(profileData)
          } catch (e) {
             console.error("Error fetching profile", e)
          }
        }
      } catch (error) {
        console.error("Error loading session", error)
        if (mounted) setIsLoading(false)
      }
    }

    loadSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;
      
      setSession(newSession)
      setUser(newSession?.user ?? null)
      
      if (newSession?.user) {
        setIsLoading(false)
        try {
           const profileData = await authService.getProfile(newSession.user.id)
           setProfile(profileData)
        } catch (e) {
           console.error("Error fetching profile", e)
        }
      } else {
        setProfile(null)
        setIsLoading(false)
      }
    })

    return () => {
      mounted = false;
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await authService.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, user, profile, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
