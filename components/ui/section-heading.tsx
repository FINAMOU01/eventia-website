import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Use as the target of the parent section's aria-labelledby. */
  id?: string;
  eyebrow?: ReactNode;
  /** Wrap words in <em> to set them in italic accent. */
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "section";
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  size = "section",
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={cn(
          size === "display" ? "text-display" : "text-h2",
          "text-fg [&_em]:text-accent [&_em]:italic",
        )}
      >
        {title}
      </Heading>
      {description && <p className="max-w-text text-lead text-fg-muted">{description}</p>}
    </div>
  );
}
