import  PomodoroTimer  from "../components/PomodoroTimer";

export const PomodoroPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pomodoro Timer</h1>
      <PomodoroTimer />
    </div>
  );
};