import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useTheme, THEMES, type ThemeName } from '../features/theme/ThemeContext'
import { useAuth } from '../features/auth/hooks/useAuth'

export function OnboardingPage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const { profile, user } = useAuth()

  const firstName = profile?.name?.split(' ')[0] ?? 'there'

  const handleGetStarted = () => {
    if (user?.id) {
      localStorage.setItem(`clario_onboarding_done_${user.id}`, 'true')
    }
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4 font-sans">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-8 text-center">
          <img src="/hero.png" alt="Clario" className="h-12 w-12 rounded-xl mx-auto mb-4" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome, {firstName}! 🎉
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Let's personalize Clario to match your style.
          </p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-base font-medium text-foreground mb-1">Choose a color theme</h2>
              <p className="text-sm text-muted-foreground mb-4">You can always change this later in your profile.</p>

              <div className="grid grid-cols-5 gap-3">
                {(Object.keys(THEMES) as ThemeName[]).map((name) => {
                  const config = THEMES[name]
                  const isSelected = theme === name
                  return (
                    <button
                      key={name}
                      onClick={() => setTheme(name)}
                      className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/5 scale-105'
                          : 'border-border/50 hover:border-border hover:bg-secondary/50'
                      }`}
                      aria-label={`Select ${config.label} theme`}
                      aria-pressed={isSelected}
                    >
                      <span
                        className="h-9 w-9 rounded-full shadow-sm transition-all"
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
            </div>

            <Button className="w-full" onClick={handleGetStarted}>
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
