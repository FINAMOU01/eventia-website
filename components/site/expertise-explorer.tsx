"use client";

import { ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";
import { MediaSlotFrame } from "@/components/site/media-slot-frame";
import { cn } from "@/lib/cn";
import { expertises } from "@/lib/content";

export function ExpertiseExplorer() {
  const [active, setActive] = useState(0);
  const current = expertises[active];

  return (
    <div className="site-grid gap-y-12">
      <ol className="col-span-full lg:col-span-6">
        {expertises.map((item, index) => {
          const isActive = index === active;
          return (
            <li key={item.id} className="border-b border-line first:border-t">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActive(index);
                }}
                className="group/item relative flex w-full gap-5 py-7 text-left sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 h-px bg-accent transition-[width] duration-500 ease-eventia",
                    isActive ? "w-full" : "w-0",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-12 shrink-0 font-display text-h2 leading-none transition-colors",
                    isActive ? "text-accent" : "text-fg-muted/40",
                  )}
                >
                  {item.number}
                </span>
                <span className="flex flex-1 flex-col gap-3">
                  <span
                    className={cn(
                      "font-display text-h3 transition-colors",
                      isActive ? "text-fg" : "text-fg-muted group-hover/item:text-fg",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="max-w-text text-small text-fg-muted">{item.description}</span>
                </span>
              </button>

              <div className="pb-8 lg:hidden">
                <MediaSlotFrame slot={item.slot} ratio="wide" tone="light" compact sizes="100vw" />
              </div>
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
        <div className="sticky top-[calc(var(--header-height)+2rem)]">
          <div className="relative aspect-3/4 overflow-hidden rounded-media">
            {expertises.map((item, index) => (
              <div
                key={item.id}
                aria-hidden={index !== active}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 ease-eventia",
                  index === active ? "opacity-100" : "opacity-0",
                )}
              >
                <MediaSlotFrame slot={item.slot} ratio="fill" tone="light" sizes="40vw" />
              </div>
            ))}
          </div>
          <p aria-live="polite" className="mt-4 flex items-center justify-between gap-4 text-small text-fg-muted">
            <span>
              <span className="text-accent">{current.number}</span> — {current.title}
            </span>
            <NextLink
              href="/contact"
              className="group/button inline-flex items-center gap-1.5 text-accent"
            >
              <span className="link-underline">Demander un devis</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </NextLink>
          </p>
        </div>
      </div>
    </div>
  );
}
