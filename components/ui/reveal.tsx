"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { revealVariants, revealViewport, staggerVariants, type RevealVariant } from "@/lib/motion";

const itemTags = { div: m.div, li: m.li, span: m.span };
const groupTags = { div: m.div, ul: m.ul, ol: m.ol };

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds. */
  delay?: number;
  as?: keyof typeof itemTags;
  className?: string;
};

/** Standalone element revealed once when it enters the viewport. */
export function Reveal({ children, variant = "up", delay = 0, as = "div", className }: RevealProps) {
  const Component = itemTags[as];
  return (
    <Component
      className={className}
      variants={revealVariants[variant]}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  /** Seconds between each RevealItem. */
  stagger?: number;
  delay?: number;
  as?: keyof typeof groupTags;
  className?: string;
};

/** Staggers its RevealItem children when the group enters the viewport. */
export function RevealGroup({ children, stagger, delay, as = "div", className }: RevealGroupProps) {
  const Component = groupTags[as];
  return (
    <Component
      className={className}
      variants={staggerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  variant?: RevealVariant;
  as?: keyof typeof itemTags;
  className?: string;
};

export function RevealItem({ children, variant = "up", as = "div", className }: RevealItemProps) {
  const Component = itemTags[as];
  return (
    <Component className={className} variants={revealVariants[variant]}>
      {children}
    </Component>
  );
}
