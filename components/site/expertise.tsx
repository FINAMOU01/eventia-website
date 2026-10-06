import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/site/section-header";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { expertises } from "@/lib/content";

/** Homepage preview; the full content lives on /expertises. */
export function Expertise() {
  return (
    <Section id="expertise" tone="surface" aria-labelledby="expertise-titre">
      <SectionHeader
        index="02"
        kicker="Ce que nous savons faire"
        eyebrow="Nos expertises"
        titleId="expertise-titre"
        title={
          <>
            Des équipes adaptées à <em>chaque événement</em>.
          </>
        }
      />

      <RevealGroup as="ol" stagger={0.07} className="mt-14 border-b border-line lg:mt-20">
        {expertises.map((item) => (
          <RevealItem as="li" key={item.id} className="group/row relative border-t border-line">
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 h-px w-12 bg-accent transition-[width] duration-700 ease-eventia group-hover/row:w-full"
            />
            <div className="site-grid items-baseline gap-y-3 py-7 lg:py-9">
              <span
                aria-hidden="true"
                className="col-span-full font-display text-[clamp(1.75rem,1.4rem+1vw,2.5rem)] leading-none text-accent/30 italic transition-colors duration-500 group-hover/row:text-accent md:col-span-1"
              >
                {item.number}
              </span>
              <h3 className="col-span-full font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-tight text-fg transition-transform duration-500 ease-eventia motion-safe:group-hover/row:translate-x-2 md:col-span-7 lg:col-span-6">
                {item.title}
              </h3>
              <p className="col-span-full text-body text-fg-muted md:col-span-7 md:col-start-2 lg:col-span-5 lg:col-start-8">
                {item.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-12 lg:mt-16">
        <Link href="/expertises" appearance="primary" size="lg" icon={<ArrowRight />}>
          Découvrir nos expertises
        </Link>
      </Reveal>
    </Section>
  );
}
