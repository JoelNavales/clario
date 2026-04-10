import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { moods } from "../data/mockData"

export function MoodPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Mood Tracker</h1>
        <p className="text-muted-foreground mt-1">How are you feeling today?</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Select your mood</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moods.map((mood) => (
              <button 
                key={mood.id}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border bg-background hover:bg-secondary hover:border-primary/50 transition-all cursor-pointer group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform block">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
            <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-dashed border-border text-muted-foreground hover:bg-secondary transition-all cursor-pointer">
              <span className="text-2xl">+</span>
              <span className="text-sm font-medium">Add custom</span>
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-48 flex flex-col justify-end gap-2 pt-8">
            <div className="flex items-end justify-between h-full w-full gap-2">
              {[40, 70, 45, 90, 65, 80, 60].map((h, i) => (
                <div key={i} className="w-full bg-secondary rounded-t-md relative group h-full flex items-end">
                  <div 
                    className="w-full bg-primary/20 rounded-t-md transition-all group-hover:bg-primary/40 block" 
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Journal Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea 
              className="w-full h-40 p-4 rounded-xl border border-border bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
              placeholder="Write down your thoughts..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
