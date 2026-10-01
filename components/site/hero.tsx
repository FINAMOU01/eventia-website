import { ArrowDown, ArrowRight } from "lucide-react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { signature, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section id="accueil" aria-labelledby="accueil-titre" className="tone-light relative isolate bg-canvas text-fg">
      <div className="relative pt-[calc(var(--header-height)+var(--spacing-section-sm))] pb-section-sm lg:flex lg:items-center">
        <Container grid className="items-center gap-y-12">
          <RevealGroup stagger={0.12} className="col-span-full flex flex-col gap-7 lg:col-span-6 lg:pr-4">
            <RevealItem>
              <Eyebrow withRule={false}>
                Hôtesses · Personnel événementiel · Activation de produits &amp; de marques
              </Eyebrow>
            </RevealItem>

            <RevealItem>
              <h1 id="accueil-titre" className="text-display text-fg">
                L’excellence de{" "}
                <span className="whitespace-nowrap">
                  l’
                  <em className="relative text-accent italic">
                    accueil
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.02em]">
                      <Reveal as="span" variant="draw" delay={0.9} className="block h-px origin-left bg-accent/60">
                        {null}
                      </Reveal>
                    </span>
                  </em>
                </span>{" "}
                au service de votre image.
              </h1>
            </RevealItem>

            <RevealItem className="flex flex-col gap-5">
              <p className="text-lead text-fg">
                Hôtesses / Personnel événementiel / Activation de produits &amp; de marques
              </p>
              <p className="max-w-text border-l border-accent pl-4 text-small text-fg-muted">
                Une vision portée par Madame <span className="font-medium text-fg">Noura Njikam</span>, Miss
                Cameroun 2024, Miss World Cameroun 2026.
              </p>
            </RevealItem>

            <RevealItem className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href={siteConfig.primaryCta.href}
                appearance="primary"
                size="lg"
                icon={<ArrowRight />}
                className="w-full sm:w-auto"
              >
                {siteConfig.primaryCta.label}
              </Link>
              <Link
                href="#realisations"
                appearance="text"
                icon={<ArrowRight />}
                className="justify-center sm:justify-start"
              >
                Découvrir nos réalisations
              </Link>
            </RevealItem>

            <RevealItem className="hidden lg:block">
              <a
                href="#presentation"
                className="group/cue inline-flex items-center gap-3 pt-4 text-eyebrow text-fg-muted uppercase transition-colors hover:text-fg"
              >
                <span className="grid size-9 place-items-center rounded-control border border-line transition-colors group-hover/cue:border-accent">
                  <ArrowDown aria-hidden="true" className="size-4" />
                </span>
                Bienvenue chez EVENTIA
              </a>
            </RevealItem>
          </RevealGroup>

          <Reveal
            variant="fade"
            delay={0.45}
            className="col-span-full lg:absolute lg:top-(--header-height) lg:right-0 lg:bottom-0 lg:w-[44%]"
          >
            <MediaSlotFrame
              slot="hero"
              ratio="fill"
              preload
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="max-lg:aspect-4/3 lg:rounded-none"
            />
          </Reveal>
        </Container>
      </div>

      <Container>
        <RevealGroup
          as="ol"
          stagger={0.15}
          className="flex flex-col gap-4 border-y border-line py-6 sm:flex-row sm:items-center sm:gap-6 sm:py-8"
        >
          {signature.map((word, index) => {
            const isLast = index === signature.length - 1;
            return (
              <RevealItem
                as="li"
                key={word}
                variant="fade"
                className={cn("flex items-center gap-4 sm:gap-6", !isLast && "sm:flex-1")}
              >
                <span aria-hidden="true" className="text-eyebrow text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lead tracking-widest text-fg uppercase">{word}.</span>
                {!isLast && (
                  <span aria-hidden="true" className="hidden flex-1 items-center text-accent sm:flex">
                    <RevealItem as="span" variant="draw" className="block h-px flex-1 origin-left bg-line">
                      {null}
                    </RevealItem>
                    <ArrowRight className="-ml-1 size-3.5" />
                  </span>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>

      <Container id="presentation" grid className="gap-y-10 py-section">
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
  );
}
