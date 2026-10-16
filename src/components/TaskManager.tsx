"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTasks } from "@/hooks/useTasks";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { FilterButtons } from "./FilterButtons";
import { ProgressBar } from "./ProgressBar";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const TaskManager = () => {
  const locale = useLocale();
  const t = useTranslations("TaskManager");
  const {
    tasks,
    filter,
    isLoaded,
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
  } = useTasks();

  const isAllDone = tasks.length > 0 && progressPercentage === 100;

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const formattedDate = useMemo(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }, [locale]);

  const emptyMessage = useMemo(() => {
    if (tasks.length === 0) {
      return t("emptyAll");
    }
    if (filter === "todo") {
      return t("emptyTodo");
    }
    if (filter === "done") {
      return t("emptyDone");
    }
    return t("emptyUnknown");
  }, [tasks.length, filter, t]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center p-3 sm:p-6">
      {/* Spacer for top optical balance */}
      <div className="h-2 sm:h-6 w-full shrink-0" aria-hidden="true" />

      {/* Main Container */}
      <main className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white dark:bg-[#1a1b22] border border-zinc-200/80 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl shadow-sm dark:shadow-2xl dark:shadow-black/40 p-5 sm:p-7 md:p-8 my-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                My Tasky
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-400 font-medium mt-0.5">
                {formattedDate}
              </p>
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2 shrink-0">
              {isLoaded && tasks.length > 0 && (
                <span
                  className={`text-xs sm:text-sm font-mono font-medium px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shrink-0 transition-all ${
                    isAllDone
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60"
                      : "bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-300 dark:border dark:border-white/[0.06]"
                  }`}
                >
                  {isAllDone ? t("allDoneBadge") : `${counts.done}/${tasks.length}`}
                </span>
              )}

              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {isLoaded && tasks.length > 0 && (
            <ProgressBar percentage={progressPercentage} />
          )}
        </header>

        {/* Input Form */}
        <TaskForm onAddTask={addTask} />

        {/* Filters */}
        {isLoaded && tasks.length > 0 && (
          <FilterButtons
            currentFilter={filter}
            counts={counts}
            onSetFilter={setFilter}
          />
        )}

        {/* 100% Celebration Banner */}
        {isLoaded && isAllDone && (
          <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl sm:rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 transition-all">
            <span className="flex items-center gap-2 font-medium">
              <span>{t("allDoneBanner")}</span>
            </span>
            <button
              type="button"
              onClick={clearCompleted}
              className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 underline underline-offset-2 font-medium cursor-pointer shrink-0"
            >
              {t("clearAll")}
            </button>
          </div>
        )}

        {/* Task List or Empty Message */}
        {isLoaded && filteredTasks.length === 0 && (
          <div className="py-10 sm:py-14 text-center text-xs sm:text-sm text-zinc-400 dark:text-zinc-500">
            {emptyMessage}
          </div>
        )}

        {isLoaded && filteredTasks.length > 0 && (
          <TaskList
            tasks={filteredTasks}
            isAllDone={isAllDone}
            hasCompleted={counts.done > 0}
            onToggleAll={toggleAll}
            onToggleDone={toggleDone}
            onRemoveTask={removeTask}
            onEditTask={editTask}
            onClearCompleted={clearCompleted}
          />
        )}

        {/* Skeleton while loading */}
        {!isLoaded && (
          <div className="space-y-3 py-3">
            <div className="h-10 sm:h-12 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl animate-pulse" />
            <div className="h-10 sm:h-12 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl animate-pulse" />
          </div>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-4 text-center text-xs text-zinc-400 dark:text-zinc-600">
        <p>
          © {currentYear}{" "}
          <a
            href="https://mytasky.autem.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            mytasky.autem.dev
          </a>{" "}
          · {t("rights")}
        </p>
      </footer>
    </div>
  );
}
