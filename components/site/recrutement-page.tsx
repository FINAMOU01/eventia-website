import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getMediaSlot, type MediaSlotId } from "@/lib/media";
import { siteConfig } from "@/lib/site";

const copy = {
  fr: {
    eyebrow: "Recrutement",
    title: (
      <>
        Rejoignez l’équipe <em className="text-accent italic">EVENTIA</em>
      </>
    ),
    apply: "Postuler",
    profiles: "Profils recherchés",
    profilesTitle: (
      <>
        Des profils. Des personnalités. <em className="text-accent italic">Une même exigence.</em>
      </>
    ),
    criteria: "Critères",
    howTo: "Comment postuler",
    sendTo: "Envoyez votre candidature à",
    documents: "Documents demandés",
    closingTitle: (
      <>
        Votre image commence par les <em className="text-accent italic">personnes qui vous représentent</em>.
      </>
    ),
    closingCta: "Postuler chez EVENTIA",
  },
  en: {
    eyebrow: "Careers",
    title: (
      <>
        Join the <em className="text-accent italic">EVENTIA</em> team
      </>
    ),
    apply: "Apply",
    profiles: "Profiles we are looking for",
    profilesTitle: (
      <>
        Profiles. Personalities. <em className="text-accent italic">One shared standard.</em>
      </>
    ),
    criteria: "Criteria",
    howTo: "How to apply",
    sendTo: "Send your application to",
    documents: "Documents required",
    closingTitle: (
      <>
        Your image starts with the <em className="text-accent italic">people who represent you</em>.
      </>
    ),
    closingCta: "Apply to EVENTIA",
  },
} satisfies Record<Locale, unknown>;

function slotImage(id: MediaSlotId, locale: Locale) {
  const media = getMediaSlot(id, locale).media;
  return media?.kind === "image" ? media : undefined;
}

function RecrutementHero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { recruitment, applicationHref } = getContent(locale);
  const image = slotImage("recrutement-equipe", locale);

  return (
    <section
      aria-labelledby="recrutement-page-titre"
      className="tone-deep relative isolate flex min-h-[min(88svh,48rem)] overflow-hidden bg-ink text-fg"
    >
      {image && (
        <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="-z-20 object-cover" />
      )}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-deep/30" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-ink/95 via-ink/55 to-ink/60 lg:bg-linear-to-r lg:from-ink/90 lg:via-ink/55 lg:to-ink/20"
      />

      <Container className="flex flex-1 flex-col justify-end pt-[calc(var(--header-height)+3rem)] pb-section lg:pb-16">
        <RevealGroup stagger={0.14} delay={0.1} className="max-w-3xl">
          <RevealItem>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h1
              id="recrutement-page-titre"
              className="mt-6 font-display text-[clamp(2.5rem,1.3rem+4.2vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-white"
            >
              {t.title}
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-xl text-lead text-white/85">{recruitment.pageIntro}</p>
          </RevealItem>
          <RevealItem className="mt-8">
            <Link href={applicationHref} appearance="primary" size="lg" icon={<ArrowRight />} className="w-full sm:w-auto">
              {t.apply}
            </Link>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}

function Profiles({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { recruitment } = getContent(locale);
  return (
    <Section tone="light" aria-labelledby="profils-titre">
      <div className="site-grid gap-y-12 lg:py-6">
        <div className="col-span-full lg:col-span-5">
          <Reveal>
            <Eyebrow>{t.profiles}</Eyebrow>
            <h2
              id="profils-titre"
              className="mt-6 font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-fg"
            >
              {t.profilesTitle}
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={0.1} className="mt-10 max-w-sm max-lg:mx-auto lg:max-w-none">
            <MediaSlotFrame
              slot="recrutement-portrait"
              locale={locale}
              ratio="portrait"
              tone="light"
              sizes="(min-width: 1024px) 38vw, 80vw"
            />
          </Reveal>
        </div>

        <RevealGroup as="ol" stagger={0.1} className="col-span-full border-t border-line lg:col-span-6 lg:col-start-7 lg:self-center">
          {recruitment.profiles.map((profile, index) => (
            <RevealItem as="li" key={profile} className="group/profile flex items-baseline gap-6 border-b border-line py-6 lg:py-8">
              <span aria-hidden="true" className="w-8 shrink-0 font-display text-h3 leading-none text-accent/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-[1.15] text-fg transition-transform duration-500 ease-eventia motion-safe:group-hover/profile:translate-x-1.5">
                {profile}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

function Criteria({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { recruitment } = getContent(locale);
  return (
    <Section tone="deep" aria-labelledby="criteres-titre">
      <Reveal>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h2 id="criteres-titre" className="mt-5 text-h2 text-fg">
          {t.criteria}
        </h2>
      </Reveal>

      <RevealGroup as="ul" stagger={0.08} className="mt-12 grid sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {recruitment.criteria.map((criterion) => (
          <RevealItem
            as="li"
            key={criterion.value}
            className="flex min-h-36 flex-col justify-end gap-3 border-t border-line py-8 sm:pr-8 lg:min-h-44"
          >
            {criterion.label && (
              <span className="text-eyebrow font-medium tracking-[0.18em] text-accent uppercase">{criterion.label}</span>
            )}
            <span className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.1] text-fg">
              {criterion.value}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function HowToApply({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { recruitment, applicationHref } = getContent(locale);
  return (
    <Section tone="surface" aria-labelledby="postuler-titre">
      <div className="site-grid gap-y-12 lg:py-6">
        <Reveal className="col-span-full lg:col-span-6">
          <Eyebrow>{t.howTo}</Eyebrow>
          <h2
            id="postuler-titre"
            className="mt-6 font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-fg"
          >
            {t.sendTo}{" "}
            <a
              href={applicationHref}
              className="mt-3 block text-[clamp(1.25rem,0.95rem+1.1vw,2rem)] text-accent italic underline decoration-1 underline-offset-[0.2em] transition-colors [overflow-wrap:anywhere] hover:text-fg"
            >
              {siteConfig.contact.recruitmentEmail}
            </a>
          </h2>
          <div className="mt-10 flex flex-col gap-4">
            <Link href={applicationHref} appearance="primary" size="lg" icon={<ArrowRight />} className="w-full sm:w-auto sm:self-start">
              {t.apply}
            </Link>
            <p className="text-small text-fg-muted">{recruitment.note}</p>
          </div>
        </Reveal>

        <div className="col-span-full lg:col-span-5 lg:col-start-8">
          <Reveal>
            <h3 className="text-eyebrow font-medium tracking-[0.18em] text-fg-muted uppercase">{t.documents}</h3>
          </Reveal>
          <RevealGroup as="ol" stagger={0.08} className="mt-6 border-t border-line">
            {recruitment.documents.map((document, index) => (
              <RevealItem as="li" key={document} className="flex items-baseline gap-5 border-b border-line py-5">
                <span aria-hidden="true" className="w-6 shrink-0 text-eyebrow text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-h3 text-fg">{document}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}

function Closing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { applicationHref } = getContent(locale);
  const image = slotImage("equipe-groupe", locale);

  return (
    <section
      aria-labelledby="recrutement-fin-titre"
      className="tone-deep relative isolate flex min-h-[min(80svh,42rem)] items-center overflow-hidden bg-ink text-fg"
    >
      {image && <Image src={image.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-ink/70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgb(10_16_32/0.6)_100%)]"
      />

      <Container className="py-section">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
          <h2
            id="recrutement-fin-titre"
            className="font-display text-[clamp(2.25rem,1.3rem+3.6vw,4.75rem)] leading-[1.08] tracking-[-0.01em] text-white"
          >
            {t.closingTitle}
          </h2>
          <Link href={applicationHref} appearance="primary" size="lg" icon={<ArrowRight />} className="w-full sm:w-auto">
            {t.closingCta}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

export function RecrutementPage({ locale }: { locale: Locale }) {
  return (
    <>
      <RecrutementHero locale={locale} />
      <Profiles locale={locale} />
      <Criteria locale={locale} />
      <HowToApply locale={locale} />
      <Closing locale={locale} />
    </>
  );
}
