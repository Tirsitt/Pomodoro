import { usePomodoro } from "../context/PomodoroContext";
import { useApp } from "../context/AppContext";
import { Button } from "./ui/button";

export default function PomodoroTimer() {
  const { timeLeft, isRunning, start, pause, reset, mode } = usePomodoro();
  const { language, isDark } = useApp();

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  // Mode colors
  const modeColors = {
    focus: isDark ? 'text-red-400' : 'text-red-500',
    shortBreak: isDark ? 'text-green-400' : 'text-green-500',
    longBreak: isDark ? 'text-blue-400' : 'text-blue-500'
  };

  // Button colors based on mode
  const buttonColors = {
    focus: isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600',
    shortBreak: isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600',
    longBreak: isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
  };

  const translations = {
    title: {
      en: "Pomodoro Timer",
      tr: "Pomodoro Zamanlayıcı"
    },
    focus: {
      en: "Focus Time",
      tr: "Odaklanma Zamanı"
    },
    shortBreak: {
      en: "Short Break",
      tr: "Kısa Mola"
    },
    longBreak: {
      en: "Long Break",
      tr: "Uzun Mola"
    },
    start: {
      en: "Start",
      tr: "Başlat"
    },
    pause: {
      en: "Pause",
      tr: "Durdur"
    },
    reset: {
      en: "Reset",
      tr: "Sıfırla"
    }
  };

  const getModeTitle = () => {
    switch(mode) {
      case 'focus': return translations.focus[language];
      case 'shortBreak': return translations.shortBreak[language];
      case 'longBreak': return translations.longBreak[language];
      default: return translations.title[language];
    }
  };

  return (
    <div className={`flex flex-col items-center p-6 rounded-lg shadow-md ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h1 className={`text-2xl font-bold mb-4 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        {getModeTitle()}
      </h1>
      
      {/* Circular Timer Display */}
      <div className="relative w-64 h-64 mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className={isDark ? 'text-gray-600' : 'text-gray-200'}
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className={modeColors[mode]}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * timeLeft) / (25 * 60)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-4xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {minutes}:{seconds}
          </span>
        </div>
      </div>

      {/* Controls */}
      // Controls section only - replace this part in your existing component
<div className="flex gap-2">
  {isRunning ? (
    <Button 
      className={`min-w-[100px] text-white ${
        mode === 'focus' ? 'bg-red-500 hover:bg-red-600' :
        mode === 'shortBreak' ? 'bg-green-500 hover:bg-green-600' :
        'bg-blue-500 hover:bg-blue-600'
      }`}
      onClick={pause}
    >
      {language === 'en' ? 'Pause' : 'Durdur'}
    </Button>
  ) : (
    <Button 
      className={`min-w-[100px] text-white ${
        mode === 'focus' ? 'bg-red-500 hover:bg-red-600' :
        mode === 'shortBreak' ? 'bg-green-500 hover:bg-green-600' :
        'bg-blue-500 hover:bg-blue-600'
      }`}
      onClick={start}
    >
      {language === 'en' ? 'Start' : 'Başlat'}
    </Button>
  )}
  <Button 
    variant={isDark ? "outline" : "secondary"} 
    onClick={reset}
    className="min-w-[100px]"
  >
    {language === 'en' ? 'Reset' : 'Sıfırla'}
  </Button>
</div>
    </div>
  );
}