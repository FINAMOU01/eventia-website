import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { SectionHeader } from "@/components/site/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { teamValues } from "@/lib/content";

export function Equipe() {
  return (
    <Section id="equipe" tone="light" aria-labelledby="equipe-titre">
      <SectionHeader
        index="04"
        kicker="Notre équipe"
        eyebrow="L’équipe"
        titleId="equipe-titre"
        title={
          <>
            Une vision. <em>Une équipe.</em> Une ambition.
          </>
        }
      />

      <div className="site-grid mt-14 gap-y-16 lg:mt-20">
        <Reveal className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-1">
          <figure className="relative pb-24">
            <MediaSlotFrame slot="equipe-noura" ratio="portrait" tone="light" sizes="(min-width: 1024px) 40vw, 90vw" />
            <figcaption className="absolute right-0 bottom-0 left-8 bg-canvas p-6 shadow-lift sm:left-12 lg:-right-10">
              <p className="text-eyebrow text-accent uppercase">PDG — EVENTIA BY N.J</p>
              <p className="mt-2 font-display text-h3 text-fg">Noura Njikam</p>
              <p className="mt-1 text-small text-fg-muted">Miss Cameroun 2024 · Miss World Cameroun 2026</p>
            </figcaption>
          </figure>
        </Reveal>

        <div className="col-span-full flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-lead text-fg-muted">
              Autour de Noura Njikam, une équipe préparée, briefée et engagée, présente sur le terrain pour
              représenter votre image.
            </p>
          </Reveal>

          <Reveal variant="fade">
            <MediaSlotFrame
              slot="equipe-groupe"
              ratio="wide"
              tone="light"
              sizes="(min-width: 1024px) 50vw, 100vw"
              caption="L’équipe EVENTIA"
            />
          </Reveal>
        </div>
      </div>

      <h3 className="sr-only">Nos valeurs</h3>
      <RevealGroup
        as="ul"
        stagger={0.1}
        className="mt-section-sm flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 border-y border-line py-10 text-center"
      >
        {teamValues.map((value, index) => (
          <RevealItem as="li" key={value} className="flex items-baseline gap-6">
            <span className="font-display text-h2 text-fg">{value}.</span>
            {index < teamValues.length - 1 && (
              <span aria-hidden="true" className="size-1.5 -translate-y-2 rounded-full bg-accent" />
            )}
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mx-auto mt-section-sm max-w-4xl text-center">
        <blockquote>
          <p className="font-display text-h2 text-fg italic">
            «&nbsp;L’accueil est le premier reflet de <span className="text-accent">votre image</span>.&nbsp;»
          </p>
        </blockquote>
      </Reveal>
    </Section>
  );
}
