import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className, preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Image
      src="/media/brand/logo.png"
      alt="Logo EVENTIA BY N.J."
      width={2000}
      height={2000}
      preload={preload}
      className={cn("block h-12 w-auto object-contain lg:h-14", className)}
    />
  );
}
