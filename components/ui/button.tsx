import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "md" | "lg";

const baseClasses =
  "group/button inline-flex items-center justify-center gap-2.5 font-sans font-medium whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,translate] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-control bg-cta text-button text-cta-fg uppercase shadow-soft hover:bg-cta-hover hover:shadow-lift motion-safe:hover:-translate-y-0.5",
  secondary:
    "rounded-control border border-accent text-button text-accent uppercase hover:bg-accent hover:text-canvas",
  text: "min-h-11 text-small text-accent",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-12 px-7",
  lg: "min-h-14 px-9",
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonClasses({ variant = "primary", size = "md", className }: ButtonStyleOptions = {}) {
  return cn(baseClasses, variantClasses[variant], variant !== "text" && sizeClasses[size], className);
}

type ButtonContentProps = {
  variant: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
};

/** Shared inner markup so Button and Link render identical CTAs. */
export function ButtonContent({ variant, icon, children }: ButtonContentProps) {
  return (
    <>
      <span className={variant === "text" ? "link-underline" : undefined}>{children}</span>
      {icon && (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 transition-transform motion-safe:group-hover/button:translate-x-0.5 [&_svg]:size-4"
        >
          {icon}
        </span>
      )}
    </>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export function Button({
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      <ButtonContent variant={variant} icon={icon}>
        {children}
      </ButtonContent>
    </button>
  );
}
