import { Search, Bell, Menu } from "lucide-react"
import { Link } from "react-router-dom"
//import { user } from "../../data/mockData"

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 md:px-8 backdrop-blur-xl gap-4">

      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-3 lg:hidden shrink-0">
        <button onClick={onMenuClick} className="p-1 -ml-1 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold tracking-tight text-primary">Clario</h1>
      </div>

      {/* Search - hidden on mobile, visible on md+ */}
      <div className="flex flex-1 items-center justify-end lg:justify-start">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Mobile Search Icon Alternative */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer md:hidden">
          <Search className="h-5 w-5" />
        </button>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <Link to="/profile" className="h-10 w-10 overflow-hidden rounded-full border border-border bg-secondary hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer shrink-0">
          {/* <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full object-cover"
          /> */}
        </Link>
      </div>
    </header>
  )
}
