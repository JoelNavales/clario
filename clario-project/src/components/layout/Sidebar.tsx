import { NavLink, Link } from "react-router-dom"
import { Home, Smile, CheckSquare, ListTodo, Lightbulb, User, LogOut, X } from "lucide-react"
import { cn } from "../../lib/utils"

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Smile, label: "Mood", path: "/mood" },
  { icon: CheckSquare, label: "Habits", path: "/habits" },
  { icon: ListTodo, label: "Tasks", path: "/tasks" },
  { icon: Lightbulb, label: "Insights", path: "/insights" },
  { icon: User, label: "Profile", path: "/profile" },
]

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background/80 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col px-4 py-8">
          <div className="mb-10 px-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-primary">Clario</h1>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-muted-foreground hover:bg-secondary p-1 rounded-md transition-colors cursor-pointer">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
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
          
          <div className="mt-auto pt-8">
            <Link 
              to="/login"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
