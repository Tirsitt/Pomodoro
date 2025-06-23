import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PomodoroProvider } from "./context/PomodoroContext";
import { TaskProvider } from "./context/TaskContext";
import { useApp } from "./context/AppContext";
import HomePage from "./pages/Home";
import TasksPage from "./pages/Tasks";
import Navbar from "./components/Navbar";
import PomodoroLayout from "./pages/PomodoroLayout";
import FocusPage from "./pages/FocusPage";
import ShortBreakPage from "./pages/ShortBreakPage";
import LongBreakPage from "./pages/LongBreakPage";
import SettingsPage from "./pages/SettingsPage";
import Footer from "./components/Footer";

function AppWrapper() {
  const { isDark } = useApp();

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pomodoro" element={<PomodoroLayout />}>
            <Route index element={<FocusPage />} />
            <Route path="focus" element={<FocusPage />} />
            <Route path="short-break" element={<ShortBreakPage />} />
            <Route path="long-break" element={<LongBreakPage />} />
          </Route>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <PomodoroProvider>
        <TaskProvider>
          <AppWrapper />
        </TaskProvider>
      </PomodoroProvider>
    </Router>
  );
}

export default App;
