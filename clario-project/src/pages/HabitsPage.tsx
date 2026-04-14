import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Checkbox } from "../components/ui/Checkbox"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Plus, X } from "lucide-react"
import { useHabits } from "../features/habits/hooks/useHabits"

export function HabitsPage() {
  const { habits, addHabit, toggleHabit, isLoading, error: hookError } = useHabits()
  const [isAdding, setIsAdding] = useState(false)
  const [newHabitTitle, setNewHabitTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newHabitTitle.trim()) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await addHabit(newHabitTitle.trim())
      setNewHabitTitle("")
      setIsAdding(false)
    } catch (err: any) {
      setSubmitError(err.message || "Failed to add habit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Habits</h1>
          <p className="text-muted-foreground mt-1">Build consistency every day.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {isAdding ? "Cancel" : "Add Habit"}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Habits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(hookError || submitError) && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {submitError || hookError}
            </div>
          )}
          {isAdding && (
             <form onSubmit={handleAddHabit} className="flex gap-2 items-center p-4 rounded-xl border border-border bg-background">
                <Input 
                  value={newHabitTitle} 
                  onChange={(e) => setNewHabitTitle(e.target.value)} 
                  placeholder="Enter habit title..."
                  autoFocus
                />
                <Button type="submit" disabled={isSubmitting || !newHabitTitle.trim()}>Save</Button>
             </form>
          )}

          {isLoading && habits.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-background animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-6 rounded-md bg-secondary" />
                    <div className="h-4 w-40 rounded bg-secondary" />
                  </div>
                  <div className="h-6 w-24 rounded-full bg-secondary" />
                </div>
              ))}
            </div>
          ) : habits.length === 0 && !isAdding ? (
            <div className="py-4 text-center text-sm text-muted-foreground">No habits yet. Click "Add Habit" to start.</div>
          ) : (
            habits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Checkbox 
                    checked={habit.completedToday} 
                    onCheckedChange={() => toggleHabit(habit.id, habit.completedToday)}
                    className="h-6 w-6 rounded-lg" 
                  />
                  <div>
                    <p className={`font-medium ${habit.completedToday ? 'text-muted-foreground line-through' : ''}`}>
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
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
