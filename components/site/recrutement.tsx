import { ArrowRight } from "lucide-react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { SectionHeader } from "@/components/site/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { recruitment } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const applicationHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
  "Candidature — Équipe EVENTIA",
)}&body=${encodeURIComponent(
  `Bonjour,\n\nJe souhaite rejoindre l’équipe EVENTIA. Vous trouverez ci-joint :\n${recruitment.documents
    .map((document) => `- ${document}`)
    .join("\n")}\n\nCordialement,\n`,
)}`;

export function Recrutement() {
  return (
    <Section id="recrutement" tone="surface" aria-labelledby="recrutement-titre">
      <SectionHeader
        index="05"
        kicker="Rejoignez-nous"
        eyebrow="Recrutement"
        titleId="recrutement-titre"
        title={
          <>
            Rejoignez l’équipe <em>EVENTIA</em>
          </>
        }
      />

      <div className="site-grid mt-14 gap-y-14 lg:mt-20">
        <Reveal variant="fade" className="col-span-full md:col-span-4 lg:col-span-5">
          <div className="md:sticky md:top-[calc(var(--header-height)+2rem)]">
            <MediaSlotFrame
              slot="recrutement-portrait"
              ratio="portrait"
              tone="light"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="max-md:aspect-4/3"
            />
          </div>
        </Reveal>

        <div className="col-span-full flex flex-col gap-14 md:col-span-4 lg:col-span-6 lg:col-start-7">
          <div>
            <Eyebrow>Profils recherchés</Eyebrow>
            <RevealGroup as="ul" stagger={0.08} className="mt-6">
              {recruitment.profiles.map((profile, index) => (
                <RevealItem
                  as="li"
                  key={profile}
                  className="flex items-baseline gap-5 border-b border-line py-4 first:border-t"
                >
                  <span aria-hidden="true" className="w-6 text-eyebrow text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lead text-fg">{profile}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal>
            <Eyebrow>Critères</Eyebrow>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {recruitment.criteria.map((criterion) => (
                <div key={criterion.label} className="flex flex-col gap-2 bg-canvas p-6">
                  <dt className="text-eyebrow text-fg-muted uppercase">{criterion.label}</dt>
                  <dd className="font-display text-h3 text-fg">{criterion.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <Eyebrow>Dossier de candidature</Eyebrow>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {recruitment.documents.map((document, index) => (
                <li key={document} className="flex items-center gap-4 rounded-card border border-line bg-white px-5 py-4">
                  <span aria-hidden="true" className="font-display text-h3 leading-none text-accent">
                    {index + 1}
                  </span>
                  <span className="text-small text-fg">{document}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="border-t border-line pt-10">
            <Link href={applicationHref} appearance="primary" size="lg" icon={<ArrowRight />}>
              Postuler
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
