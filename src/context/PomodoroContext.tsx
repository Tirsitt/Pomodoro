import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useApp } from "./AppContext";

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface Durations {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

interface PomodoroSession {
  date: string;
  mode: TimerMode;
  duration: number;
}

interface UserSettings {
  celebrationInterval: number;
  enableCelebrations: boolean;
  celebrationType: 'confetti' | 'notification' | 'both';
}

interface PomodoroContextProps {
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  setMode: (newMode: TimerMode) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  durations: Durations;
  updateDurations: (newDurations: Durations) => void;
  playNotification: () => void;
  completedPomodoros: number;
  completedFocusSessions: number;
  completedSessions: PomodoroSession[];
  incrementPomodoros: () => void;
  resetPomodoros: () => void;
  getTodayCompletedCount: () => number;
  userSettings: UserSettings;
  updateUserSettings: (newSettings: Partial<UserSettings>) => void;
  triggerCelebration: (message?: string) => Promise<void>;
}

const PomodoroContext = createContext<PomodoroContextProps | undefined>(undefined);

const DEFAULT_SETTINGS: UserSettings = {
  celebrationInterval: 4,
  enableCelebrations: true,
  celebrationType: 'both'
};

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useApp();
  const [durations, setDurations] = useState<Durations>({
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  });

  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(durations.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const [completedSessions, setCompletedSessions] = useState<PomodoroSession[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Notification messages in both languages
  const notificationMessages = {
    focus: {
      en: "Focus session complete! Time for a break.",
      tr: "Odaklanma seansı tamamlandı! Mola zamanı."
    },
    shortBreak: {
      en: "Short break over! Time to focus.",
      tr: "Kısa mola bitti! Odaklanma zamanı."
    },
    longBreak: {
      en: "Long break over! Ready for another session?",
      tr: "Uzun mola bitti! Yeni bir seansa hazır mısın?"
    },
    celebration: {
      en: "Great job! You completed {count} focus sessions!",
      tr: "Harika iş! {count} odaklanma seansını tamamladınız!"
    }
  };

  // Initialize audio and load saved data
  useEffect(() => {
    audioRef.current = new Audio('/sounds/notification.mp3');
    audioRef.current.volume = 0.5;

    const savedPomodoros = localStorage.getItem('pomodoros');
    const savedSessions = localStorage.getItem('pomodoros_sessions');
    const savedSettings = localStorage.getItem('pomodoros_settings');

    if (savedPomodoros) setCompletedPomodoros(parseInt(savedPomodoros));
    if (savedSessions) setCompletedSessions(JSON.parse(savedSessions));
    if (savedSettings) setUserSettings(JSON.parse(savedSettings));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const updateUserSettings = (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...userSettings, ...newSettings };
    setUserSettings(updatedSettings);
    localStorage.setItem('pomodoros_settings', JSON.stringify(updatedSettings));
  };

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const triggerCelebration = async (message?: string) => {
    if (!userSettings.enableCelebrations) return;

    const celebrationMessage = message || 
      notificationMessages.celebration[language]
        .replace('{count}', userSettings.celebrationInterval.toString());

    try {
      if (userSettings.celebrationType === 'confetti' || userSettings.celebrationType === 'both') {
        const confetti = await import('canvas-confetti');
        confetti.default({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      if (userSettings.celebrationType === 'notification' || userSettings.celebrationType === 'both') {
        if (Notification.permission === 'granted') {
          new Notification(
            language === 'en' ? 'Achievement Unlocked!' : 'Başarı Kilit Açıldı!',
            {
              body: celebrationMessage,
              icon: '/favicon.ico'
            }
          );
        } else {
          console.log('🎉 ' + celebrationMessage);
        }
      }
    } catch (error) {
      console.error('Celebration error:', error);
    }
  };

  const incrementPomodoros = () => {
    const newCount = completedPomodoros + 1;
    const newSession = {
      date: new Date().toISOString(),
      mode,
      duration: durations[mode]
    };

    setCompletedPomodoros(newCount);
    setCompletedSessions(prev => [...prev, newSession]);

    if (mode === 'focus') {
      const newFocusCount = completedFocusSessions + 1;
      setCompletedFocusSessions(newFocusCount);
      
      if (userSettings.enableCelebrations && 
          newFocusCount % userSettings.celebrationInterval === 0) {
        triggerCelebration();
      }
    }

    localStorage.setItem('pomodoros', newCount.toString());
    localStorage.setItem('pomodoros_sessions', JSON.stringify([...completedSessions, newSession]));
  };

  const resetPomodoros = () => {
    setCompletedPomodoros(0);
    setCompletedFocusSessions(0);
    setCompletedSessions([]);
    localStorage.removeItem('pomodoros');
    localStorage.removeItem('pomodoros_sessions');
  };

  const getTodayCompletedCount = () => {
    const today = new Date().toDateString();
    return completedSessions.filter(
      session => new Date(session.date).toDateString() === today
    ).length;
  };

  // Timer logic
  useEffect(() => {
    setTimeLeft(durations[mode]);
    setIsRunning(false);
  }, [mode, durations]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            playNotification();
            incrementPomodoros();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const start = () => { 
    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    if (timeLeft > 0) setIsRunning(true); 
  };
  
  const pause = () => setIsRunning(false);
  
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const updateDurations = (newDurations: Durations) => {
    setDurations(newDurations);
  };

  // Update browser tab title
  useEffect(() => {
    if (isRunning) {
      const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
      const secs = (timeLeft % 60).toString().padStart(2, "0");
      document.title = language === 'en' 
        ? `⏳ ${mins}:${secs} - Pomodoro Timer`
        : `⏳ ${mins}:${secs} - Pomodoro Zamanlayıcı`;
    } else {
      document.title = language === 'en' 
        ? "🍅 Pomodoro Timer" 
        : "🍅 Pomodoro Zamanlayıcı";
    }
  }, [isRunning, timeLeft, language]);

  return (
    <PomodoroContext.Provider value={{
      timeLeft,
      isRunning,
      mode,
      setMode,
      start,
      pause,
      reset,
      durations,
      updateDurations,
      playNotification,
      completedPomodoros,
      completedFocusSessions,
      completedSessions,
      incrementPomodoros,
      resetPomodoros,
      getTodayCompletedCount,
      userSettings,
      updateUserSettings,
      triggerCelebration
    }}>
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) throw new Error("usePomodoro must be used within PomodoroProvider");
  return context;
};