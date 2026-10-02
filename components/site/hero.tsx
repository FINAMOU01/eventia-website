import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LazyVideo } from "@/components/ui/lazy-video";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { heroVideo } from "@/lib/media";
import { signature, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <>
      <section
        id="accueil"
        aria-labelledby="accueil-titre"
        className="tone-deep relative isolate flex h-svh min-h-[36rem] flex-col overflow-hidden bg-ink text-fg"
      >
        <LazyVideo
          sources={heroVideo.sources}
          poster={heroVideo.poster}
          alt={heroVideo.alt}
          behavior="ambient"
          sizes="100vw"
          preload
          // Aligned with the container's left edge, clear of the floating WhatsApp button on the right.
          controlClassName="bottom-6 left-[max(var(--gutter),calc((100%_-_var(--container-site))/2))]"
        />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-deep/30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/75 via-ink/25 to-ink/85"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(10_16_32/0.5)_100%)]"
        />

        <Container className="relative flex flex-1 flex-col items-center justify-center pt-(--header-height) pb-24 text-center">
          <RevealGroup stagger={0.14} delay={0.15} className="flex max-w-5xl flex-col items-center gap-6 lg:gap-8">
            <RevealItem>
              <p className="flex items-center gap-4 font-sans text-eyebrow font-medium tracking-[0.12em] text-white/85 uppercase sm:tracking-[0.18em]">
                <span aria-hidden="true" className="hidden h-px w-10 bg-accent sm:block" />
                Hôtesses · Personnel événementiel · Activation de produits &amp; de marques
                <span aria-hidden="true" className="hidden h-px w-10 bg-accent sm:block" />
              </p>
            </RevealItem>

            <RevealItem>
              <h1
                id="accueil-titre"
                className="font-display text-[clamp(2.5rem,1.2rem+4.6vw,5.75rem)] leading-[1.04] tracking-[-0.015em] text-fg"
              >
                L’excellence de{" "}
                <span className="whitespace-nowrap">
                  l’
                  <em className="relative text-accent italic">
                    accueil
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.02em]">
                      <Reveal as="span" variant="draw" delay={1.1} className="block h-px origin-left bg-accent/70">
                        {null}
                      </Reveal>
                    </span>
                  </em>
                </span>
                <br className="hidden md:block" /> au service de votre image.
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="max-w-xl text-lead text-white/85">
                Des équipes préparées, dynamiques et engagées pour accompagner entreprises, institutions et
                organisateurs.
              </p>
            </RevealItem>

            <RevealItem className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-4">
              <Link
                href={siteConfig.primaryCta.href}
                appearance="primary"
                size="lg"
                icon={<ArrowRight />}
                className="w-full sm:w-auto"
              >
                {siteConfig.primaryCta.label}
              </Link>
              <Link href="#presentation" appearance="secondary" size="lg" className="w-full sm:w-auto">
                Découvrir EVENTIA
              </Link>
            </RevealItem>

            <RevealItem className="md:hidden">
              <p className="font-sans text-[0.625rem] font-medium tracking-[0.2em] text-white/75 uppercase">
                {signature.map((word) => `${word}.`).join(" ")}
              </p>
            </RevealItem>
          </RevealGroup>
        </Container>

        <Container className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[5.75rem] items-center">
          {/* Room for the video play/pause button rendered by LazyVideo. */}
          <span aria-hidden="true" className="size-11 shrink-0" />
          <Reveal variant="fade" delay={0.9} className="ml-5 hidden md:block">
            <p className="flex gap-3 font-sans text-eyebrow font-medium tracking-[0.24em] text-white/75 uppercase">
              {signature.map((word, index) => (
                <span key={word} className="flex gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-accent">
                      ·
                    </span>
                  )}
                  {word}.
                </span>
              ))}
            </p>
          </Reveal>

          <a
            href="#presentation"
            aria-label="Faire défiler vers la présentation"
            className="pointer-events-auto absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.625rem] font-medium tracking-[0.3em] text-white/70 uppercase transition-colors hover:text-white md:flex"
          >
            <span aria-hidden="true">Défiler</span>
            <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-white/25">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white motion-safe:animate-scroll-cue" />
            </span>
          </a>
        </Container>
      </section>

      <section id="presentation" aria-label="Qui sommes-nous ?" className="tone-light bg-canvas text-fg">
        <Container grid className="gap-y-10 py-section">
          <div className="col-span-full flex items-center gap-5 text-eyebrow text-fg-muted uppercase">
            <span aria-hidden="true" className="font-display text-h3 tracking-normal text-accent normal-case">
              01
            </span>
            <Reveal as="span" variant="draw" className="block h-px flex-1 origin-left bg-line">
              {null}
            </Reveal>
            <span>Qui sommes-nous&nbsp;?</span>
          </div>

          <Reveal className="col-span-full lg:col-span-5">
            <SectionHeading
              eyebrow={siteConfig.name}
              title={
                <>
                  L’<em>humain</em> au cœur de l’expérience.
                </>
              }
            />
          </Reveal>

          <Reveal delay={0.1} className="col-span-full flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
            <p className="text-lead text-fg-muted">
              EVENTIA est une agence spécialisée dans l’accueil, la représentation, l’animation et l’accompagnement
              événementiel. Elle met à disposition des équipes préparées, dynamiques et engagées pour accompagner
              entreprises, institutions et organisateurs.
            </p>
            <div className="border-t border-line pt-8">
              <Eyebrow>Ambition</Eyebrow>
              <p className="mt-4 font-display text-h3 text-fg italic">
                «&nbsp;Faire de chaque rencontre avec votre public une expérience qui vous ressemble.&nbsp;»
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
