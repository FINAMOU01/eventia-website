import { ContactActions, ContactBlock, ContactDetails, contactTitle } from "@/components/site/contact";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/lib/i18n";

const copy = {
  fr: {
    lead: "Décrivez-nous votre projet et notre équipe pourra mieux comprendre votre besoin.",
    region: "Coordonnées et demande de devis",
    details: "Coordonnées",
    direct: (
      <>
        Contactez directement l’équipe <em className="text-accent italic">EVENTIA</em>.
      </>
    ),
  },
  en: {
    lead: "Tell us about your project so our team can better understand your needs.",
    region: "Contact details and quote request",
    details: "Contact details",
    direct: (
      <>
        Contact the <em className="text-accent italic">EVENTIA</em> team directly.
      </>
    ),
  },
} satisfies Record<Locale, unknown>;

function ContactHero({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="contact-page-titre" className="tone-deep relative isolate overflow-hidden bg-ink text-fg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_85%_0%,rgb(4_58_164/0.55),transparent_70%),radial-gradient(ellipse_60%_50%_at_0%_100%,rgb(0_48_106/0.8),transparent_70%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[0.06em] bottom-[-0.2em] -z-10 font-display text-[clamp(8rem,4rem+16vw,22rem)] leading-none text-white/[0.035] italic select-none"
      >
        Contact
      </span>

      <Container className="pt-[calc(var(--header-height)+2.5rem)] pb-section lg:pt-[calc(var(--header-height)+3.5rem)]">
        <RevealGroup stagger={0.14} delay={0.1} className="site-grid items-end gap-y-8">
          <RevealItem className="col-span-full lg:col-span-8">
            <Eyebrow>Contact</Eyebrow>
            <h1
              id="contact-page-titre"
              className="mt-6 font-display text-[clamp(2.5rem,1.3rem+4.2vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-fg"
            >
              {contactTitle(locale)}
            </h1>
          </RevealItem>
          <RevealItem className="col-span-full lg:col-span-4 lg:pb-3">
            <p className="max-w-md border-l border-accent/60 pl-5 text-lead text-fg-muted">{copy[locale].lead}</p>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <ContactHero locale={locale} />
      <Section tone="light" aria-label={t.region}>
        <div className="lg:py-6">
          <ContactBlock
            locale={locale}
            aside={
              <>
                <Eyebrow>{t.details}</Eyebrow>
                <p className="mt-6 font-display text-h3 text-fg">{t.direct}</p>
                <div className="mt-8">
                  <ContactDetails locale={locale} />
                </div>
                <div className="mt-10">
                  <ContactActions locale={locale} />
                </div>
              </>
            }
          />
        </div>
      </Section>
    </>
  );
}
