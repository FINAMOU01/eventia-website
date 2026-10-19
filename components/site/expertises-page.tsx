import { ArrowRight } from "lucide-react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getContent, type Expertise } from "@/lib/content";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getSiteText, siteConfig } from "@/lib/site";

const copy = {
  fr: {
    eyebrow: "Nos expertises",
    title: (
      <>
        Des équipes adaptées <br className="hidden sm:block" />à <em className="text-accent italic">chaque événement</em>.
      </>
    ),
    lead: "EVENTIA met à votre disposition des équipes formées, préparées et professionnelles, adaptées à chaque type d’événement et d’expérience de marque.",
    groups: { coeur: "Cœur de métier", elargie: "Offre élargie" },
    list: "Nos neuf expertises",
    method: "Notre méthode",
    methodTitle: (
      <>
        Comprendre, constituer, préparer, <em className="text-accent italic">accompagner</em>.
      </>
    ),
    ctaEyebrow: "Vous avez un événement à préparer ?",
    ctaTitle: (
      <>
        Parlons de <em className="text-accent italic">votre projet</em>.
      </>
    ),
  },
  en: {
    eyebrow: "Our expertise",
    title: (
      <>
        Teams adapted <br className="hidden sm:block" />
        to <em className="text-accent italic">every event</em>.
      </>
    ),
    lead: "EVENTIA provides trained, prepared and professional teams, adapted to every type of event and brand experience.",
    groups: { coeur: "Core business", elargie: "Extended offer" },
    list: "Our nine areas of expertise",
    method: "Our method",
    methodTitle: (
      <>
        Understand, assemble, prepare, <em className="text-accent italic">support</em>.
      </>
    ),
    ctaEyebrow: "Do you have an event to prepare?",
    ctaTitle: (
      <>
        Let’s talk about <em className="text-accent italic">your project</em>.
      </>
    ),
  },
} satisfies Record<Locale, unknown>;

function ExpertisesHero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section
      aria-labelledby="expertises-titre"
      className="tone-deep relative isolate overflow-hidden bg-ink text-fg"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_85%_0%,rgb(4_58_164/0.55),transparent_70%),radial-gradient(ellipse_60%_50%_at_0%_100%,rgb(0_48_106/0.8),transparent_70%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[0.06em] bottom-[-0.2em] -z-10 font-display text-[clamp(8rem,4rem+16vw,22rem)] leading-none text-white/[0.035] italic select-none"
      >
        {locale === "fr" ? "Expertises" : "Expertise"}
      </span>

      <Container className="pt-[calc(var(--header-height)+2.5rem)] pb-section lg:pt-[calc(var(--header-height)+3.5rem)]">
        <RevealGroup stagger={0.14} delay={0.1} className="site-grid items-end gap-y-8">
          <RevealItem className="col-span-full lg:col-span-8">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1
              id="expertises-titre"
              className="mt-6 font-display text-[clamp(2.5rem,1.3rem+4.2vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-fg"
            >
              {t.title}
            </h1>
          </RevealItem>
          <RevealItem className="col-span-full lg:col-span-4 lg:pb-3">
            <p className="max-w-md border-l border-accent/60 pl-5 text-lead text-fg-muted">{t.lead}</p>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}

const expertiseGroups = [
  { id: "coeur", range: "01 — 05" },
  { id: "elargie", range: "06 — 09" },
] as const;

function ExpertiseRow({ item, locale }: { item: Expertise; locale: Locale }) {
  return (
    <li id={item.id} className="group/expertise relative border-b border-line last:border-b-0">
      <Reveal className="grid gap-6 py-10 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-10 lg:py-12 xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,40%)] xl:items-center">
        <span
          aria-hidden="true"
          className="font-display text-[clamp(3rem,2.2rem+3vw,5.5rem)] leading-[0.85] text-accent/20 transition-colors duration-700 ease-eventia group-hover/expertise:text-accent/60 sm:w-[2.2ch] xl:self-start"
        >
          {item.number}
        </span>
        <div className="min-w-0 sm:pt-2">
          <h3 className="font-display text-h2 [overflow-wrap:break-word] hyphens-auto text-fg transition-transform duration-500 ease-eventia motion-safe:group-hover/expertise:translate-x-1.5 xl:text-[clamp(1.75rem,0.9rem+1.1vw,2.5rem)]">
            {item.title}
          </h3>
          <p className="mt-4 max-w-text text-lead text-fg-muted">{item.description}</p>
        </div>
        <MediaSlotFrame
          slot={item.slot}
          locale={locale}
          ratio="landscape"
          tone="light"
          className="sm:col-start-2 xl:col-start-3"
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 70vw, 100vw"
        />
      </Reveal>
      <span
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-eventia group-hover/expertise:w-full"
      />
    </li>
  );
}

function ExpertiseGroup({ group, locale }: { group: (typeof expertiseGroups)[number]; locale: Locale }) {
  const titleId = `expertises-${group.id}-titre`;
  return (
    <section aria-labelledby={titleId} className="site-grid gap-y-4 border-t border-line py-section first:border-t-0">
      <div className="col-span-full lg:col-span-4">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-height)+2.5rem)]">
          <Eyebrow>{group.range}</Eyebrow>
          <h2 id={titleId} className="mt-5 font-display text-h3 text-fg">
            {copy[locale].groups[group.id]}
          </h2>
        </Reveal>
      </div>
      <ol className="col-span-full lg:col-span-8">
        {getContent(locale)
          .expertises.filter((item) => item.group === group.id)
          .map((item) => (
            <ExpertiseRow key={item.id} item={item} locale={locale} />
          ))}
      </ol>
    </section>
  );
}

function Method({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { method } = getContent(locale);
  return (
    <Section tone="deep" aria-labelledby="methode-titre">
      <div className="site-grid gap-y-8">
        <Reveal className="col-span-full lg:col-span-7">
          <Eyebrow>{t.method}</Eyebrow>
          <h2 id="methode-titre" className="mt-5 text-h2 text-fg">
            {t.methodTitle}
          </h2>
        </Reveal>
      </div>

      <RevealGroup as="ol" stagger={0.14} className="mt-14 grid gap-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {method.map((step, index) => {
          const isLast = index === method.length - 1;
          return (
            <RevealItem as="li" key={step.verb} className="group/step flex flex-col">
              <span
                aria-hidden="true"
                className="font-display text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] leading-none text-accent/35 transition-colors duration-500 group-hover/step:text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="mt-6 flex items-center gap-3 text-accent">
                <span className="size-2 shrink-0 rounded-full bg-accent" />
                <RevealItem as="span" variant="draw" className="block h-px flex-1 origin-left bg-accent/40">
                  {null}
                </RevealItem>
                {!isLast && <ArrowRight className="hidden size-4 lg:block" />}
              </span>
              <h3 className="mt-6 font-sans text-button tracking-[0.18em] text-fg uppercase">{step.verb}</h3>
              <p className="mt-3 max-w-xs text-body text-fg-muted">{step.text}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

function ExpertisesCta({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <Section tone="surface" aria-labelledby="expertises-cta-titre">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-7 py-6 text-center lg:py-10">
        <Eyebrow>{t.ctaEyebrow}</Eyebrow>
        <h2 id="expertises-cta-titre" className="text-display text-fg">
          {t.ctaTitle}
        </h2>
        <Link
          href={localizeHref(siteConfig.primaryCtaHref, locale)}
          appearance="primary"
          size="lg"
          icon={<ArrowRight />}
        >
          {getSiteText(locale).primaryCta}
        </Link>
      </Reveal>
    </Section>
  );
}

export function ExpertisesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <ExpertisesHero locale={locale} />
      <section aria-label={copy[locale].list} className="tone-light bg-canvas text-fg">
        <Container>
          {expertiseGroups.map((group) => (
            <ExpertiseGroup key={group.id} group={group} locale={locale} />
          ))}
        </Container>
      </section>
      <Method locale={locale} />
      <ExpertisesCta locale={locale} />
    </>
  );
}
