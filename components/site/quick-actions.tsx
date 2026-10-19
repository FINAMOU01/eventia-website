"use client";

import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import type { Locale } from "@/lib/i18n";
import { getSiteText, whatsappHref } from "@/lib/site";

const label: Record<Locale, string> = {
  fr: "Écrire sur WhatsApp (nouvel onglet)",
  en: "Message us on WhatsApp (new tab)",
};

/** Floating WhatsApp button, on every screen size. */
export function QuickActions({ locale }: { locale: Locale }) {
  return (
    <a
      href={whatsappHref(getSiteText(locale).whatsappDefault)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label[locale]}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition-[translate] [--pulse-color:var(--color-whatsapp)] animate-cta-pulse hover:animate-none focus-visible:animate-none motion-safe:hover:-translate-y-0.5 md:right-6 md:bottom-6 lg:size-16"
    >
      <WhatsAppIcon className="size-7 lg:size-8" />
    </a>
  );
}
