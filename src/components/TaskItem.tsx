"use client";

import { useState, useRef, useEffect, type FormEvent, type MouseEvent, type KeyboardEvent } from "react";
import { Check, X, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggleDone: (id: string) => void;
  onRemoveTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
}

export const TaskItem = ({
  task,
  onToggleDone,
  onRemoveTask,
  onEditTask,
}: TaskItemProps) => {
  const t = useTranslations("TaskItem");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setEditTitle(task.title);
    setIsEditing(true);
  };

  const handleSave = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const trimmed = editTitle.trim();
    if (trimmed) {
      onEditTask(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleRowClick = () => {
    if (!isEditing) {
      onToggleDone(task.id);
    }
  };

  return (
    <div
      onClick={handleRowClick}
      className={`group flex items-center justify-between gap-3 py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-xl transition-all cursor-pointer select-none ${
        task.done
          ? "hover:bg-zinc-50/60 dark:hover:bg-white/[0.03] opacity-75"
          : "hover:bg-zinc-100/70 dark:hover:bg-white/[0.05]"
      }`}
    >
      {!isEditing ? (
        <>
          <div className="flex-1 flex items-center gap-3 min-w-0">
            {/* Checkbox indicator */}
            <button type="button" role="checkbox" aria-checked={task.done} aria-label={task.title}
              onClick={(e) => { e.stopPropagation(); onToggleDone(task.id); }}
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                task.done
                  ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900 shadow-xs"
                  : "border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-500 dark:group-hover:border-zinc-400"
              }`}
            >
              {task.done && <Check className="w-3 h-3" strokeWidth={3} />}
            </button>

            {/* Task Title */}
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleStartEditing();
              }}
              className={`text-sm sm:text-base wrap-break-word leading-relaxed transition-colors ${
                task.done
                  ? "line-through text-zinc-400 dark:text-zinc-500"
                  : "text-zinc-800 dark:text-zinc-200"
              }`}
            >
              {task.title}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            <button
              type="button"
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-white/[0.08] transition cursor-pointer"
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                handleStartEditing();
              }}
              aria-label={t("edit")}
              title={t("edit")}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                onRemoveTask(task.id);
              }}
              aria-label={t("delete")}
              title={t("delete")}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSave}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          className="flex items-center gap-2 w-full cursor-default"
        >
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-0 px-3 py-1.5 text-sm sm:text-base border border-zinc-300 dark:border-white/[0.1] rounded-lg bg-white dark:bg-[#13141a] text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500"
            aria-label={t("editTitle")}
          />
          <button
            type="submit"
            className="p-1.5 text-emerald-600 hover:text-emerald-700 cursor-pointer"
            aria-label={t("save")}
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            onClick={handleCancel}
            aria-label={t("cancel")}
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
