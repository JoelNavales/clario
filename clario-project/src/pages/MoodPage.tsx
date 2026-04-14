import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { useMood } from "../features/mood/hooks/useMood"

const MOODS_OPTIONS = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'neutral', label: 'Neutral', emoji: '😐' },
  { id: 'stressed', label: 'Stressed', emoji: '😫' },
];

export function MoodPage() {
  const { todayMood, weeklyMoods, setMood, isLoading } = useMood()

  const moodScoreMap: Record<string, number> = {
    'happy': 100,
    'neutral': 50,
    'stressed': 20,
  }

  const last7DaysHeights = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const moodForDay = weeklyMoods.find(m => m.date === dateStr);
    return moodForDay ? (moodScoreMap[moodForDay.mood_id] || 0) : 0;
  });

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
          {isLoading ? (
            <div className="py-8 flex justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOODS_OPTIONS.map((mood) => {
                const isSelected = todayMood?.mood_id === mood.id;
                return (
                  <button 
                    key={mood.id}
                    onClick={() => setMood(mood.id)}
                    className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all cursor-pointer group ${isSelected ? 'border-primary bg-primary/10' : 'border-border bg-background hover:bg-secondary hover:border-primary/50'}`}
                  >
                    <span className={`text-4xl transition-transform block ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>{mood.emoji}</span>
                    <span className={`text-sm ${isSelected ? 'font-bold text-primary' : 'font-medium'}`}>{mood.label}</span>
                  </button>
                )
              })}
              <button disabled className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-dashed border-border text-muted-foreground transition-all cursor-not-allowed opacity-50">
                <span className="text-2xl">+</span>
                <span className="text-sm font-medium">Add custom</span>
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-48 flex flex-col justify-end gap-2 pt-8">
            <div className="flex items-end justify-between h-full w-full gap-2">
              {last7DaysHeights.map((h, i) => (
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
