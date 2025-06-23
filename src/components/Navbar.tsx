import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { isDark, toggleTheme, language, toggleLanguage } = useApp();

  const translations = {
    home: language === 'en' ? "🍅 About" : "🍅 Hakkında",
    pomodoro: language === 'en' ? "Pomodoro" : "Pomodoro",
    tasks: language === 'en' ? "Tasks" : "Görevler",
    settings: language === 'en' ? "Settings" : "Ayarlar",
    themeButton: isDark ? "🌙" : "☀️",
    languageButton: language === 'en' ? "EN" : "TR"
  };
const openLofi = () => {
    window.open("https://www.youtube.com/watch?v=jfKfPfyJRdk", "_blank");
  };
  return (
    <nav className={`shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {translations.home}
            </Link>
            <Link 
              to="/pomodoro" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {translations.pomodoro}
            </Link>
            <Link 
              to="/tasks" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {translations.tasks}
            </Link>
            <Link 
              to="/settings" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {translations.settings}
            </Link>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={toggleTheme} 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {translations.themeButton}
            </button>
            <button
              onClick={toggleLanguage}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {translations.languageButton}
            </button>
            <button 
        onClick={openLofi}
        className="px-4 py-2 bg-secondary rounded hover:bg-secondary-foreground transition"
      >
        🎵 Play Lofi
      </button>
          </div>
        </div>
      </div>
    </nav>
  );
}