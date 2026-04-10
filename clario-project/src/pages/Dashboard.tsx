import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Checkbox } from "../components/ui/Checkbox"
import { Badge } from "../components/ui/Badge"
import { moods, habits, tasks, insights } from "../data/mockData"

export function Dashboard() {
  const currentMood = moods[0]; // happy

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Felix</h1>
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-2xl">
                {currentMood.emoji}
              </div>
              <div>
                <p className="text-xl font-semibold">{currentMood.label}</p>
                <div className="mt-1 flex gap-1">
                  {moods.slice(0, 3).map((m, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full ${m.color.split(' ')[0]}`} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habit Card */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Habits</CardTitle>
            <Badge variant="secondary">{habits.filter(h => h.completed).length}/{habits.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-4">
              {habits.slice(0,3).map((habit) => (
                <div key={habit.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={habit.completed} />
                    <span className={`text-sm ${habit.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>{habit.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{habit.streak} 🔥</span>
                </div>
              ))}
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
                    <Checkbox checked={task.completed} />
                    <span className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>{task.title}</span>
                  </div>
                  <Badge variant={task.priority === 'high' ? 'default' : 'secondary'} className="capitalize text-[10px] px-2 py-0.5">
                    {task.priority}
                  </Badge>
                </div>
              ))}
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
              {insights[0].text}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
