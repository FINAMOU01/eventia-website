import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const copy = {
  fr: {
    eyebrow: "Informations",
    title: "Mentions légales",
    publisher: "Éditeur du site",
    location: "Localisation",
    contact: "Contact",
    pending: "Les informations légales complémentaires seront publiées sur cette page dès qu’elles seront disponibles.",
  },
  en: {
    eyebrow: "Information",
    title: "Legal notice",
    publisher: "Site publisher",
    location: "Location",
    contact: "Contact",
    pending: "Additional legal information will be published on this page as soon as it becomes available.",
  },
} satisfies Record<Locale, Record<string, string>>;

// Only information supplied by the client; legal registration details are added once provided.
export function LegalPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <Section tone="light" aria-labelledby="mentions-titre">
      <div className="max-w-3xl py-section">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 id="mentions-titre" className="mt-6 text-h2 text-fg">
          {t.title}
        </h1>

        <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-body">
          <div>
            <dt className="text-eyebrow font-medium tracking-[0.14em] text-fg-muted uppercase">{t.publisher}</dt>
            <dd className="mt-1 text-fg">{siteConfig.name}</dd>
          </div>
          <div>
            <dt className="text-eyebrow font-medium tracking-[0.14em] text-fg-muted uppercase">{t.location}</dt>
            <dd className="mt-1 text-fg">{siteConfig.contact.address}</dd>
          </div>
          <div>
            <dt className="text-eyebrow font-medium tracking-[0.14em] text-fg-muted uppercase">{t.contact}</dt>
            <dd className="mt-1 flex flex-col text-fg">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent">
                {siteConfig.contact.email}
              </a>
              <a href={siteConfig.contact.phoneHref} className="hover:text-accent">
                {siteConfig.contact.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>

        <p className="mt-10 text-small text-fg-muted">{t.pending}</p>
      </div>
    </Section>
  );
}
