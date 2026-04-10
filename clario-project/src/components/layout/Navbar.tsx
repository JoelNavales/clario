import { Search, Bell } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-secondary">
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
