import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = ComponentPropsWithoutRef<"p"> & {
  withRule?: boolean;
};

export function Eyebrow({ withRule = true, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 font-sans text-eyebrow font-medium text-accent uppercase",
        className,
      )}
      {...props}
    >
      {withRule && <span aria-hidden="true" className="h-px w-8 bg-current" />}
      {children}
    </p>
  );
}
