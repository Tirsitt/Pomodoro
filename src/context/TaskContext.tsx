import React, { createContext, useContext, useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: number;
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompletedTasks: () => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const TASK_STORAGE_KEY = "pomodoro_tasks";

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem(TASK_STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    setTasks(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: Date.now()
      }
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        addTask, 
        toggleTask, 
        deleteTask,
        clearCompletedTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
};