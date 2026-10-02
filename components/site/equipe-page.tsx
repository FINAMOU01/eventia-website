import { ArrowRight } from "lucide-react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { team, teamValues } from "@/lib/content";
import { siteConfig } from "@/lib/site";

function EquipeHero() {
  return (
    <section aria-labelledby="equipe-page-titre" className="tone-deep relative isolate overflow-hidden bg-ink text-fg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_85%_0%,rgb(4_58_164/0.55),transparent_70%),radial-gradient(ellipse_60%_50%_at_0%_100%,rgb(0_48_106/0.8),transparent_70%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[0.06em] bottom-[-0.2em] -z-10 font-display text-[clamp(8rem,4rem+16vw,22rem)] leading-none text-white/[0.035] italic select-none"
      >
        L’équipe
      </span>

      <Container className="pt-[calc(var(--header-height)+2.5rem)] pb-section lg:pt-[calc(var(--header-height)+3.5rem)]">
        <RevealGroup stagger={0.14} delay={0.1} className="site-grid items-end gap-y-8">
          <RevealItem className="col-span-full lg:col-span-8">
            <Eyebrow>L’équipe</Eyebrow>
            <h1
              id="equipe-page-titre"
              className="mt-6 font-display text-[clamp(2.5rem,1.3rem+4.2vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-fg"
            >
              {team.headline.map((line, index) => (
                <span key={line} className="block">
                  {index === 1 ? <em className="text-accent italic">{line}</em> : line}
                </span>
              ))}
            </h1>
          </RevealItem>
          <RevealItem className="col-span-full lg:col-span-4 lg:pb-3">
            <p className="max-w-md border-l border-accent/60 pl-5 text-lead text-fg-muted">{team.summary}</p>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}

function TeamBand() {
  return (
    <div className="tone-deep bg-ink">
      <Container className="pb-section">
        <Reveal variant="fade">
          <MediaSlotFrame
            slot="equipe-groupe"
            ratio="landscape"
            tone="deep"
            sizes="(min-width: 1280px) 1248px, 100vw"
            className="md:aspect-[5/3]"
          />
        </Reveal>
      </Container>
    </div>
  );
}

function Vision() {
  return (
    <Section tone="light" aria-labelledby="vision-titre">
      <div className="site-grid items-center gap-y-12 lg:py-8">
        <Reveal
          variant="fade"
          className="col-span-full sm:col-span-6 sm:col-start-2 md:col-span-5 md:col-start-2 lg:col-span-5 lg:col-start-1"
        >
          <figure>
            <MediaSlotFrame slot="equipe-noura" ratio="portrait" tone="light" sizes="(min-width: 1024px) 40vw, 80vw" />
            <figcaption className="mt-5 flex flex-col gap-1">
              <span className="font-display text-h3 text-fg">{team.leader.name}</span>
              <span className="text-eyebrow font-medium tracking-[0.18em] text-accent uppercase">{team.leader.role}</span>
              <span className="mt-1 text-small text-fg-muted">{team.leader.titles}</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="col-span-full lg:col-span-6 lg:col-start-7">
          <Eyebrow>La vision</Eyebrow>
          <h2
            id="vision-titre"
            className="mt-6 font-display text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.1] tracking-[-0.01em] text-fg"
          >
            Une vision portée par Madame <em className="text-accent italic">{team.leader.name}</em>
          </h2>
          <p className="mt-8 text-lead text-fg-muted">{team.agency}</p>

          <div className="mt-10 border-t border-line pt-8">
            <Eyebrow>Ambition</Eyebrow>
            <p className="mt-4 font-display text-h3 text-fg italic">«&nbsp;{team.ambition}&nbsp;»</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Quote() {
  return (
    <Section tone="deep" aria-label="Citation de Noura Njikam">
      <Reveal className="mx-auto max-w-5xl py-6 text-center lg:py-12">
        <figure>
          <blockquote>
            <p className="font-display text-[clamp(2rem,1.2rem+3.2vw,4.25rem)] leading-[1.12] text-fg italic">
              «&nbsp;L’accueil est le premier reflet de <span className="text-accent">votre image</span>.&nbsp;»
            </p>
          </blockquote>
          <figcaption className="mt-8 text-eyebrow font-medium tracking-[0.18em] text-fg-muted uppercase">
            {team.leader.name} <span aria-hidden="true">·</span> {team.leader.role}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

function OurTeam() {
  return (
    <Section tone="surface" aria-labelledby="notre-equipe-titre">
      <div className="site-grid gap-y-10 lg:py-6">
        <Reveal className="col-span-full lg:col-span-5">
          <Eyebrow>Notre équipe</Eyebrow>
          <h2
            id="notre-equipe-titre"
            className="mt-6 font-display text-[clamp(2.25rem,1.5rem+2.6vw,3.75rem)] leading-[1.08] tracking-[-0.01em] text-fg"
          >
            Préparée. Briefée. <em className="text-accent italic">Engagée.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="col-span-full flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:pt-14">
          <p className="text-lead text-fg-muted">{team.crew}</p>
          <p className="text-body text-fg-muted">
            Pour chaque mission, EVENTIA constitue une équipe adaptée, briefée et préparée selon les exigences de votre
            événement.
          </p>
        </Reveal>
      </div>

      <h3 className="sr-only">Nos valeurs</h3>
      <RevealGroup
        as="ol"
        stagger={0.1}
        className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-20 xl:grid-cols-4"
      >
        {teamValues.map((value, index) => (
          <RevealItem
            as="li"
            key={value}
            className="flex min-w-0 items-baseline gap-4 border-b border-line py-8 sm:odd:pr-6 sm:even:border-l sm:even:pl-6 xl:flex-col xl:gap-6 xl:border-b-0 xl:border-l xl:py-10 xl:pl-6 xl:first:border-l-0 xl:first:pl-0"
          >
            <span aria-hidden="true" className="font-display text-h3 leading-none text-accent/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-[clamp(1.625rem,1.1rem+1.5vw,2.5rem)] leading-none text-fg xl:text-[clamp(1.5rem,0.4rem+1.5vw,2.125rem)]">
              {value}.
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function OnSite() {
  return (
    <Section tone="light" aria-labelledby="terrain-titre">
      <div className="site-grid items-end gap-y-10">
        <Reveal className="col-span-full lg:col-span-5 lg:pb-10">
          <Eyebrow>Sur le terrain</Eyebrow>
          <h2 id="terrain-titre" className="mt-6 text-h2 text-fg">
            Présente sur le terrain pour <em className="text-accent italic">représenter votre image</em>.
          </h2>
        </Reveal>
        <Reveal
          variant="fade"
          delay={0.1}
          className="col-span-full sm:col-span-6 sm:col-start-2 md:col-span-5 md:col-start-3 lg:col-span-5 lg:col-start-7"
        >
          <MediaSlotFrame slot="equipe-terrain" ratio="portrait" tone="light" sizes="(min-width: 1024px) 40vw, 80vw" />
        </Reveal>
      </div>
    </Section>
  );
}

function EquipeCta() {
  return (
    <Section tone="surface" aria-labelledby="equipe-cta-titre">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-7 py-6 text-center lg:py-10">
        <Eyebrow>Vous préparez votre prochain événement&nbsp;?</Eyebrow>
        <h2 id="equipe-cta-titre" className="text-display text-fg">
          Parlons de <em className="text-accent italic">votre projet</em>.
        </h2>
        <Link href={siteConfig.primaryCta.href} appearance="primary" size="lg" icon={<ArrowRight />}>
          {siteConfig.primaryCta.label}
        </Link>
      </Reveal>
    </Section>
  );
}

export function EquipePage() {
  return (
    <>
      <EquipeHero />
      <TeamBand />
      <Vision />
      <Quote />
      <OurTeam />
      <OnSite />
      <EquipeCta />
    </>
  );
}
