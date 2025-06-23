import { useEffect } from "react";
import { usePomodoro } from "../context/PomodoroContext";
import { useTasks } from "../context/TaskContext";
import { useApp } from "../context/AppContext";
import CircularTimer from "../components/CircularTimer";
import TimerControls from "../components/TimerControls";

export default function FocusPage() {
  const { timeLeft, isRunning, start, pause, reset, setMode, durations } = usePomodoro();
  const { tasks } = useTasks();
  const { toggleTask } = useTasks();
  const { language } = useApp();

  useEffect(() => {
    setMode('focus');
  }, [setMode]);

  return (
    <div className="flex flex-col items-center dark:bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8 text-red-500 dark:text-red-400">
        {language === 'en' ? "Focus Time" : "Odaklanma Zamanı"}
      </h1>
      <CircularTimer timeLeft={timeLeft} duration={durations.focus} mode="focus" />
      <TimerControls isRunning={isRunning} onStart={start} onPause={pause} onReset={reset} />

      {/* Task List Section */}
      <div className="mt-12 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          {language === 'en' ? "Your Tasks" : "Görevleriniz"}
        </h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {language === 'en' 
              ? "No tasks yet. Add some in the Tasks section!" 
              : "Henüz görev yok. Görevler bölümünden ekleyin!"}
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map(task => (
              <li 
                key={task.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  task.completed 
                    ? 'bg-gray-100 dark:bg-gray-700 line-through text-gray-400 dark:text-gray-500' 
                    : 'bg-white dark:bg-gray-800 dark:text-white'
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}