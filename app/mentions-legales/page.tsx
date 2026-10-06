import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

// Only information supplied by the client; legal registration details are added once provided.
export default function Page() {
  return (
    <main id="contenu" tabIndex={-1} className="pt-(--header-height)">
      <Section tone="light" aria-labelledby="mentions-titre">
        <div className="max-w-3xl py-section">
          <Eyebrow>Informations</Eyebrow>
          <h1 id="mentions-titre" className="mt-6 text-h2 text-fg">
            Mentions légales
          </h1>

          <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-body">
            <div>
              <dt className="text-eyebrow font-medium tracking-[0.14em] text-fg-muted uppercase">Éditeur du site</dt>
              <dd className="mt-1 text-fg">{siteConfig.name}</dd>
            </div>
            <div>
              <dt className="text-eyebrow font-medium tracking-[0.14em] text-fg-muted uppercase">Localisation</dt>
              <dd className="mt-1 text-fg">{siteConfig.contact.address}</dd>
            </div>
            <div>
              <dt className="text-eyebrow font-medium tracking-[0.14em] text-fg-muted uppercase">Contact</dt>
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

          <p className="mt-10 text-small text-fg-muted">
            Les informations légales complémentaires seront publiées sur cette page dès qu’elles seront disponibles.
          </p>
        </div>
      </Section>
    </main>
  );
}
