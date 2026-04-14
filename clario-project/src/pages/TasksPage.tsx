import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Checkbox } from "../components/ui/Checkbox"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Plus, X, Trash2 } from "lucide-react"
import { useTasks } from "../features/tasks/hooks/useTasks"

export function TasksPage() {
  const { tasks, folders, addTask, updateTask, deleteTask, addFolder, deleteFolder, isLoading } = useTasks()
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isAddingFolder, setIsAddingFolder] = useState(false)
  
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newFolderName, setNewFolderName] = useState("")
  const [priority, setPriority] = useState("medium")
  const [selectedFolderId, setSelectedFolderId] = useState<number | "null">("null")
  
  const [isSubmittingTask, setIsSubmittingTask] = useState(false)
  const [isSubmittingFolder, setIsSubmittingFolder] = useState(false)

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    setIsSubmittingTask(true)
    try {
      const folderTarget = selectedFolderId === "null" ? null : selectedFolderId
      await addTask(newTaskTitle.trim(), priority, folderTarget)
      setNewTaskTitle("")
      setPriority("medium")
      setSelectedFolderId("null")
      setIsAddingTask(false)
    } finally {
      setIsSubmittingTask(false)
    }
  }

  const handleAddFolder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFolderName.trim()) return
    setIsSubmittingFolder(true)
    try {
      await addFolder(newFolderName.trim())
      setNewFolderName("")
      setIsAddingFolder(false)
    } finally {
      setIsSubmittingFolder(false)
    }
  }

  // Group tasks by folders
  const groupedTasks: Record<string, typeof tasks> = {
    "uncategorized": tasks.filter(t => t.folder_id === null)
  }
  folders.forEach(f => {
    groupedTasks[f.id] = tasks.filter(t => t.folder_id === f.id)
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage your goals for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setIsAddingFolder(!isAddingFolder)}>
            {isAddingFolder ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isAddingFolder ? "Cancel Folder" : "New Folder"}
          </Button>
          <Button className="gap-2" onClick={() => setIsAddingTask(!isAddingTask)}>
            {isAddingTask ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isAddingTask ? "Cancel Task" : "Add Task"}
          </Button>
        </div>
      </div>

      {isAddingFolder && (
         <Card className="bg-primary/5 border-primary/20">
           <CardContent className="p-4">
             <form onSubmit={handleAddFolder} className="flex gap-2 items-center">
                <Input 
                  value={newFolderName} 
                  onChange={(e) => setNewFolderName(e.target.value)} 
                  placeholder="Enter folder name (e.g. Work, Personal)..."
                  autoFocus
                  className="flex-1 bg-background"
                />
                <Button type="submit" disabled={isSubmittingFolder || !newFolderName.trim()}>Create Folder</Button>
             </form>
           </CardContent>
         </Card>
      )}

      {isAddingTask && (
         <Card>
           <CardContent className="p-4">
             <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                <Input 
                  value={newTaskTitle} 
                  onChange={(e) => setNewTaskTitle(e.target.value)} 
                  placeholder="Enter task title..."
                  autoFocus
                  className="flex-1"
                />
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select 
                    className="bg-secondary rounded-md px-3 py-2 text-sm border-none focus:ring-0 w-full md:w-auto"
                    value={selectedFolderId}
                    onChange={(e) => setSelectedFolderId(e.target.value === "null" ? "null" : Number(e.target.value))}
                  >
                    <option value="null">No Folder</option>
                    {folders.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                  <select 
                    className="bg-secondary rounded-md px-3 py-2 text-sm border-none focus:ring-0 w-full md:w-auto"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium</option>
                    <option value="high">High Priority</option>
                  </select>
                  <Button type="submit" disabled={isSubmittingTask || !newTaskTitle.trim()} className="w-full md:w-auto shrink-0">Save</Button>
                </div>
             </form>
           </CardContent>
         </Card>
      )}

      <div className="space-y-6">
        {isLoading && tasks.length === 0 && folders.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden animate-pulse">
                <div className="h-10 bg-secondary/50 border-b" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded bg-secondary" />
                      <div className="h-4 w-48 rounded bg-secondary" />
                    </div>
                    <div className="h-5 w-14 rounded-full bg-secondary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : tasks.length === 0 && folders.length === 0 && !isAddingTask && !isAddingFolder ? (
          <div className="py-12 text-center border rounded-xl bg-card border-dashed">
             <p className="text-muted-foreground text-sm">No tasks or folders yet. Create something awesome!</p>
          </div>
        ) : (
          <>
            {/* Render Folders */}
            {folders.map(folder => (
              <Card key={folder.id} className="overflow-hidden border-border/50">
                <CardHeader className="bg-secondary/30 pb-3 pt-4 border-b group flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-semibold">{folder.name}</CardTitle>
                  <button 
                    className="text-muted-foreground hover:text-destructive transition-opacity opacity-0 group-hover:opacity-100"
                    onClick={() => deleteFolder(folder.id)}
                    title="Delete Folder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </CardHeader>
                <CardContent className="p-0">
                  {groupedTasks[folder.id]?.length === 0 ? (
                    <div className="p-4 text-xs text-muted-foreground text-center">Empty folder.</div>
                  ) : (
                    <div className="divide-y divide-border">
                      {groupedTasks[folder.id]?.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 bg-background hover:bg-secondary/20 transition-colors group">
                          <div className="flex items-center gap-4">
                            <Checkbox 
                              checked={task.completed} 
                              onCheckedChange={() => updateTask(task.id, { completed: !task.completed })}
                              className="h-5 w-5" 
                            />
                            <span className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'} className="capitalize text-[10px] px-2 py-0.5">
                              {task.priority}
                            </Badge>
                            <button 
                              className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                              onClick={() => deleteTask(task.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Render Uncategorized */}
            {(groupedTasks["uncategorized"].length > 0 || folders.length === 0) && (
              <Card className="overflow-hidden border-border/50 border-dashed">
                <CardHeader className="bg-transparent pb-3 pt-4 border-b">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">Uncategorized</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {groupedTasks["uncategorized"].length === 0 ? (
                    <div className="p-4 text-xs text-muted-foreground text-center">No stray tasks.</div>
                  ) : (
                    <div className="divide-y divide-border">
                      {groupedTasks["uncategorized"].map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 bg-background hover:bg-secondary/20 transition-colors group">
                          <div className="flex items-center gap-4">
                            <Checkbox 
                              checked={task.completed} 
                              onCheckedChange={() => updateTask(task.id, { completed: !task.completed })}
                              className="h-5 w-5" 
                            />
                            <span className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'} className="capitalize text-[10px] px-2 py-0.5">
                              {task.priority}
                            </Badge>
                            <button 
                              className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                              onClick={() => deleteTask(task.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
