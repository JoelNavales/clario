import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#FCFCFC]">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-64">
        <Navbar />
        <main className="flex-1 p-8 pb-20">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
