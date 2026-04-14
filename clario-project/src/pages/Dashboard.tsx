import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Checkbox } from "../components/ui/Checkbox"
import { Badge } from "../components/ui/Badge"
import { useAuth } from "../features/auth/hooks/useAuth"
import { useMood } from "../features/mood/hooks/useMood"
import { useHabits } from "../features/habits/hooks/useHabits"
import { useTasks } from "../features/tasks/hooks/useTasks"
import { useInsights } from "../features/insights/hooks/useInsights"

const MOODS_MAP: Record<string, { label: string; emoji: string; color: string }> = {
  'happy': { label: 'Happy', emoji: '😊', color: 'bg-green-100 text-green-700' },
  'neutral': { label: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-700' },
  'stressed': { label: 'Stressed', emoji: '😫', color: 'bg-red-100 text-red-700' },
}

export function Dashboard() {
  const { user, profile } = useAuth()
  const { todayMood } = useMood()
  const { habits, toggleHabit } = useHabits()
  const { tasks, updateTask } = useTasks()
  const { insights } = useInsights()

  const currentMood = todayMood && MOODS_MAP[todayMood.mood_id] 
    ? MOODS_MAP[todayMood.mood_id] 
    : { label: 'Not Logged', emoji: '🤔', color: 'bg-gray-100 text-gray-700' }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, {profile?.name || user?.user_metadata?.name || 'User'}</h1>
        <p className="text-muted-foreground mt-1">Here is a summary of your day.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Mood Card */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${currentMood.color.split(' ')[0]} text-2xl`}>
                {currentMood.emoji}
              </div>
              <div>
                <p className="text-xl font-semibold">{currentMood.label}</p>
                {/* Visual indicator logic removed for brevity or could be added back */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habit Card */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Habits</CardTitle>
            <Badge variant="secondary">{habits.filter(h => h.completedToday).length}/{habits.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-4">
              {habits.slice(0,3).map((habit) => (
                <div key={habit.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={habit.completedToday} 
                      onCheckedChange={() => toggleHabit(habit.id, habit.completedToday)}
                    />
                    <span className={`text-sm ${habit.completedToday ? 'text-muted-foreground line-through' : 'font-medium'}`}>{habit.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{habit.streak} 🔥</span>
                </div>
              ))}
              {habits.length === 0 && <span className="text-sm text-muted-foreground">No habits yet.</span>}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Tasks</CardTitle>
            <Badge variant="outline">{tasks.filter(t => !t.completed).length} pending</Badge>
          </CardHeader>
          <CardContent>
             <div className="space-y-3 mt-4">
              {tasks.slice(0,3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={task.completed} 
                      onCheckedChange={() => updateTask(task.id, { completed: !task.completed })}
                    />
                    <span className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>{task.title}</span>
                  </div>
                  <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'} className="capitalize text-[10px] px-2 py-0.5">
                    {task.priority}
                  </Badge>
                </div>
              ))}
              {tasks.length === 0 && <span className="text-sm text-muted-foreground">No tasks yet.</span>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insight Card */}
      <Card className="bg-secondary/50 border-none">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
            ✨
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-sm">Daily Insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {insights.length > 0 ? insights[0].text : "No insights available yet. Keep tracking your day!"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
