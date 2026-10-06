import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { cn } from "@/lib/cn";
import { eventiaSpot, realisations, realisationsIntro, type Realisation } from "@/lib/content";
import type { MediaSlotId } from "@/lib/media";
import { siteConfig } from "@/lib/site";

function RealisationsHero() {
  return (
    <section aria-labelledby="realisations-page-titre" className="tone-deep relative isolate overflow-hidden bg-ink text-fg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_85%_0%,rgb(4_58_164/0.55),transparent_70%),radial-gradient(ellipse_60%_50%_at_0%_100%,rgb(0_48_106/0.8),transparent_70%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[0.06em] bottom-[-0.2em] -z-10 font-display text-[clamp(8rem,4rem+16vw,22rem)] leading-none text-white/[0.035] italic select-none"
      >
        Réalisations
      </span>

      <Container className="pt-[calc(var(--header-height)+2.5rem)] pb-section lg:pt-[calc(var(--header-height)+3.5rem)]">
        <RevealGroup stagger={0.14} delay={0.1} className="site-grid items-end gap-y-8">
          <RevealItem className="col-span-full lg:col-span-8">
            <Eyebrow>Nos réalisations</Eyebrow>
            <h1
              id="realisations-page-titre"
              className="mt-6 font-display text-[clamp(2.5rem,1.3rem+4.2vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-fg"
            >
              <span className="block">Des événements.</span>
              <span className="block">
                Des <em className="text-accent italic">visages</em>.
              </span>
              <span className="block">Des expériences.</span>
            </h1>
          </RevealItem>
          <RevealItem className="col-span-full lg:col-span-4 lg:pb-3">
            <p className="max-w-md border-l border-accent/60 pl-5 text-lead text-fg-muted">{realisationsIntro.intro}</p>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}

function Context() {
  return (
    <Section tone="surface" aria-label="Contexte : partenariat COMICA">
      <div className="site-grid items-center gap-y-12">
        <Reveal className="col-span-full lg:col-span-7">
          <Eyebrow>{realisationsIntro.category}</Eyebrow>
          <p className="mt-8 font-display text-[clamp(1.625rem,1.2rem+1.6vw,2.625rem)] leading-[1.3] text-fg">
            {realisationsIntro.context}
          </p>
        </Reveal>
        <Reveal
          variant="fade"
          delay={0.1}
          className="col-span-full sm:col-span-6 sm:col-start-2 md:col-span-4 md:col-start-3 lg:col-span-4 lg:col-start-9"
        >
          <MediaSlotFrame slot="realisation-comica" ratio="portrait" tone="light" sizes="(min-width: 1024px) 30vw, 70vw" />
        </Reveal>
      </div>
    </Section>
  );
}

function Project({ item, index }: { item: Realisation; index: number }) {
  const reversed = index % 2 === 1;
  const titleId = `${item.id}-titre`;
  const [lead, side, ...rest] = item.slots;
  const others = rest.filter((slot): slot is MediaSlotId => Boolean(slot));

  return (
    <article id={item.id} aria-labelledby={titleId} className="border-b border-line py-section last:border-b-0">
      <div className="site-grid items-end gap-y-6">
        <Reveal className={cn("col-span-full flex items-end gap-6 lg:col-span-9", reversed && "lg:col-start-4 lg:justify-end lg:text-right")}>
          <span
            aria-hidden="true"
            className={cn(
              "font-display text-[clamp(4.5rem,3rem+6vw,10rem)] leading-[0.78] text-accent/15",
              reversed && "lg:order-last",
            )}
          >
            {item.number}
          </span>
          <h2 id={titleId}>
            <span className="block font-sans text-eyebrow font-medium tracking-[0.18em] text-accent uppercase">
              {item.type}
            </span>
            <span className="sr-only"> : </span>
            <span className="mt-3 block font-display text-[clamp(2rem,1.3rem+2.6vw,3.75rem)] leading-[1.08] text-fg">
              {item.title}
            </span>
          </h2>
        </Reveal>
      </div>

      {/* Row 1: lead + side at equal height; then the remaining photos two by two. */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-6">
        <Reveal
          variant="fade"
          className={cn("sm:col-span-2 lg:col-span-8 lg:row-start-1", reversed ? "lg:col-start-5" : "lg:col-start-1")}
        >
          <MediaSlotFrame slot={lead} ratio="landscape" tone="light" sizes="(min-width: 1024px) 66vw, 100vw" />
        </Reveal>

        <Reveal
          variant="fade"
          delay={0.1}
          className={cn(
            "lg:col-span-4 lg:row-start-1",
            reversed ? "lg:col-start-1" : "lg:col-start-9",
            others.length % 2 === 0 && "sm:col-span-2",
          )}
        >
          <MediaSlotFrame
            slot={side}
            ratio="fill"
            tone="light"
            compact
            className="aspect-4/3 lg:aspect-auto"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </Reveal>

        {others.map((slot, i) => (
          <Reveal
            key={slot}
            variant="fade"
            delay={0.1 * (i % 2)}
            className={cn("lg:col-span-6", others.length % 2 === 1 && i === others.length - 1 && "lg:col-span-12")}
          >
            <MediaSlotFrame slot={slot} ratio="landscape" tone="light" sizes="(min-width: 640px) 50vw, 100vw" />
          </Reveal>
        ))}
      </div>
    </article>
  );
}

function SpotSection() {
  return (
    <Section tone="deep" aria-labelledby="eventia-video-titre">
      <div className="site-grid items-end gap-y-6">
        <Reveal className="col-span-full lg:col-span-8">
          <Eyebrow>Nos réalisations</Eyebrow>
          <h2 id="eventia-video-titre" className="mt-5 text-h2 text-fg">
            EVENTIA <em className="text-accent italic">en vidéo</em>
          </h2>
        </Reveal>
      </div>

      <Reveal variant="fade" delay={0.1} className="mt-10 lg:mt-14">
        <VideoLightbox video={eventiaSpot} className="aspect-4/3 rounded-media sm:aspect-video">
          <Image
            src="/media/hero/spot-poster.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1248px, 100vw"
            className="object-cover transition-transform duration-700 ease-eventia group-hover/video:scale-103"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-ink/20" />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
            <span className="font-display text-h3 text-white">{eventiaSpot.title}</span>
            <span className="text-eyebrow font-medium tracking-[0.18em] text-white/80 uppercase">1 min 26</span>
          </span>
        </VideoLightbox>
      </Reveal>
    </Section>
  );
}

function RealisationsCta() {
  return (
    <Section tone="surface" aria-labelledby="realisations-cta-titre">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-7 py-6 text-center lg:py-10">
        <Eyebrow>Vous préparez votre prochain événement&nbsp;?</Eyebrow>
        <h2 id="realisations-cta-titre" className="text-display text-fg">
          Parlons de <em className="text-accent italic">votre projet</em>.
        </h2>
        <Link href={siteConfig.primaryCta.href} appearance="primary" size="lg" icon={<ArrowRight />}>
          {siteConfig.primaryCta.label}
        </Link>
      </Reveal>
    </Section>
  );
}

export function RealisationsPage() {
  return (
    <>
      <RealisationsHero />
      <Context />
      <section aria-label="Nos réalisations" className="tone-light bg-canvas text-fg">
        <Container>
          {realisations.map((item, index) => (
            <Project key={item.id} item={item} index={index} />
          ))}
        </Container>
      </section>
      <SpotSection />
      <RealisationsCta />
    </>
  );
}
