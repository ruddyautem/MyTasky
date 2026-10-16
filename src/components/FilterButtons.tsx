"use client";

import type { TaskFilter, TaskCounts } from "@/types/task";
import { useTranslations } from "next-intl";

interface FilterButtonsProps {
  currentFilter: TaskFilter;
  counts: TaskCounts;
  onSetFilter: (filter: TaskFilter) => void;
}

export const FilterButtons = ({
  currentFilter,
  counts,
  onSetFilter,
}: FilterButtonsProps) => {
  const t = useTranslations("Filters");
  const filters: TaskFilter[] = ["all", "todo", "done"];

  return (
    <div className="mb-4 sm:mb-6 pb-2.5 sm:pb-3 border-b border-zinc-100 dark:border-white/[0.06]">
      <nav className="grid w-full grid-cols-3 gap-1 sm:gap-2" aria-label={t("label")}>
        {filters.map((filter) => {
          const isActive = currentFilter === filter;
          const count = counts[filter];

          return (
            <button
              key={filter}
              type="button"
              onClick={() => onSetFilter(filter)}
              aria-pressed={isActive}
              className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-center transition-all cursor-pointer sm:min-h-10 sm:flex-row sm:gap-1.5 sm:rounded-xl sm:px-2 sm:py-1.5 ${
                isActive
                  ? "bg-zinc-100 dark:bg-[#252733] font-semibold text-zinc-900 dark:text-zinc-100 shadow-xs dark:border dark:border-white/[0.08]"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-white/[0.04]"
              }`}
            >
              <span className="flex min-h-7 min-w-0 max-w-full items-center justify-center text-[11px] leading-tight wrap-break-word sm:min-h-0 sm:text-xs md:text-sm">{t(filter)}</span>
              <span className="shrink-0 font-mono text-[10px] leading-none text-zinc-400 dark:text-zinc-500 sm:text-xs">
                {count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
