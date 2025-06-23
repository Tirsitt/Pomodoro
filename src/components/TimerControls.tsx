import { useApp } from "../context/AppContext";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  const { language } = useApp();

  return (
    <div className="flex space-x-4 mt-8">
      {isRunning ? (
        <button
          onClick={onPause}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
        >
          {language === "en" ? "Pause" : "Duraklat"}
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 transition-colors"
        >
          {language === "en" ? "Start" : "Başlat"}
        </button>
      )}
      <button
        onClick={onReset}
        className="px-6 py-2 bg-yellow-200 rounded-lg hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
      >
        {language === "en" ? "Reset" : "Sıfırla"}
      </button>
    </div>
  );
}
