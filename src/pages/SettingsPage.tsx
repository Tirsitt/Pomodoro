import { useForm } from "react-hook-form";
import { usePomodoro } from "../context/PomodoroContext";
import { useApp } from "../context/AppContext";

interface TimerDurations {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

interface CelebrationSettings {
  enableCelebrations: boolean;
  celebrationInterval: number;
  celebrationType: 'confetti' | 'notification' | 'both';
}

interface FormValues extends TimerDurations, CelebrationSettings {}

export default function SettingsPage() {
  const { 
    durations, 
    updateDurations, 
    userSettings, 
    updateUserSettings, 
    triggerCelebration 
  } = usePomodoro();
  const { language, isDark } = useApp();

  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<FormValues>({
    defaultValues: {
      focus: durations.focus / 60,
      shortBreak: durations.shortBreak / 60,
      longBreak: durations.longBreak / 60,
      ...userSettings
    },
    mode: "onChange"
  });

  const celebrationEnabled = watch('enableCelebrations');

  const onSubmit = (data: FormValues) => {
    updateDurations({
      focus: data.focus * 60,
      shortBreak: data.shortBreak * 60,
      longBreak: data.longBreak * 60
    });
    
    updateUserSettings({
      enableCelebrations: data.enableCelebrations,
      celebrationInterval: data.celebrationInterval,
      celebrationType: data.celebrationType
    });

    alert(language === 'en' ? "Settings saved!" : "Ayarlar kaydedildi!");
  };

  const testCelebration = async () => {
    await triggerCelebration();
  };

  const translations = {
    title: language === 'en' ? "Settings" : "Ayarlar",
    timerSettings: language === 'en' ? "Timer Settings" : "Zamanlayıcı Ayarları",
    focusLabel: language === 'en' ? "Focus Duration (minutes):" : "Odaklanma Süresi (dakika):",
    shortBreakLabel: language === 'en' ? "Short Break (minutes):" : "Kısa Mola (dakika):",
    longBreakLabel: language === 'en' ? "Long Break (minutes):" : "Uzun Mola (dakika):",
    celebrationSettings: language === 'en' ? "Celebration Settings" : "Kutlama Ayarları",
    enableCelebrations: language === 'en' ? "Enable celebrations" : "Kutlamaları etkinleştir",
    celebrationInterval: language === 'en' ? "Celebrate every:" : "Kutlama sıklığı:",
    celebrationType: language === 'en' ? "Celebration type:" : "Kutlama türü:",
    testCelebration: language === 'en' ? "Test Celebration" : "Kutlamayı Test Et",
    celebrationOptions: {
      confetti: language === 'en' ? "Confetti" : "Konfeti",
      notification: language === 'en' ? "Notification" : "Bildirim",
      both: language === 'en' ? "Both" : "Her ikisi"
    },
    minError: language === 'en' ? "Must be at least 1 minute" : "En az 1 dakika olmalıdır",
    requiredError: language === 'en' ? "This field is required" : "Bu alan zorunludur",
    saveButton: language === 'en' ? "Save Settings" : "Ayarları Kaydet"
  };

  return (
    <div className={`p-6 max-w-md mx-auto ${isDark ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-6">{translations.title}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Timer Settings Section */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className="text-lg font-semibold mb-4">{translations.timerSettings}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                {translations.focusLabel}
              </label>
              <input
                type="number"
                {...register("focus", {
                  min: { value: 1, message: translations.minError },
                  valueAsNumber: true,
                  required: translations.requiredError
                })}
                className={`w-full p-2 border rounded ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } ${errors.focus ? 'border-red-500' : ''}`}
                min="1"
              />
              {errors.focus && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.focus.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                {translations.shortBreakLabel}
              </label>
              <input
                type="number"
                {...register("shortBreak", {
                  min: { value: 1, message: translations.minError },
                  valueAsNumber: true,
                  required: translations.requiredError
                })}
                className={`w-full p-2 border rounded ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } ${errors.shortBreak ? 'border-red-500' : ''}`}
                min="1"
              />
              {errors.shortBreak && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.shortBreak.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                {translations.longBreakLabel}
              </label>
              <input
                type="number"
                {...register("longBreak", {
                  min: { value: 1, message: translations.minError },
                  valueAsNumber: true,
                  required: translations.requiredError
                })}
                className={`w-full p-2 border rounded ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } ${errors.longBreak ? 'border-red-500' : ''}`}
                min="1"
              />
              {errors.longBreak && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.longBreak.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Celebration Settings Section */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className="text-lg font-semibold mb-4">{translations.celebrationSettings}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {translations.enableCelebrations}
              </label>
              <input
                type="checkbox"
                {...register("enableCelebrations")}
                className={`h-5 w-5 rounded ${
                  isDark ? 'text-blue-500 bg-gray-700' : 'text-blue-600 bg-white'
                }`}
              />
            </div>

            {celebrationEnabled && (
              <>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    {translations.celebrationInterval}
                  </label>
                  <select
                    {...register("celebrationInterval", { valueAsNumber: true })}
                    className={`w-full p-2 border rounded ${
                      isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>
                        {num} {language === 'en' ? 'session' : 'seans'}{num !== 1 ? (language === 'en' ? 's' : '') : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    {translations.celebrationType}
                  </label>
                  <div className="space-y-2">
                    {(['confetti', 'notification', 'both'] as const).map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={type}
                          {...register("celebrationType")}
                          className={isDark ? 'text-blue-500 bg-gray-700' : 'text-blue-600 bg-white'}
                        />
                        <span className="text-sm">{translations.celebrationOptions[type]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={testCelebration}
                  className={`w-full py-2 px-4 rounded font-medium ${
                    isDark
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                >
                  {translations.testCelebration}
                </button>
              </>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded font-medium ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } disabled:opacity-50 transition-colors`}
          disabled={!isValid}
        >
          {translations.saveButton}
        </button>
      </form>
    </div>
  );
}