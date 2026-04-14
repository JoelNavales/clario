import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { authService } from "../features/auth/services/authService"

export function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await authService.signUp(email, password, name)
      navigate("/onboarding")
    } catch (err: any) {
      setError(err.message || "Failed to sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4 font-sans">
      <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4 shadow-sm">
            C
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create an account</h1>
          <p className="text-sm text-muted-foreground mt-1">Start your journey with Clario today</p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <form className="space-y-4" onSubmit={handleSignup}>
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100/50 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">Name</label>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline underline-offset-4 font-medium transition-colors">Log in</Link>
        </p>
      </div>
    </div>
  )
}
