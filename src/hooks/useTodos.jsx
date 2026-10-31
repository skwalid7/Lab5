import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { LuArchive, LuCheck, LuCheckCheck, LuPencil, LuTrash2 } from "react-icons/lu";
import { loadTasks, saveTasks } from "../utils/storage";

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function useTodos() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const tasksRef = useRef(tasks);

  useEffect(() => {
    tasksRef.current = tasks;
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((title) => {
    const trimmed = typeof title === "string" ? title.trim() : "";

    if (!trimmed) {
      toast.error("Please enter a task description.");
      return false;
    }

    const task = {
      id: createId(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((previous) => [task, ...previous]);
    toast.success("Task added successfully.", { icon: <LuCheck /> });
    return true;
  }, []);

  const toggleTask = useCallback((id) => {
    const target = tasksRef.current.find((task) => task.id === id);
    if (!target) return;

    const nextCompleted = !target.completed;
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, completed: nextCompleted } : task)),
    );

    if (nextCompleted) {
      toast.success("Task completed.", { icon: <LuCheckCheck /> });
    } else {
      toast.info("Task marked as active.", { icon: <LuCheck /> });
    }
  }, []);

  const updateTask = useCallback((id, title) => {
    const trimmed = typeof title === "string" ? title.trim() : "";

    if (!trimmed) {
      toast.error("Task description cannot be empty.");
      return false;
    }

    const exists = tasksRef.current.some((task) => task.id === id);
    if (!exists) return false;

    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, title: trimmed } : task)),
    );
    toast.success("Task updated successfully.", { icon: <LuPencil /> });
    return true;
  }, []);

  const deleteTask = useCallback((id) => {
    const exists = tasksRef.current.some((task) => task.id === id);
    if (!exists) return;

    setTasks((previous) => previous.filter((task) => task.id !== id));
    toast.info("Task deleted.", { icon: <LuTrash2 /> });
  }, []);

  const clearCompleted = useCallback(() => {
    const completedCount = tasksRef.current.filter((task) => task.completed).length;

    if (completedCount === 0) {
      toast.warn("There are no completed tasks to clear.");
      return false;
    }

    setTasks((previous) => previous.filter((task) => !task.completed));
    toast.success(`${completedCount} completed ${completedCount === 1 ? "task" : "tasks"} cleared.`, {
      icon: <LuArchive />,
    });
    return true;
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.reduce((total, task) => (task.completed ? total + 1 : total), 0);
    return {
      total: tasks.length,
      completed,
      remaining: tasks.length - completed,
    };
  }, [tasks]);

  return {
    tasks,
    stats,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCompleted,
  };
}
