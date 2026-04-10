import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Checkbox } from "../components/ui/Checkbox"
import { Button } from "../components/ui/Button"
import { Plus } from "lucide-react"
import { habits } from "../data/mockData"

export function HabitsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Habits</h1>
          <p className="text-muted-foreground mt-1">Build consistency every day.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Habit
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Habits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <Checkbox checked={habit.completed} className="h-6 w-6 rounded-lg" />
                <div>
                  <p className={`font-medium ${habit.completed ? 'text-muted-foreground line-through' : ''}`}>
                    {habit.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Daily</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-semibold font-mono">{habit.streak} day streak</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
