import { supabase } from '../../../lib/supabase'
import type { Database } from '../../../lib/database.types'

type Task = Database['public']['Tables']['tasks']['Row']
type TaskInsert = Database['public']['Tables']['tasks']['Insert']

export const taskService = {
  async fetchTasks(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createTask(userId: string, title: string, priority: string = 'medium', folderId: number | null = null): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert({ user_id: userId, title, priority, completed: false, folder_id: folderId })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateTask(userId: string, taskId: number, updates: Partial<TaskInsert>): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .eq('user_id', userId) // RLS normally handles this, but good to be explicit
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteTask(userId: string, taskId: number): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', userId)

    if (error) throw error
  },

  // --- Folder Operations ---

  async fetchFolders(userId: string) {
    const { data, error } = await supabase
      .from('task_folders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      
    if (error) throw error
    return data || []
  },

  async createFolder(userId: string, name: string) {
    const { data, error } = await supabase
      .from('task_folders')
      .insert({ user_id: userId, name })
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async deleteFolder(userId: string, folderId: number): Promise<void> {
    const { error } = await supabase
      .from('task_folders')
      .delete()
      .eq('id', folderId)
      .eq('user_id', userId)
      
    if (error) throw error
  }
}
