export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      moods: {
        Row: {
          id: number
          user_id: string
          mood_id: string
          mood_date: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          mood_id: string
          mood_date: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          mood_id?: string
          mood_date?: string
          created_at?: string
        }
        Relationships: []
      }
      habits: {
        Row: {
          id: number
          user_id: string
          title: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          created_at?: string
        }
        Relationships: []
      }
      habit_logs: {
        Row: {
          id: number
          habit_id: number
          date: string
          created_at: string
        }
        Insert: {
          id?: number
          habit_id: number
          date: string
          created_at?: string
        }
        Update: {
          id?: number
          habit_id?: number
          date?: string
          created_at?: string
        }
        Relationships: []
      }
      task_folders: {
        Row: {
          id: number
          user_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          name?: string
          created_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          id: number
          user_id: string
          title: string
          completed: boolean
          priority: string
          folder_id: number | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          completed?: boolean
          priority?: string
          folder_id?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          completed?: boolean
          priority?: string
          folder_id?: number | null
          created_at?: string
        }
        Relationships: []
      }
      insights: {
        Row: {
          id: number
          user_id: string
          text: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          text: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          text?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
