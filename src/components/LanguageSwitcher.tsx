"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";

const LANGUAGES = [
  { code: "fr", flag: "/fr.svg" },
  { code: "en", flag: "/en.svg" },
] as const;

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("Language");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div role="group" aria-label={t("label")} className="flex items-center gap-0.5 shrink-0">
      {LANGUAGES.map(({ code, flag }) => {
        const isActive = locale === code;
        const label = code === "fr" ? t("toFrench") : t("toEnglish");

        return (
          <button
            key={code}
            type="button"
            onClick={() => {
              if (isActive) return;
              startTransition(() => router.replace(pathname, { locale: code, scroll: false }));
            }}
            disabled={isPending}
            aria-label={label}
            aria-pressed={isActive}
            title={label}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer disabled:cursor-wait disabled:opacity-50 ${
              isActive
                ? "border-zinc-300 bg-zinc-100 dark:border-white/20 dark:bg-zinc-800"
                : "border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
            }`}
          >
            <Image src={flag} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
          </button>
        );
      })}
    </div>
  );
};
