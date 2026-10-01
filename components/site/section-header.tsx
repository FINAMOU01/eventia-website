import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  index: string;
  /** Storytelling line that links this section to the previous one. */
  kicker: string;
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  description?: ReactNode;
  className?: string;
};

export function SectionHeader({ index, kicker, eyebrow, title, titleId, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-10 lg:gap-14", className)}>
      <div className="flex items-center gap-5 text-eyebrow text-fg-muted uppercase">
        <span aria-hidden="true" className="font-display text-h3 tracking-normal text-accent normal-case">
          {index}
        </span>
        <Reveal as="span" variant="draw" className="block h-px flex-1 origin-left bg-line">
          {null}
        </Reveal>
        <span>{kicker}</span>
      </div>
      <Reveal>
        <SectionHeading id={titleId} eyebrow={eyebrow} title={title} description={description} />
      </Reveal>
    </div>
  );
}
