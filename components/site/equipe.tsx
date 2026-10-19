import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getContent } from "@/lib/content";
import { localizeHref, quoteMarks, type Locale } from "@/lib/i18n";

/** Noura Njikam's quote, with "votre image" highlighted; shared with /equipe. */
export function TeamQuote({ locale }: { locale: Locale }) {
  const [open, close] = quoteMarks[locale];
  return locale === "fr" ? (
    <>
      {open}L’accueil est le premier reflet de <span className="text-accent">votre image</span>.{close}
    </>
  ) : (
    <>
      {open}Hospitality is the first reflection of <span className="text-accent">your image</span>.{close}
    </>
  );
}

const copy = {
  fr: { eyebrow: "L’équipe", values: "Nos valeurs", cta: "Découvrir l’équipe" },
  en: { eyebrow: "The team", values: "Our values", cta: "Meet the team" },
} satisfies Record<Locale, Record<string, ReactNode>>;

/** Homepage preview; the full presentation lives on /equipe. */
export function Equipe({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { team, teamValues } = getContent(locale);
  return (
    <Section id="equipe" tone="light" aria-labelledby="equipe-titre">
      <div className="site-grid items-center gap-y-12 lg:py-6">
        <Reveal variant="fade" className="col-span-full lg:col-span-7">
          <MediaSlotFrame
            slot="equipe-groupe"
            locale={locale}
            ratio="landscape"
            tone="light"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </Reveal>

        <Reveal delay={0.1} className="col-span-full lg:col-span-5 lg:pl-6 xl:pl-10">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2
            id="equipe-titre"
            className="mt-6 font-display text-[clamp(2.25rem,1.5rem+2.6vw,3.75rem)] leading-[1.08] tracking-[-0.01em] text-fg"
          >
            {team.headline.map((line, index) => (
              <span key={line} className="block">
                {index === 1 ? <em className="text-accent italic">{line}</em> : line}
              </span>
            ))}
          </h2>
          <p className="mt-6 text-lead text-fg-muted">{team.summary}</p>

          <ul
            aria-label={t.values}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-eyebrow font-medium tracking-[0.18em] text-fg uppercase"
          >
            {teamValues.map((value, index) => (
              <li key={value} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-accent" />}
                {value}
              </li>
            ))}
          </ul>

          <Link
            href={localizeHref("/equipe", locale)}
            appearance="primary"
            size="lg"
            icon={<ArrowRight />}
            className="mt-10 w-full sm:w-auto"
          >
            {t.cta}
          </Link>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-section max-w-4xl border-t border-line pt-section text-center">
        <figure>
          <blockquote>
            <p className="font-display text-h2 text-fg italic">
              <TeamQuote locale={locale} />
            </p>
          </blockquote>
          <figcaption className="mt-6 text-eyebrow font-medium tracking-[0.18em] text-fg-muted uppercase">
            {team.leader.name} <span aria-hidden="true">·</span> {team.leader.role}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
