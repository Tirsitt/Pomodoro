import { useApp } from "../context/AppContext";
import { useQuote } from "../hooks/useQuote";

export default function Home() {
  const { language } = useApp();
  const { quote, loading } = useQuote(language);

  const EN_TEXT = (
    <>
      <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-2">
        🍅 About Pomodoro
      </h1>
      <p className="mb-3 text-lg">
        The Pomodoro Technique is a simple but effective time management method.
        Work for a focused session (usually 25 minutes) and then take a short break.
      </p>
      <p className="mb-3 text-lg">Our app helps you to:</p>
      <ul className="list-disc list-inside mb-4 space-y-1 text-base">
        <li>Add tasks you want to complete</li>
        <li>Set your focus and break durations</li>
        <li>Start the timer and stay focused</li>
        <li>Take short or long breaks when needed</li>
      </ul>
      <p className="text-lg font-medium mb-6">Stay productive and avoid burnout! 🍅✨</p>

      {/* Quote Display - Now using useQuote hook */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-inner min-h-[120px]">
        {loading ? (
          <p className="italic text-gray-600 dark:text-gray-400">
            {language === 'en' ? "Loading inspirational quote..." : "Motivasyon sözü yükleniyor..."}
          </p>
        ) : (
          <>
            <blockquote className="italic text-gray-700 dark:text-gray-300 text-lg mb-2">
              "{quote?.text}"
            </blockquote>
            <p className="text-right font-semibold text-gray-900 dark:text-gray-100">
              — {quote?.author}
            </p>
          </>
        )}
      </div>
    </>
  );

  const TR_TEXT = (
    <>
      <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-2">
        🍅 Pomodoro Hakkında
      </h1>
      <p className="mb-3 text-lg">
        Pomodoro Tekniği basit ama etkili bir zaman yönetimi yöntemidir.
        Genelde 25 dakika odaklanarak çalışılır, ardından kısa bir mola verilir.
      </p>
      <p className="mb-3 text-lg">Uygulamamız size şunları sağlar:</p>
      <ul className="list-disc list-inside mb-4 space-y-1 text-base">
        <li>Tamamlamak istediğiniz görevleri ekleyin</li>
        <li>Odaklanma ve mola sürelerini ayarlayın</li>
        <li>Timer'ı başlatın ve odaklanın</li>
        <li>Gerekli olduğunda kısa veya uzun molalar verin</li>
      </ul>
      <p className="text-lg font-medium mb-6">Verimli kalın, tükenmeyin! 🍅✨</p>

      {/* Quote Display - Now using useQuote hook */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-inner min-h-[120px]">
        {loading ? (
          <p className="italic text-gray-600 dark:text-gray-400">Alıntı yükleniyor...</p>
        ) : (
          <>
            <blockquote className="italic text-gray-700 dark:text-gray-300 text-lg mb-2">
              "{quote?.text}"
            </blockquote>
            <p className="text-right font-semibold text-gray-900 dark:text-gray-100">
              — {quote?.author}
            </p>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="flex justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 text-gray-800 dark:text-gray-100">
        {language === "en" ? EN_TEXT : TR_TEXT}
      </div>
    </div>
  );
}