import { NavLink } from "react-router-dom"
import { Home, Smile, CheckSquare, ListTodo, Lightbulb } from "lucide-react"
import { cn } from "../../lib/utils"

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Smile, label: "Mood", path: "/mood" },
  { icon: CheckSquare, label: "Habits", path: "/habits" },
  { icon: ListTodo, label: "Tasks", path: "/tasks" },
  { icon: Lightbulb, label: "Insights", path: "/insights" },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-full flex-col px-4 py-8">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-semibold tracking-tight text-primary">Clario</h1>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
