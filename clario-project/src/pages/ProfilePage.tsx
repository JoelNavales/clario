import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Settings, LogOut, CheckCircle, Flame, Target, Activity, Palette, ChevronDown } from "lucide-react"
import { useAuth } from "../features/auth/hooks/useAuth"
import { useHabits } from "../features/habits/hooks/useHabits"
import { useTasks } from "../features/tasks/hooks/useTasks"
import { useMood } from "../features/mood/hooks/useMood"
import { useNavigate } from "react-router-dom"
import { useTheme, THEMES, type ThemeName } from "../features/theme/ThemeContext"

export function ProfilePage() {
  const { user, profile, signOut } = useAuth()
  const { habits } = useHabits()
  const { tasks } = useTasks()
  const { weeklyMoods } = useMood()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [pendingTheme, setPendingTheme] = useState<ThemeName>(theme)

  const handleSaveTheme = () => {
    setTheme(pendingTheme)
    setThemeMenuOpen(false)
  }

  const handleLogout = async () => {
    await signOut()
    navigate("/login")
  }

  // Derive some stats
  const totalHabits = habits.length
  const tasksCompleted = tasks.filter(t => t.completed).length
  const currentStreak = Math.max(...habits.map(h => h.streak), 0)
  const moodConsistency = weeklyMoods.length > 0 ? `${Math.round((weeklyMoods.length / 7) * 100)}%` : "0%"

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account and settings.</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-secondary shadow-sm flex items-center justify-center bg-primary text-3xl font-bold text-primary-foreground">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile?.name || "User"} className="h-full w-full object-cover" />
              ) : (
                profile?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-semibold tracking-tight">{profile?.name || user?.user_metadata?.name || "User"}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" className="shrink-0 gap-2 font-medium">
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-secondary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 bg-primary/10 text-primary rounded-full mb-1">
               <Target className="h-5 w-5" />
            </div>
            <p className="text-2xl font-semibold">{totalHabits}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Habits Tracked</p>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 bg-green-500/10 text-green-600 rounded-full mb-1">
               <CheckCircle className="h-5 w-5" />
            </div>
            <p className="text-2xl font-semibold">{tasksCompleted}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Tasks Done</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 bg-orange-500/10 text-orange-600 rounded-full mb-1">
               <Flame className="h-5 w-5" />
            </div>
            <p className="text-2xl font-semibold">{currentStreak}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Top Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-full mb-1">
               <Activity className="h-5 w-5" />
            </div>
            <p className="text-2xl font-semibold">{moodConsistency}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Mood Logs Setup</p>
          </CardContent>
        </Card>
      </div>

      {/* Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between p-6 hover:bg-secondary/20 transition-colors">
              <div>
                <p className="font-medium text-sm">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive daily reminders to track your habits.</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer shadow-sm">
                <div className="h-5 w-5 rounded-full bg-background absolute right-0.5 top-[2px]" />
              </div>
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => {
                  setPendingTheme(theme)
                  setThemeMenuOpen((o) => !o)
                }}
                className="flex items-center justify-between p-6 hover:bg-secondary/20 transition-colors text-left w-full"
              >
                <div className="flex items-center gap-3">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Color Theme</p>
                    <p className="text-sm text-muted-foreground">Currently: {THEMES[theme].label}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${themeMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {themeMenuOpen && (
                <div className="px-6 pb-6 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    {(Object.keys(THEMES) as ThemeName[]).map((name) => {
                      const config = THEMES[name]
                      const isSelected = pendingTheme === name
                      return (
                        <button
                          key={name}
                          onClick={() => setPendingTheme(name)}
                          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all duration-150 cursor-pointer w-16 ${
                            isSelected
                              ? 'border-primary bg-primary/5 scale-105'
                              : 'border-border/50 hover:border-border hover:bg-secondary/50'
                          }`}
                          aria-label={`Select ${config.label} theme`}
                          aria-pressed={isSelected}
                        >
                          <span
                            className="h-8 w-8 rounded-full shadow-sm transition-all"
                            style={{
                              backgroundColor: config.previewColor,
                              outline: isSelected ? `3px solid ${config.previewColor}` : '3px solid transparent',
                              outlineOffset: '2px',
                            }}
                          />
                          <span className="text-xs font-medium text-foreground leading-none">{config.label}</span>
                        </button>
                      )
                    })}
                  </div>
                  <Button className="w-full" onClick={handleSaveTheme}>
                    Save Theme
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </div>
  )
}
