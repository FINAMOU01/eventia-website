"use client";

import { Link } from "@/components/ui/link";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/cn";
import { siteConfig, whatsappHref } from "@/lib/site";
import { useScrolledPast } from "@/lib/use-scrolled-past";

/** Floating WhatsApp button (tablet/desktop) and sticky action bar (mobile). */
export function QuickActions() {
  const showMobileBar = useScrolledPast(560);

  return (
    <>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Écrire sur WhatsApp (nouvel onglet)"
        className="fixed right-6 bottom-6 z-30 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition-[translate] [--pulse-color:var(--color-whatsapp)] animate-cta-pulse hover:animate-none focus-visible:animate-none motion-safe:hover:-translate-y-0.5 md:inline-flex lg:size-16"
      >
        <WhatsAppIcon className="size-7 lg:size-8" />
      </a>

      <div
        inert={!showMobileBar}
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-line bg-white/90 px-gutter pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-[translate,opacity] duration-300 md:hidden",
          showMobileBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
      >
        <Link href={siteConfig.primaryCta.href} appearance="primary" className="flex-1">
          {siteConfig.primaryCta.label}
        </Link>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Écrire sur WhatsApp (nouvel onglet)"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-control bg-whatsapp text-white [--pulse-color:var(--color-whatsapp)] animate-cta-pulse"
        >
          <WhatsAppIcon className="size-6" />
        </a>
      </div>
    </>
  );
}
