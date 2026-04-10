import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

export function SignupPage() {
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
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">Name</label>
                <Input type="text" placeholder="Joel Navales" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">Email</label>
                <Input type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full mt-2" onClick={() => window.location.href = '/'}>
                Create Account
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
