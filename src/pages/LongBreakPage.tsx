import { useEffect } from "react";
import { usePomodoro } from "../context/PomodoroContext";
import { useApp } from "../context/AppContext";
import CircularTimer from "../components/CircularTimer";
import TimerControls from "../components/TimerControls";

export default function LongBreakPage() {
  const { timeLeft, isRunning, start, pause, reset, setMode, durations } = usePomodoro();
  const { language } = useApp();

  useEffect(() => {
    setMode('longBreak');
  }, [setMode]);

  return (
    <div className="flex flex-col items-center dark:bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-500 dark:text-blue-400">
        {language === 'en' ? "Long Break" : "Uzun Mola"}
      </h1>
      <CircularTimer 
        timeLeft={timeLeft} 
        duration={durations.longBreak} 
        mode="longBreak" 
      />
      <TimerControls 
        isRunning={isRunning} 
        onStart={start} 
        onPause={pause} 
        onReset={reset} 
      />
    </div>
  );
}