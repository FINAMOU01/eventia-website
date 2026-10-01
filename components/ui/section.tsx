import type { ComponentPropsWithoutRef } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export type SectionTone = "light" | "surface" | "deep";
type SectionSpacing = "default" | "compact" | "none";

const toneClasses: Record<SectionTone, string> = {
  light: "tone-light",
  surface: "tone-surface",
  deep: "tone-deep",
};

const spacingClasses: Record<SectionSpacing, string> = {
  default: "py-section",
  compact: "py-section-sm",
  none: "",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  spacing?: SectionSpacing;
  /** Wraps children in the site Container; disable for full-bleed layouts. */
  contained?: boolean;
};

export function Section({
  tone = "light",
  spacing = "default",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(toneClasses[tone], "bg-canvas text-fg", spacingClasses[spacing], className)}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
