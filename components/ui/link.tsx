import NextLink from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ButtonContent, buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type LinkAppearance = "inline" | ButtonVariant;

type LinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  /** "inline" for links inside text; button variants for CTAs. */
  appearance?: LinkAppearance;
  size?: ButtonSize;
  icon?: ReactNode;
};

const inlineClasses =
  "text-accent underline decoration-1 underline-offset-4 transition-colors hover:text-fg";

export function Link({
  href,
  appearance = "inline",
  size,
  icon,
  target,
  rel,
  className,
  children,
  ...props
}: LinkProps) {
  const opensNewTab = target === "_blank";
  const classes =
    appearance === "inline"
      ? cn(inlineClasses, className)
      : buttonClasses({ variant: appearance, size, className });

  const content = (
    <>
      {appearance === "inline" ? (
        children
      ) : (
        <ButtonContent variant={appearance} icon={icon}>
          {children}
        </ButtonContent>
      )}
      {opensNewTab && <span className="sr-only"> (nouvel onglet)</span>}
    </>
  );

  const sharedProps = {
    className: classes,
    target,
    rel: opensNewTab ? "noopener noreferrer" : rel,
    ...props,
  };

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <NextLink href={href} {...sharedProps}>
        {content}
      </NextLink>
    );
  }

  return (
    <a href={href} {...sharedProps}>
      {content}
    </a>
  );
}
