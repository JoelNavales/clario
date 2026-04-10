import { Card, CardContent } from "../components/ui/Card"
import { Checkbox } from "../components/ui/Checkbox"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { Plus } from "lucide-react"
import { tasks } from "../data/mockData"

export function TasksPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage your to-dos efficiently.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="default" className="rounded-full rounded-b-full h-8 px-4">All</Button>
        <Button variant="secondary" className="rounded-full rounded-b-full h-8 px-4 text-muted-foreground">Active</Button>
        <Button variant="secondary" className="rounded-full rounded-b-full h-8 px-4 text-muted-foreground">Completed</Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <Checkbox checked={task.completed} className="h-5 w-5 rounded-[4px]" />
                  <span className={`font-medium ${task.completed ? 'text-muted-foreground line-through' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <Badge variant={task.priority === 'high' ? 'default' : 'secondary'} className="capitalize">
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
