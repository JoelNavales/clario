import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"
import { useState, useEffect } from "react"

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  // Close sidebar automatically on navigation
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen w-full bg-[#FCFCFC]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col lg:pl-64 max-w-full">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 pb-20">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
