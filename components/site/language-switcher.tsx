"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { LOCALE_STORAGE_KEY, locales, localizeHref, stripLocale, type Locale } from "@/lib/i18n";

const names: Record<Locale, string> = { fr: "Français", en: "English" };
const groupLabel: Record<Locale, string> = { fr: "Langue", en: "Language" };

function rememberChoice(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable (private mode); the link still switches language.
  }
}

/** FR / EN toggle pointing to the same page in the other language. */
export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={groupLabel[locale]} className={cn("flex items-center gap-1 text-button uppercase", className)}>
      {locales.map((target, index) => (
        <Fragment key={target}>
          {index > 0 && (
            <span aria-hidden="true" className="text-fg-muted/50">
              /
            </span>
          )}
          {/* Plain link: each language has its own root layout, so a full page load is expected. */}
          <a
            href={localizeHref(basePath, target)}
            hrefLang={target}
            lang={target}
            aria-current={target === locale ? "true" : undefined}
            onClick={() => rememberChoice(target)}
            className={cn(
              "px-1 py-2 transition-colors",
              target === locale ? "text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            <span aria-hidden="true">{target}</span>
            <span className="sr-only">{names[target]}</span>
          </a>
        </Fragment>
      ))}
    </nav>
  );
}
