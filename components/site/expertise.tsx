import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/site/section-header";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
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

      {/* 2 wide blocks then 3 narrower ones on desktop: a balanced 2 + 3 rhythm. */}
      <RevealGroup
        as="ol"
        stagger={0.1}
        className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:mt-20 lg:grid-cols-6 lg:gap-x-14 lg:gap-y-16"
      >
        {expertises.map((item, index) => (
          <RevealItem
            as="li"
            key={item.id}
            className={cn(
              "relative flex flex-col border-t border-line pt-8 lg:pt-10",
              index < 2 ? "lg:col-span-3" : "lg:col-span-2",
              index === expertises.length - 1 && "sm:col-span-2 lg:col-span-2",
            )}
          >
            <span aria-hidden="true" className="absolute -top-px left-0 h-px w-12 bg-accent" />
            <span
              aria-hidden="true"
              className="font-display text-[clamp(2.5rem,2rem+1.5vw,3.5rem)] leading-none text-accent/30 italic"
            >
              {item.number}
            </span>
            <h3 className={cn("mt-6 font-display text-fg", index < 2 ? "text-h2" : "text-h3")}>{item.title}</h3>
            <p className="mt-4 max-w-md text-body text-fg-muted">{item.tagline}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14 border-t border-line pt-10 lg:mt-20">
        <Link href="/expertises" appearance="primary" size="lg" icon={<ArrowRight />}>
          Découvrir nos expertises
        </Link>
      </Reveal>
    </Section>
  );
}
