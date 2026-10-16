"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const t = useTranslations("TaskForm");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) {
      onAddTask(trimmed);
      setTitle("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6" noValidate>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <label htmlFor="new-task-input" className="sr-only">
          {t("newTask")}
        </label>
        <input
          id="new-task-input"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder={t("placeholder")}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? "task-form-error" : undefined}
          className="flex-1 min-w-0 bg-zinc-50/70 dark:bg-[#13141a] border border-zinc-200 dark:border-white/[0.08] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-zinc-400 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-[#161720] transition-colors"
          autoComplete="off"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 min-h-10.5 px-3.5 sm:px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white active:scale-95 text-white dark:text-zinc-900 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t("add")}</span>
        </button>
      </div>
      {error && (
        <small
          id="task-form-error"
          className="block text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 pl-1"
          role="alert"
        >
          {t("required")}
        </small>
      )}
    </form>
  );
}
