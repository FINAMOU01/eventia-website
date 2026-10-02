import { ArrowRight } from "lucide-react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { applicationHref, recruitment } from "@/lib/content";

/** Homepage preview; criteria and application details live on /recrutement. */
export function Recrutement() {
  return (
    <Section id="recrutement" tone="surface" aria-labelledby="recrutement-titre">
      <div className="site-grid items-center gap-y-12 lg:py-6">
        <Reveal
          variant="fade"
          className="col-span-full sm:col-span-6 sm:col-start-2 md:col-span-5 md:col-start-2 lg:col-span-5 lg:col-start-1"
        >
          <MediaSlotFrame slot="recrutement-portrait" ratio="portrait" tone="light" sizes="(min-width: 1024px) 40vw, 80vw" />
        </Reveal>

        <div className="col-span-full lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>Recrutement</Eyebrow>
            <h2
              id="recrutement-titre"
              className="mt-6 font-display text-[clamp(2.25rem,1.5rem+2.6vw,3.75rem)] leading-[1.08] tracking-[-0.01em] text-fg"
            >
              {recruitment.title}
            </h2>
            <p className="mt-4 font-display text-h3 text-accent italic">{recruitment.tagline}</p>
            <p className="mt-6 text-lead text-fg-muted">{recruitment.intro}</p>
          </Reveal>

          <h3 className="sr-only">Profils recherchés</h3>
          <RevealGroup as="ul" stagger={0.08} className="mt-10 border-t border-line">
            {recruitment.previewProfiles.map((profile, index) => (
              <RevealItem as="li" key={profile} className="group/profile flex items-baseline gap-5 border-b border-line py-4">
                <span aria-hidden="true" className="w-6 shrink-0 text-eyebrow text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(1.25rem,1rem+0.8vw,1.625rem)] text-fg transition-transform duration-500 ease-eventia motion-safe:group-hover/profile:translate-x-1">
                  {profile}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link href={applicationHref} appearance="primary" size="lg" icon={<ArrowRight />} className="w-full sm:w-auto">
                Postuler
              </Link>
              <Link href="/recrutement" appearance="secondary" size="lg" className="w-full sm:w-auto">
                Voir les critères
              </Link>
            </div>
            <p className="text-small text-fg-muted">{recruitment.note}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
