import { Link, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function PomodoroLayout() {
  const { language, isDark } = useApp();

  const navItems = [
    { 
      to: "/pomodoro/focus",
      en: "Focus",
      tr: "Odaklanma",
      color: "red"
    },
    { 
      to: "/pomodoro/short-break",
      en: "Short Break",
      tr: "Kısa Mola",
      color: "green"
    },
    { 
      to: "/pomodoro/long-break",
      en: "Long Break",
      tr: "Uzun Mola",
      color: "blue"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <nav className={`flex justify-center space-x-6 mb-8 p-4 rounded-lg shadow ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark 
                  ? `hover:bg-gray-700 text-${item.color}-400`
                  : `hover:bg-gray-200 text-${item.color}-500`
              }`}
            >
              {language === 'en' ? item.en : item.tr}
            </Link>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}