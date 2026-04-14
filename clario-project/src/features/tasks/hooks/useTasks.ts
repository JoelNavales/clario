import { useState, useEffect, useCallback } from 'react'
import { taskService } from '../services/taskService'
import type { Database } from '../../../lib/database.types'
import { useAuth } from '../../auth/hooks/useAuth'

type Task = Database['public']['Tables']['tasks']['Row']
type TaskFolder = Database['public']['Tables']['task_folders']['Row']

interface TasksCache {
  tasks: Task[]
  folders: TaskFolder[]
}

// ── Cache helpers (memory + sessionStorage so back-navigation works) ──────────
const memCache = new Map<string, TasksCache>()

function readTasksCache(userId: string): TasksCache | null {
  if (memCache.has(userId)) return memCache.get(userId)!
  try {
    const raw = sessionStorage.getItem(`clario_tasks_${userId}`)
    if (raw) {
      const data = JSON.parse(raw) as TasksCache
      memCache.set(userId, data)
      return data
    }
  } catch { /* sessionStorage unavailable */ }
  return null
}

function writeTasksCache(userId: string, data: TasksCache) {
  memCache.set(userId, data)
  try { sessionStorage.setItem(`clario_tasks_${userId}`, JSON.stringify(data)) } catch { /* ignore */ }
}

export function useTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [folders, setFolders] = useState<TaskFolder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restore from cache the moment we know who the user is (before network)
  useEffect(() => {
    if (!user) return
    const cached = readTasksCache(user.id)
    if (cached) {
      setTasks(cached.tasks)
      setFolders(cached.folders)
      setIsLoading(false)
    }
  }, [user?.id])

  const loadData = useCallback(async () => {
    if (!user) return
    if (!readTasksCache(user.id)) setIsLoading(true)
    setError(null)
    try {
      const [fetchedTasks, fetchedFolders] = await Promise.all([
        taskService.fetchTasks(user.id),
        taskService.fetchFolders(user.id)
      ])
      setTasks(fetchedTasks)
      setFolders(fetchedFolders)
      writeTasksCache(user.id, { tasks: fetchedTasks, folders: fetchedFolders })
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks')
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

  const addTask = async (title: string, priority: string = 'medium', folderId: number | null = null) => {
    if (!user) return
    try {
      const newTask = await taskService.createTask(user.id, title, priority, folderId)
      setTasks(prev => [newTask, ...prev])
    } catch (err: any) {
      setError(err.message || 'Failed to add task')
      throw err
    }
  }

  const updateTask = async (taskId: number, updates: Partial<Task>) => {
    if (!user) return
    
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t))
    
    try {
      await taskService.updateTask(user.id, taskId, updates)
    } catch (err: any) {
      setError(err.message || 'Failed to update task')
      await loadData() // revert
      throw err
    }
  }

  const deleteTask = async (taskId: number) => {
    if (!user) return
    
    // Optimistic update
    setTasks(prev => prev.filter(t => t.id !== taskId))
    
    try {
      await taskService.deleteTask(user.id, taskId)
    } catch (err: any) {
      setError(err.message || 'Failed to delete task')
      await loadData() // revert
      throw err
    }
  }

  const addFolder = async (name: string) => {
    if (!user) return
    try {
      const newFolder = await taskService.createFolder(user.id, name)
      setFolders(prev => [...prev, newFolder])
    } catch (err: any) {
      setError(err.message || 'Failed to create folder')
      throw err
    }
  }

  const deleteFolder = async (folderId: number) => {
    if (!user) return
    // Optimistic update
    setFolders(prev => prev.filter(f => f.id !== folderId))
    setTasks(prev => prev.filter(t => t.folder_id !== folderId)) // assuming cascade delete
    try {
      await taskService.deleteFolder(user.id, folderId)
    } catch (err: any) {
      setError(err.message || 'Failed to delete folder')
      await loadData() // revert
      throw err
    }
  }

  return {
    tasks,
    folders,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    addFolder,
    deleteFolder,
    refetch: loadData
  }
}
