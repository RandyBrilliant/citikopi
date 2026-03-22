"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = {
  en: "EN",
  id: "ID",
  zh: "中文",
};

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <fieldset className="m-0 flex items-center gap-0.5 rounded-full border border-border-subtle bg-surface-card/70 p-1 backdrop-blur-md">
      <legend className="sr-only">{t("language")}</legend>
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            className={`rounded-full px-3 py-1.5 text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
              active
                ? "bg-accent text-surface-page shadow-soft"
                : "text-ink-muted hover:bg-accent-soft hover:text-ink"
            }`}
            hrefLang={loc}
          >
            {labels[loc] ?? loc}
          </Link>
        );
      })}
    </fieldset>
  );
}
