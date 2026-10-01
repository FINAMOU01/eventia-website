import { ArrowRight } from "lucide-react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { SectionHeader } from "@/components/site/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { realisations, type Realisation } from "@/lib/content";

function Reportage({ item, reversed }: { item: Realisation; reversed: boolean }) {
  const titleId = `realisation-${item.id}`;
  const [main, detailA, detailB] = item.slots;

  return (
    <article aria-labelledby={titleId} className="site-grid gap-y-8 border-t border-line pt-10 lg:gap-y-12 lg:pt-14">
      <Reveal className="col-span-full flex gap-6 lg:col-span-7 lg:gap-10">
        <span aria-hidden="true" className="font-display text-display leading-none text-accent/40">
          {item.number}
        </span>
        <div className="flex flex-col gap-3 pt-1">
          <Eyebrow>{item.category}</Eyebrow>
          <h3 id={titleId} className="text-h2 text-fg">
            {item.title}
          </h3>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="col-span-full lg:col-span-4 lg:col-start-9 lg:self-end">
        <dl className="flex flex-col gap-3 border-l border-line pl-5">
          <dt className="text-eyebrow text-fg-muted uppercase">Mission EVENTIA</dt>
          <dd>
            {item.missions.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {item.missions.map((mission) => (
                  <li key={mission} className="rounded-control border border-line px-3 py-1 text-small">
                    {mission}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-small text-fg-muted">Détails de la mission à confirmer · photos et vidéos à venir.</p>
            )}
          </dd>
        </dl>
      </Reveal>

      <Reveal variant="fade" className={cn("col-span-full lg:col-span-8", reversed && "lg:col-start-5 lg:row-start-2")}>
        <MediaSlotFrame slot={main} ratio="landscape" sizes="(min-width: 1024px) 66vw, 100vw" />
      </Reveal>

      <Reveal
        variant="fade"
        delay={0.15}
        className={cn(
          "col-span-full grid grid-cols-2 gap-3 sm:gap-6 lg:col-span-4 lg:flex lg:flex-col",
          reversed && "lg:col-start-1 lg:row-start-2",
        )}
      >
        <MediaSlotFrame slot={detailA} ratio="landscape" compact sizes="(min-width: 1024px) 33vw, 50vw" />
        <MediaSlotFrame slot={detailB} ratio="landscape" compact sizes="(min-width: 1024px) 33vw, 50vw" />
      </Reveal>
    </article>
  );
}

export function Realisations() {
  return (
    <Section id="realisations" tone="deep" aria-labelledby="realisations-titre">
      <SectionHeader
        index="03"
        kicker="Nos expériences sur le terrain"
        eyebrow="Réalisations"
        titleId="realisations-titre"
        title={
          <>
            Des événements. Des <em>visages</em>. Des expériences.
          </>
        }
      />

      <div className="mt-14 flex flex-col gap-section-sm lg:mt-20">
        {realisations.map((item, index) => (
          <Reportage key={item.id} item={item} reversed={index % 2 === 1} />
        ))}
      </div>

      <div className="mt-section-sm flex flex-col items-start gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-h3 text-fg">Parlons de votre événement.</p>
        <Link href="/contact" appearance="primary" size="lg" icon={<ArrowRight />}>
          Demander un devis
        </Link>
      </div>
    </Section>
  );
}
