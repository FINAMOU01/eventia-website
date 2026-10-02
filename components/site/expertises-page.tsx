import { ArrowRight } from "lucide-react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { expertises, method, type Expertise } from "@/lib/content";
import { siteConfig } from "@/lib/site";

function ExpertisesHero() {
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
        Expertises
      </span>

      <Container className="pt-[calc(var(--header-height)+2.5rem)] pb-section lg:pt-[calc(var(--header-height)+3.5rem)]">
        <RevealGroup stagger={0.14} delay={0.1} className="site-grid items-end gap-y-8">
          <RevealItem className="col-span-full lg:col-span-8">
            <Eyebrow>Nos expertises</Eyebrow>
            <h1
              id="expertises-titre"
              className="mt-6 font-display text-[clamp(2.5rem,1.3rem+4.2vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-fg"
            >
              Des équipes adaptées <br className="hidden sm:block" />à{" "}
              <em className="text-accent italic">chaque événement</em>.
            </h1>
          </RevealItem>
          <RevealItem className="col-span-full lg:col-span-4 lg:pb-3">
            <p className="max-w-md border-l border-accent/60 pl-5 text-lead text-fg-muted">
              EVENTIA met à votre disposition des équipes formées, préparées et professionnelles, adaptées à chaque
              type d’événement et d’expérience de marque.
            </p>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}

function ExpertiseBlock({ item, index }: { item: Expertise; index: number }) {
  const reversed = index % 2 === 1;
  const titleId = `${item.id}-titre`;

  return (
    <article
      id={item.id}
      aria-labelledby={titleId}
      className="group/expertise site-grid items-center gap-y-10 border-b border-line py-section last:border-b-0"
    >
      <Reveal
        className={cn(
          "col-span-full lg:col-span-5 lg:row-start-1",
          reversed ? "lg:col-start-7 xl:col-start-8" : "lg:col-start-1",
        )}
      >
        <div className="flex items-end gap-5">
          <span
            aria-hidden="true"
            className="font-display text-[clamp(4.5rem,3rem+5vw,8.5rem)] leading-[0.8] text-accent/20 transition-[color,translate] duration-700 ease-eventia group-hover/expertise:text-accent/50 motion-safe:group-hover/expertise:-translate-y-1"
          >
            {item.number}
          </span>
          <Reveal as="span" variant="draw" delay={0.2} className="mb-2 block h-px flex-1 origin-left bg-line">
            {null}
          </Reveal>
        </div>

        <h2 id={titleId} className="mt-8">
          <span className="block font-sans text-eyebrow font-medium tracking-[0.18em] text-accent uppercase">
            {item.title}
          </span>
          <span className="sr-only"> — </span>
          <span className="mt-4 block font-display text-h2 text-fg">{item.tagline}</span>
        </h2>
        <p className="mt-6 max-w-text text-lead text-fg-muted">{item.description}</p>
      </Reveal>

      <Reveal
        variant="fade"
        delay={0.1}
        className={cn(
          "col-span-full lg:row-start-1",
          reversed ? "lg:col-span-5 lg:col-start-1 xl:col-span-4 xl:col-start-2" : "lg:col-span-6 lg:col-start-7",
        )}
      >
        <MediaSlotFrame
          slot={item.slot}
          ratio={reversed ? "portrait" : "landscape"}
          tone="light"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className={cn(reversed && "max-lg:aspect-4/3")}
        />
      </Reveal>
    </article>
  );
}

function Method() {
  return (
    <Section tone="deep" aria-labelledby="methode-titre">
      <div className="site-grid gap-y-8">
        <Reveal className="col-span-full lg:col-span-7">
          <Eyebrow>Notre méthode</Eyebrow>
          <h2 id="methode-titre" className="mt-5 text-h2 text-fg">
            Comprendre, constituer, préparer, <em className="text-accent italic">accompagner</em>.
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

function ExpertisesCta() {
  return (
    <Section tone="surface" aria-labelledby="expertises-cta-titre">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-7 py-6 text-center lg:py-10">
        <Eyebrow>Vous avez un événement à préparer&nbsp;?</Eyebrow>
        <h2 id="expertises-cta-titre" className="text-display text-fg">
          Parlons de <em className="text-accent italic">votre projet</em>.
        </h2>
        <Link href={siteConfig.primaryCta.href} appearance="primary" size="lg" icon={<ArrowRight />}>
          {siteConfig.primaryCta.label}
        </Link>
      </Reveal>
    </Section>
  );
}

export function ExpertisesPage() {
  return (
    <>
      <ExpertisesHero />
      <section aria-label="Nos cinq expertises" className="tone-light bg-canvas text-fg">
        <Container>
          {expertises.map((item, index) => (
            <ExpertiseBlock key={item.id} item={item} index={index} />
          ))}
        </Container>
      </section>
      <Method />
      <ExpertisesCta />
    </>
  );
}
