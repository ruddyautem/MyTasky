"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { recoverTasks } from "@/lib/task-storage";
import type { Task, TaskFilter, TaskCounts } from "@/types/task";

const STORAGE_KEY = "tasks";

const generateId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const [storageError, setStorageError] = useState(false);
  const canPersist = useRef(false);

  // Safe client-side hydration from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { tasks: validated, recovered } = recoverTasks(raw, generateId);
        setTasks(validated);
        if (recovered) {
          localStorage.setItem(STORAGE_KEY + ':recovery', raw);
          setStorageError(true);
        }
      }
      canPersist.current = true;
    } catch (error) {
      setStorageError(true);
      console.error('Failed to load tasks from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage only after initial client load
  useEffect(() => {
    if (!isLoaded || !canPersist.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      setStorageError(true);
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks, isLoaded]);

  const counts = useMemo<TaskCounts>(() => {
    let todo = 0;
    let done = 0;
    for (const task of tasks) {
      if (task.done) {
        done++;
      } else {
        todo++;
      }
    }
    return {
      all: tasks.length,
      todo,
      done,
    };
  }, [tasks]);

  const progressPercentage = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((counts.done / tasks.length) * 100);
  }, [tasks.length, counts.done]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "todo":
        return tasks.filter((t) => !t.done);
      case "done":
        return tasks.filter((t) => t.done);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const addTask = useCallback((title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      {
        id: generateId(),
        title: trimmed,
        done: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleDone = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const toggleAll = useCallback(() => {
    setTasks((prev) => {
      const areAllDone = prev.length > 0 && prev.every((t) => t.done);
      const targetState = !areAllDone;
      return prev.map((t) => (t.done === targetState ? t : { ...t, done: targetState }));
    });
  }, []);

  const editTask = useCallback((id: string, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.done));
  }, []);

  return {
    tasks,
    filter,
    isLoaded,
    storageError,
    counts,
    progressPercentage,
    filteredTasks,
    addTask,
    removeTask,
    toggleDone,
    toggleAll,
    editTask,
    clearCompleted,
    setFilter,
  };
};
