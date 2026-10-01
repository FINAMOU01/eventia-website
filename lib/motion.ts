import type { Transition, Variants } from "framer-motion";

// Keep in sync with --ease-eventia and --duration-* in app/globals.css.
export const EASE_EVENTIA: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.15,
  base: 0.3,
  slow: 0.7,
} as const;

const SLIDE_DISTANCE = 16;

export type RevealVariant = "fade" | "up" | "left" | "right" | "draw";

function revealTransition(delay = 0): Transition {
  return { duration: DURATION.slow, ease: EASE_EVENTIA, delay };
}

function slide(x: number, y: number): Variants {
  return {
    hidden: { opacity: 0, x, y },
    visible: (delay: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: revealTransition(delay),
    }),
  };
}

export const revealVariants: Record<RevealVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: (delay: number = 0) => ({ opacity: 1, transition: revealTransition(delay) }),
  },
  up: slide(0, SLIDE_DISTANCE),
  left: slide(-SLIDE_DISTANCE, 0),
  right: slide(SLIDE_DISTANCE, 0),
  // Horizontal hairline drawn from its transform-origin.
  draw: {
    hidden: { scaleX: 0 },
    visible: (delay: number = 0) => ({
      scaleX: 1,
      transition: { duration: 0.9, ease: EASE_EVENTIA, delay },
    }),
  },
};

export function staggerVariants(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

export const revealViewport = { once: true, amount: 0.2 } as const;
