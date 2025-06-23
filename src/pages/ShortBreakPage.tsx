import { useEffect } from "react";
import { usePomodoro } from "../context/PomodoroContext";
import { useApp } from "../context/AppContext";
import CircularTimer from "../components/CircularTimer";
import TimerControls from "../components/TimerControls";

export default function ShortBreakPage() {
  const { timeLeft, isRunning, start, pause, reset, setMode, durations } = usePomodoro();
  const { language } = useApp();

  useEffect(() => {
    setMode('shortBreak');
  }, [setMode]);

  return (
    <div className="flex flex-col items-center dark:bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8 text-green-500 dark:text-green-400">
        {language === 'en' ? "Short Break" : "Kısa Mola"}
      </h1>
      <CircularTimer 
        timeLeft={timeLeft} 
        duration={durations.shortBreak} 
        mode="shortBreak" 
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