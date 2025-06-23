import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useApp } from "../context/AppContext";

export default function TasksPage() {
  const [newTask, setNewTask] = useState("");
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const { language, isDark } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask("");
    }
  };

  const translations = {
    title: language === 'en' ? "Tasks" : "Görevler",
    placeholder: language === 'en' ? "Add a new task..." : "Yeni görev ekle...",
    addButton: language === 'en' ? "Add" : "Ekle",
    deleteButton: language === 'en' ? "Delete" : "Sil",
    emptyState: language === 'en' 
      ? "No tasks yet. Add one above!" 
      : "Henüz görev yok. Yukarıdan ekleyin!"
  };

  return (
    <div className={`max-w-md mx-auto p-4 ${isDark ? 'text-white' : ''}`}>
      <h1 className="text-3xl font-bold mb-8">{translations.title}</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder={translations.placeholder}
            className={`flex-1 p-2 border rounded ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white'
            }`}
          />
          <button 
            type="submit"
            className={`px-4 py-2 rounded ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition-colors`}
          >
            {translations.addButton}
          </button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <p className={`text-center py-4 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {translations.emptyState}
        </p>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li 
              key={task.id}
              className={`flex items-center p-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className={`mr-3 h-5 w-5 ${
                  isDark ? 'accent-blue-500' : ''
                }`}
              />
              <span className={`flex-1 ${
                task.completed 
                  ? `line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}` 
                  : ''
              }`}>
                {task.title}
              </span>
              <button 
                onClick={() => deleteTask(task.id)}
                className={`ml-2 ${
                  isDark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'
                } transition-colors`}
              >
                {translations.deleteButton}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}