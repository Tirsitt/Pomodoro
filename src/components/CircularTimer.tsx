import { useEffect, useRef } from "react";

interface CircularTimerProps {
  timeLeft: number;
  duration: number; 
  mode: 'focus' | 'shortBreak' | 'longBreak';
  size?: number;
  strokeWidth?: number;
}

export default function CircularTimer({
  timeLeft,
  duration, 
  mode,
  size = 300,
  strokeWidth = 10
}: CircularTimerProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    if (circleRef.current) {
      const progress = timeLeft / duration;
      const offset = circumference - (progress * circumference);
      circleRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [timeLeft, duration, circumference]); 

  const color = mode === 'focus' ? 'red' : mode === 'shortBreak' ? 'green' : 'blue';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          ref={circleRef}
          className={`text-${color}-500`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-bold">
          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
