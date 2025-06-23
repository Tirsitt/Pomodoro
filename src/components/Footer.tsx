import { useApp } from "../context/AppContext";

export default function Footer() {
  const { language } = useApp();

  return (
    <footer className="w-full mt-12 py-6 border-t text-center text-sm text-muted-foreground">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
        <span>
          {language === "en"
            ? "Made by Tirsit —"
            : "Hazırlayan: Tirsit —"}
        </span>
        <a
          href="https://github.com/Tirsitt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary underline hover:text-primary/80 transition-colors"
        >
          <GitHubIcon className="w-5 h-5" />
          GitHub
        </a>
      </div>
    </footer>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 0C5.37 0 0 5.372 0 12c0 5.303 
        3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
        0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.084-.729.084-.729 
        1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 
        3.492.997.108-.776.418-1.304.76-1.604-2.665-.305-5.467-1.334-5.467-5.93 
        0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.527.105-3.176 
        0 0 1.005-.322 3.3 1.23a11.51 11.51 0 0 1 3-.405c1.02.005 2.045.138 3 
        .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.649.24 2.873.12 3.176.765 
        .84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 
        5.92.42.36.81 1.096.81 2.22 0 1.604-.015 2.896-.015 3.286 
        0 .315.21.69.825.57C20.565 21.795 24 17.303 24 
        12c0-6.628-5.372-12-12-12z"
      />
    </svg>
  );
}
