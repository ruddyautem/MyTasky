"use client";

import { useTranslations } from "next-intl";

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const t = useTranslations("Progress");
  const isComplete = percentage === 100;

  return (
    <div
      className="w-full mt-3 sm:mt-4"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t("label", { percentage })}
    >
      <div className="w-full h-1 sm:h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete ? "bg-emerald-500" : "bg-zinc-900 dark:bg-zinc-100"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
