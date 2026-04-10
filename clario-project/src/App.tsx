import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { MoodPage } from "./pages/MoodPage"
import { HabitsPage } from "./pages/HabitsPage"
import { TasksPage } from "./pages/TasksPage"
import { InsightsPage } from "./pages/InsightsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="mood" element={<MoodPage />} />
          <Route path="habits" element={<HabitsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="insights" element={<InsightsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
