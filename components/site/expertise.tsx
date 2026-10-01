import { ArrowRight } from "lucide-react";
import { ExpertiseExplorer } from "@/components/site/expertise-explorer";
import { SectionHeader } from "@/components/site/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { method } from "@/lib/content";

export function Expertise() {
  return (
    <Section id="expertise" tone="surface" aria-labelledby="expertise-titre">
      <SectionHeader
        index="02"
        kicker="Ce que nous savons faire"
        eyebrow="Expertise"
        titleId="expertise-titre"
        title={
          <>
            Des équipes adaptées à <em>chaque événement</em>.
          </>
        }
      />

      <div className="mt-14 lg:mt-20">
        <ExpertiseExplorer />
      </div>

      <div className="tone-deep mt-section-sm rounded-card bg-canvas px-6 py-12 text-fg sm:px-10 lg:px-14 lg:py-16">
        <div>
          <Eyebrow>Notre méthode</Eyebrow>
          <h3 className="mt-5 max-w-3xl text-h2">
            Comprendre, constituer, préparer, <em className="text-accent italic">accompagner</em>.
          </h3>
        </div>

        <RevealGroup as="ol" stagger={0.12} className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {method.map((step, index) => {
            const isLast = index === method.length - 1;
            return (
              <RevealItem as="li" key={step.verb} className="flex flex-col">
                <span aria-hidden="true" className="font-display text-display leading-none text-accent/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="mt-5 flex items-center gap-2 text-accent">
                  <RevealItem as="span" variant="draw" className="block h-px flex-1 origin-left bg-accent/50">
                    {null}
                  </RevealItem>
                  {!isLast && <ArrowRight className="hidden size-4 lg:block" />}
                </span>
                <h4 className="mt-6 font-display text-h3 text-fg">{step.verb}</h4>
                <p className="mt-3 text-small text-fg-muted">{step.text}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
