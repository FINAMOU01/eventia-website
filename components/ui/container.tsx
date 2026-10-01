import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "header" | "footer" | "nav";
  grid?: boolean;
};

export function Container({ as: Component = "div", grid = false, className, ...props }: ContainerProps) {
  return <Component className={cn("site-container", grid && "site-grid", className)} {...props} />;
}
