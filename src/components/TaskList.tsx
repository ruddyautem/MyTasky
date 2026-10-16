"use client";

import { Check, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  isAllDone: boolean;
  hasCompleted: boolean;
  onToggleAll: () => void;
  onToggleDone: (id: string) => void;
  onRemoveTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
  onClearCompleted: () => void;
}

export const TaskList = ({
  tasks,
  isAllDone,
  hasCompleted,
  onToggleAll,
  onToggleDone,
  onRemoveTask,
  onEditTask,
  onClearCompleted,
}: TaskListProps) => {
  const t = useTranslations("TaskList");
  return (
    <div className="border-t border-zinc-100 dark:border-white/[0.06] pt-1 sm:pt-2">
      {/* Master checkbox and bulk deletion on the same line */}
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 py-1.5 sm:py-2 px-1 sm:px-3.5 mb-1 select-none">
        <div
          onClick={onToggleAll}
          className="flex min-w-0 items-center gap-2 group cursor-pointer text-zinc-400 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
        >
          <div
            role="checkbox"
            aria-checked={isAllDone}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggleAll();
              }
            }}
            aria-label={isAllDone ? t("deselectAll") : t("selectAll")}
            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
              isAllDone
                ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900 shadow-xs"
                : "border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-500 dark:group-hover:border-zinc-400"
            }`}
          >
            {isAllDone && <Check className="w-3 h-3" strokeWidth={3} />}
          </div>
          <span className="text-xs font-medium">
            {isAllDone ? t("deselectAll") : t("selectAll")}
          </span>
        </div>

        {hasCompleted && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="inline-flex min-w-0 items-center gap-1.5 text-left text-xs font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer py-1"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            {t("deleteSelected")}
          </button>
        )}
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleDone={onToggleDone}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </div>
  );
};
