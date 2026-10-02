"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";
import { realisations, realisationsIntro } from "@/lib/content";
import { realisationsShowcase } from "@/lib/media";

const INTERVAL_MS = 4000;

const slides = realisationsShowcase.flatMap((photo) => {
  const realisation = realisations.find(({ id }) => id === photo.realisationId);
  return realisation ? [{ ...photo, realisation }] : [];
});

/** Homepage preview: full-bleed photo carousel; the full portfolio lives on /realisations. */
export function Realisations() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hasFocus, setHasFocus] = useState(false);
  const [inView, setInView] = useState(false);

  const canRotate = slides.length > 1 && !reduceMotion;
  // Keeps rotating under the mouse; only keyboard focus inside the section or leaving the viewport pauses it.
  const isPlaying = canRotate && !hasFocus && inView;
  const current = slides[active];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [isPlaying, active]);

  return (
    <section
      ref={sectionRef}
      id="realisations"
      aria-labelledby="realisations-titre"
      aria-roledescription="carrousel"
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
      className="tone-deep relative isolate flex h-[min(90svh,54rem)] min-h-[40rem] overflow-hidden bg-ink text-fg"
    >
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={index}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-in-out",
              isActive ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className={cn(
                "object-cover transition-transform duration-[9000ms] ease-out",
                isActive ? "scale-100" : "scale-[1.06]",
              )}
            />
          </div>
        );
      })}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-deep/25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-ink/95 via-ink/45 to-ink/55 lg:bg-linear-to-r lg:from-ink/90 lg:via-ink/50 lg:to-ink/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-ink/80 to-transparent"
      />

      <Container className="flex flex-1 flex-col justify-end pt-[calc(var(--header-height)+2rem)] pb-8 lg:pb-12">
        <div className="max-w-3xl">
          <h2
            id="realisations-titre"
            className="inline-flex items-center gap-3 font-sans text-eyebrow font-medium text-accent uppercase"
          >
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Nos réalisations
          </h2>

          <div aria-live={isPlaying ? "off" : "polite"} className="mt-6 min-h-[8.5rem] sm:min-h-[9.5rem] lg:min-h-[11rem]">
            <AnimatePresence mode="wait" initial={false}>
              {current && (
                <m.p
                  key={current.realisation.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="block font-sans text-eyebrow font-medium tracking-[0.18em] text-white/80 uppercase">
                    {current.realisation.type}
                  </span>
                  <span className="sr-only"> : </span>
                  <span className="mt-3 block font-display text-[clamp(2.25rem,1.3rem+3.6vw,4.75rem)] leading-[1.04] tracking-[-0.01em] text-white">
                    {current.realisation.title}
                  </span>
                </m.p>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-6 max-w-xl text-lead text-white/85">{realisationsIntro.intro}</p>
          <p className="mt-3 max-w-xl text-small text-white/65">{realisationsIntro.context}</p>

          <Link
            href="/realisations"
            appearance="primary"
            size="lg"
            icon={<ArrowRight />}
            className="mt-8 w-full sm:w-auto"
          >
            Voir nos réalisations
          </Link>
        </div>
      </Container>
    </section>
  );
}
