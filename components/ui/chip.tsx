import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = {
  children: ReactNode;
  icon?: ReactNode;
  /** Providing onClick renders a toggle button exposing its state via aria-pressed. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
};

const baseClasses =
  "inline-flex items-center gap-2 rounded-control border px-4 text-small font-medium transition-colors";

export function Chip({ children, icon, onClick, selected = false, disabled, className }: ChipProps) {
  const content = (
    <>
      {icon && (
        <span aria-hidden="true" className="inline-flex [&_svg]:size-4">
          {icon}
        </span>
      )}
      {children}
    </>
  );

  if (!onClick) {
    return <span className={cn(baseClasses, "min-h-9 border-line text-fg", className)}>{content}</span>;
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        baseClasses,
        "min-h-11 disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "border-accent bg-accent text-canvas"
          : "border-line text-fg hover:border-accent hover:text-accent",
        className,
      )}
    >
      {content}
    </button>
  );
}
