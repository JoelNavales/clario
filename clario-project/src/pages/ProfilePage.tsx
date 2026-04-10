import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { user, userStats } from "../data/mockData"
import { Settings, LogOut, CheckCircle, Flame, Target, Activity } from "lucide-react"

export function ProfilePage() {
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
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-secondary shadow-sm">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-semibold tracking-tight">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
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
            <p className="text-2xl font-semibold">{userStats.totalHabits}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Habits Tracked</p>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 bg-green-500/10 text-green-600 rounded-full mb-1">
               <CheckCircle className="h-5 w-5" />
            </div>
            <p className="text-2xl font-semibold">{userStats.tasksCompleted}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Tasks Done</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 bg-orange-500/10 text-orange-600 rounded-full mb-1">
               <Flame className="h-5 w-5" />
            </div>
            <p className="text-2xl font-semibold">{userStats.currentStreak}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-full mb-1">
               <Activity className="h-5 w-5" />
            </div>
            <p className="text-2xl font-semibold">{userStats.moodConsistency}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Consistency</p>
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
              {/* Mock Toggle */}
              <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer shadow-sm">
                <div className="h-5 w-5 rounded-full bg-background absolute right-0.5 top-[2px]" />
              </div>
            </div>
            <div className="flex items-center justify-between p-6 hover:bg-secondary/20 transition-colors">
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark mode appearance (UI only).</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-secondary relative cursor-pointer shadow-inner">
                <div className="h-5 w-5 rounded-full bg-background absolute left-0.5 top-[2px] border border-border" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => window.location.href = '/login'}>
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </div>
  )
}
