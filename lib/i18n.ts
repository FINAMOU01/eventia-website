export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

/** Remembers an explicit language choice so the browser-language redirect never overrides it. */
export const LOCALE_STORAGE_KEY = "eventia-locale";

// French lives at the root (existing URLs), English under /en.
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "fr" || !href.startsWith("/")) return href;
  if (href === "/") return "/en";
  if (href.startsWith("/#")) return `/en${href.slice(1)}`;
  return `/en${href}`;
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

/** Locale-free path, e.g. "/en/equipe" -> "/equipe". */
export function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

export const quoteMarks: Record<Locale, [string, string]> = {
  fr: ["«\u00a0", "\u00a0»"],
  en: ["“", "”"],
};

// French pages: open the English version when the visitor chose English with the FR / EN switcher, or, without any
// saved choice, when the browser is in English. Crawlers are left on the French page they requested.
export const browserLanguageRedirect = `(function(){try{var s=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});if(s==="fr")return;if(s!=="en"){var l=(navigator.languages&&navigator.languages[0])||navigator.language||"";if(!/^en\\b/i.test(l)||/bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent))return;}var p=location.pathname;location.replace("/en"+(p==="/"?"":p)+location.search+location.hash);}catch(e){}})();`;
