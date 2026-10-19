import NextLink from "next/link";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getNavigation, getSiteText, siteConfig } from "@/lib/site";

const labels = {
  fr: { nav: "Navigation du pied de page", navTitle: "Navigation", rights: "Tous droits réservés.", legal: "Mentions légales" },
  en: { nav: "Footer navigation", navTitle: "Navigation", rights: "All rights reserved.", legal: "Legal notice" },
} satisfies Record<Locale, Record<string, string>>;

export function Footer({ locale }: { locale: Locale }) {
  const text = getSiteText(locale);
  const t = labels[locale];
  return (
    <footer className="tone-deep bg-ink pb-16 text-fg md:pb-0">
      <Container grid className="gap-y-6 py-8 md:gap-y-8 lg:py-12">
        <div className="col-span-full flex flex-col gap-4 md:col-span-8 lg:col-span-4">
          <NextLink
            href={localizeHref("/#accueil", locale)}
            aria-label={`${siteConfig.name} — ${text.backHome}`}
            className="flex items-center gap-3 self-start rounded-media"
          >
            <Logo className="h-10 lg:h-11" />
            <span aria-hidden="true" className="font-display text-[1.375rem] tracking-[0.12em] text-fg">
              {siteConfig.name}
            </span>
          </NextLink>
          <p className="max-w-xs text-small text-fg-muted">{text.title}.</p>
          <p className="text-eyebrow font-medium tracking-[0.18em] text-accent uppercase">
            {text.signature.map((word) => `${word}.`).join(" ")}
          </p>
        </div>

        <nav aria-label={t.nav} className="col-span-full md:col-span-4 lg:col-span-4 lg:col-start-6">
          <p className="text-eyebrow text-fg-muted uppercase">{t.navTitle}</p>
          <ul className="mt-3 grid grid-cols-3 gap-x-4 gap-y-2 text-small md:mt-4 md:grid-cols-2 md:gap-x-6 md:gap-y-2.5">
            {getNavigation(locale).map(({ id, label, href }) => (
              <li key={id}>
                <NextLink href={href} className="text-fg transition-colors hover:text-accent">
                  {label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-full md:col-span-4 lg:col-span-3 lg:col-start-10">
          <p className="text-eyebrow text-fg-muted uppercase">Contact</p>
          <ul className="mt-3 flex flex-col gap-2 text-small md:mt-4 md:gap-2.5">
            <li>
              <Link href={`mailto:${siteConfig.contact.email}`} className="break-all">
                {siteConfig.contact.email}
              </Link>
            </li>
            <li className="flex flex-wrap gap-x-4 gap-y-2.5">
              <Link href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneDisplay}</Link>
              <Link href={siteConfig.contact.phone2Href}>{siteConfig.contact.phone2Display}</Link>
            </li>
            <li className="text-fg">{siteConfig.contact.address}</li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-4 text-small text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {t.rights}
        </p>
        <NextLink href={localizeHref("/mentions-legales", locale)} className="transition-colors hover:text-fg">
          {t.legal}
        </NextLink>
      </Container>
    </footer>
  );
}
