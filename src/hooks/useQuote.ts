import { useState, useEffect } from "react";

interface Quote {
  text: string;
  author: string;
}

export const useQuote = (language: "en" | "tr" = "en") => {
  const [quote, setQuote] = useState<Quote>({
    text: language === "en"
      ? "Focus on what matters and keep moving forward."
      : "Önemli olana odaklan ve ilerlemeye devam et.",
    author: "Pomodoro"
  });
  const [loading, setLoading] = useState(false);

  // Local fallback quotes
  const FALLBACK_QUOTES = {
    en: [
  { text: "Concentrate all your thoughts upon the work at hand.", author: "Bruce Lee" },
  { text: "Productivity is doing what needs to be done when it needs to be done.", author: "Benjamin Franklin" },
  { text: "Time isn't the enemy. Procrastination is.", author: "Tim Ferriss" },
  { text: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." }
],
    tr: [
  { text: "Tüm düşüncelerini elindeki işe odakla.", author: "Bruce Lee" },
  { text: "Verimlilik, yapılması gerekeni gerektiği zaman yapmaktır.", author: "Benjamin Franklin" },
  { text: "İlerlemenin sırrı başlamaktır.", author: "Mark Twain" },
  { text: "Düşman zaman değil, ertelemektir.", author: "Tim Ferriss" },
  { text: "Merdivenin tamamını görmek zorunda değilsin, sadece ilk adımı at.", author: "Martin Luther King Jr." }
]
  };

  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://zenquotes.io/api/random");

        if (response.ok) {
          const [data] = await response.json();
          if (data?.quote && data?.author) {
            setQuote({
              text: data.quote,
              author: data.author
            });
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.warn("API Ninjas fetch failed, using fallback quote");
      }

      // If API fails — use local fallback
      const fallbackArr = FALLBACK_QUOTES[language];
      setQuote(fallbackArr[Math.floor(Math.random() * fallbackArr.length)]);
      setLoading(false);
    };

    fetchQuote();
  }, [language]);

  return { quote, loading };
};
