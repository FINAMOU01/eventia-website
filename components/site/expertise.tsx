"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";
import { getContent } from "@/lib/content";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getMediaSlot } from "@/lib/media";
import { EASE_EVENTIA } from "@/lib/motion";

const INTERVAL_MS = 6000;
const SWIPE_THRESHOLD_PX = 50;

// Photos come from lib/media.ts; an expertise without a delivered photo simply keeps the deep backdrop.
function buildItems(locale: Locale) {
  return getContent(locale).expertises.map((item) => {
    const media = getMediaSlot(item.slot, locale).media;
    return { ...item, image: media?.kind === "image" ? media.src : undefined };
  });
}
const itemsByLocale = { fr: buildItems("fr"), en: buildItems("en") } satisfies Record<Locale, unknown>;
const count = itemsByLocale.fr.length;
const total = String(count).padStart(2, "0");

const copy = {
  fr: {
    eyebrow: "Nos expertises",
    title: (
      <>
        Des solutions pensées pour chaque moment de <em className="text-accent italic">votre événement</em>.
      </>
    ),
    intro:
      "EVENTIA met à votre disposition des équipes formées, préparées et professionnelles, adaptées à chaque type d’événement et d’expérience de marque.",
    cta: "Découvrir nos expertises",
    previous: "Expertise précédente",
    next: "Expertise suivante",
    counter: ["Expertise ", " sur "],
  },
  en: {
    eyebrow: "Our expertise",
    title: (
      <>
        Solutions designed for every moment of <em className="text-accent italic">your event</em>.
      </>
    ),
    intro:
      "EVENTIA provides trained, prepared and professional teams, adapted to every type of event and brand experience.",
    cta: "Discover our expertise",
    previous: "Previous expertise",
    next: "Next expertise",
    counter: ["Expertise ", " of "],
  },
} satisfies Record<Locale, unknown>;

/** Homepage preview: full-bleed photo driven by an interactive list (desktop) or a swipeable slider (mobile). */
export function Expertise({ locale }: { locale: Locale }) {
  const items = itemsByLocale[locale];
  const t = copy[locale];
  const expertisesHref = localizeHref("/expertises", locale);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [inView, setInView] = useState(false);

  // Pauses while the mouse is over the section or keyboard focus is inside it.
  const isPlaying = !reduceMotion && inView && !isHovered && !hasFocus;
  const current = items[active];
  const goTo = (step: number) => setActive((index) => (index + step + count) % count);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [isPlaying, active]);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="expertise-titre"
      onPointerEnter={(event) => event.pointerType === "mouse" && setIsHovered(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setIsHovered(false)}
      // Only keyboard focus pauses the rotation; a mouse click leaves focus on the button.
      onFocus={(event) => setHasFocus(event.target.matches(":focus-visible"))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
      className="tone-deep relative isolate overflow-clip bg-ink text-fg"
    >
      <Container className="grid gap-y-10 py-section lg:min-h-[min(50rem,100svh)] lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:py-24">
        <div className="lg:col-span-5 lg:row-start-1">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2
            id="expertise-titre"
            className="mt-6 font-display text-[clamp(2.25rem,1.5rem+2.4vw,3.75rem)] leading-[1.08] tracking-[-0.01em] text-white"
          >
            {t.title}
          </h2>
          <p className="mt-6 max-w-md text-lead text-white/75">{t.intro}</p>
        </div>

        {/* Mobile: a swipeable photo slider; desktop: the photo becomes the full-bleed backdrop of the list. */}
        <div className="lg:contents">
          <div
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(event) => {
              const start = touchStart.current;
              touchStart.current = null;
              if (!start) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - start.x;
              if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(touch.clientY - start.y)) {
                goTo(dx < 0 ? 1 : -1);
              }
            }}
            className="relative mx-[calc(var(--gutter)*-1)] flex min-h-[34rem] flex-col justify-end overflow-hidden bg-deep sm:min-h-[38rem] lg:absolute lg:inset-0 lg:-z-10 lg:mx-0 lg:block lg:min-h-0"
          >
            {items.map((item, index) =>
              item.image ? (
                <div
                  key={item.id}
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-eventia",
                    index === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className={cn(
                      "object-cover transition-transform duration-[2400ms] ease-eventia",
                      index === active ? "scale-100" : "scale-[1.07]",
                    )}
                  />
                </div>
              ) : null,
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/15 lg:bg-linear-to-r lg:from-ink/95 lg:via-ink/70 lg:to-ink/50"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-linear-to-t from-ink/70 via-transparent to-ink/50 lg:block"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-deep/15 mix-blend-multiply" />

            <div className="relative px-(--gutter) pt-28 pb-8 lg:hidden">
              <div aria-live={isPlaying ? "off" : "polite"} className="min-h-[13rem] sm:min-h-[12rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={current.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: EASE_EVENTIA }}
                  >
                    <span aria-hidden="true" className="block font-display text-5xl leading-none text-accent italic">
                      {current.number}
                    </span>
                    <h3 className="mt-4 font-display text-[clamp(2rem,1.4rem+3vw,2.75rem)] leading-[1.1] text-white">
                      {current.title}
                    </h3>
                    <p className="mt-4 max-w-md text-body text-white/85">{current.tagline}</p>
                  </m.div>
                </AnimatePresence>
              </div>

              <NextLink
                href={expertisesHref}
                className="group/cta mt-8 flex items-center justify-between gap-4 border-t border-white/40 pt-4 font-sans text-button tracking-[0.12em] text-white uppercase transition-colors hover:text-accent"
              >
                {t.cta}
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </NextLink>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 lg:hidden">
            <p className="font-display text-lg text-white/50">
              <span className="sr-only">{t.counter[0]}</span>
              <span className="text-accent">{current.number}</span>
              <span aria-hidden="true">/</span>
              <span className="sr-only">{t.counter[1]}</span>
              {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={t.previous}
                onClick={() => goTo(-1)}
                className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:text-accent"
              >
                <ArrowLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                aria-label={t.next}
                onClick={() => goTo(1)}
                className="relative inline-flex size-12 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:text-accent"
              >
                <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
                  <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeOpacity="0.25" />
                  {isPlaying && (
                    <m.circle
                      key={active}
                      cx="24"
                      cy="24"
                      r="23"
                      fill="none"
                      stroke="var(--color-sky)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                    />
                  )}
                </svg>
                <ArrowRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <ol className="hidden lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:block lg:self-center">
            {items.map((item, index) => {
              const isActive = index === active;
              const descriptionId = `expertise-${item.id}-texte`;
              return (
                <li key={item.id} className="relative border-t border-white/15 last:border-b">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-px left-0 h-px bg-accent transition-[width] duration-700 ease-eventia",
                      isActive ? "w-full" : "w-0",
                    )}
                  />
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={descriptionId}
                    onClick={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
                    className="group/item flex w-full cursor-pointer items-baseline gap-5 py-4 text-left lg:py-[1.05rem]"
                  >
                    <span
                      className={cn(
                        "w-8 shrink-0 font-display text-base italic transition-colors duration-500",
                        isActive ? "text-accent" : "text-white/35 group-hover/item:text-white/60",
                      )}
                    >
                      {item.number}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[clamp(1.25rem,1.05rem+0.6vw,1.75rem)] leading-snug transition-[color,translate] duration-500 ease-eventia",
                        isActive
                          ? "translate-x-1.5 text-white"
                          : "text-white/55 group-hover/item:text-white/85",
                      )}
                    >
                      {item.title}
                    </span>
                  </button>
                  <div
                    id={descriptionId}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-eventia",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pl-[3.25rem]">
                      <span
                        className={cn(
                          "block pb-5 text-body text-white/80 transition-transform duration-700 ease-eventia",
                          isActive ? "translate-y-0" : "-translate-y-2",
                        )}
                      >
                        {item.tagline}
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="hidden flex-col gap-10 lg:col-span-5 lg:row-start-2 lg:flex lg:self-end">
          <p aria-hidden="true" className="hidden items-baseline gap-3 font-display text-white lg:flex">
            <span className="relative block h-[clamp(5rem,3rem+4vw,7.5rem)] w-[2.1ch] overflow-hidden text-[clamp(5rem,3rem+4vw,7.5rem)] leading-none italic">
              {items.map((item, index) => (
                <span
                  key={item.id}
                  className={cn(
                    "absolute inset-0 text-accent transition-[opacity,translate] duration-700 ease-eventia",
                    index === active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  )}
                >
                  {item.number}
                </span>
              ))}
            </span>
            <span className="text-h3 text-white/40">/ {total}</span>
          </p>

          <Link
            href={expertisesHref}
            appearance="primary"
            size="lg"
            icon={<ArrowRight />}
            className="w-full sm:w-auto sm:self-start"
          >
            {t.cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
