import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { MoodPage } from "./pages/MoodPage"
import { HabitsPage } from "./pages/HabitsPage"
import { TasksPage } from "./pages/TasksPage"
import { InsightsPage } from "./pages/InsightsPage"
import { ProfilePage } from "./pages/ProfilePage"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="mood" element={<MoodPage />} />
          <Route path="habits" element={<HabitsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
