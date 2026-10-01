import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonVariant = "solid" | "outline" | "ghost" | "overlay";
type IconButtonSize = "md" | "lg";

const variantClasses: Record<IconButtonVariant, string> = {
  solid: "bg-cta text-cta-fg hover:bg-cta-hover",
  outline: "border border-line text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg hover:bg-fg/5",
  overlay: "bg-ink/55 text-white backdrop-blur-sm hover:bg-ink/75",
};

const sizeClasses: Record<IconButtonSize, string> = {
  md: "size-11 [&_svg]:size-5",
  lg: "size-16 [&_svg]:size-6",
};

type IconButtonProps = Omit<ComponentProps<"button">, "children" | "aria-label"> & {
  /** Accessible name, required because the button has no visible text. */
  label: string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

export function IconButton({
  label,
  icon,
  variant = "outline",
  size = "md",
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-control transition-colors disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex">
        {icon}
      </span>
    </button>
  );
}
