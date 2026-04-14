import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { authService } from "../features/auth/services/authService"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await authService.signIn(email, password)
      navigate("/")
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4 font-sans">
      <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4 shadow-sm">
            <img src="/hero.png" alt="Clario" className="h-12 w-12 rounded-xl" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your details to sign in to Clario</p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <form className="space-y-4" onSubmit={handleLogin}>
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100/50 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground cursor-pointer">Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none text-foreground cursor-pointer">Password</label>
                  <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Forgot password?</a>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline underline-offset-4 font-medium transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
