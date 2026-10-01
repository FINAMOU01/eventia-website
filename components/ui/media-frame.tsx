import Image from "next/image";
import type { ReactNode } from "react";
import {
  LazyVideo,
  type MediaSource,
  type VideoBehavior,
  type VideoSource,
} from "@/components/ui/lazy-video";
import { cn } from "@/lib/cn";

export type MediaRatio = "portrait" | "landscape" | "square" | "wide" | "vertical" | "fill";

const ratioClasses: Record<MediaRatio, string> = {
  portrait: "aspect-3/4",
  landscape: "aspect-4/3",
  square: "aspect-square",
  wide: "aspect-video",
  vertical: "aspect-9/16",
  fill: "size-full",
};

type ImageMedia = {
  kind: "image";
  src: MediaSource;
  /** Describe the scene; use "" only for purely decorative images. */
  alt: string;
  /** "contain" for posters/visuals with text that must not be cropped. */
  fit?: "cover" | "contain";
  /** Keep this edge visible when the frame crops the image. */
  anchor?: "top";
};

type VideoMedia = {
  kind: "video";
  sources: VideoSource[];
  poster: MediaSource;
  alt: string;
  behavior?: VideoBehavior;
  /** WebVTT captions file, recommended for videos with speech. */
  captions?: string;
};

/** Third-party player (e.g. Facebook video plugin). */
type EmbedMedia = {
  kind: "embed";
  src: string;
  title: string;
};

export type FrameMedia = ImageMedia | VideoMedia | EmbedMedia;

type MediaFrameProps = {
  /** Omit to render only the frame and its children (e.g. a placeholder). */
  media?: FrameMedia;
  ratio?: MediaRatio;
  sizes?: string;
  /** Only for the above-the-fold media (LCP). Everything else lazy-loads. */
  preload?: boolean;
  /** Subtle zoom on hover, for clickable media. */
  interactive?: boolean;
  /** Bottom gradient to keep overlaid text readable. */
  scrim?: boolean;
  caption?: ReactNode;
  className?: string;
  /** Overlay content, positioned by the caller. */
  children?: ReactNode;
};

const DEFAULT_SIZES = "(min-width: 1024px) 50vw, 100vw";

export function MediaFrame({
  media,
  ratio = "landscape",
  sizes = DEFAULT_SIZES,
  preload = false,
  interactive = false,
  scrim = false,
  caption,
  className,
  children,
}: MediaFrameProps) {
  const zoomClasses = interactive
    ? "transition-transform duration-700 ease-eventia motion-safe:group-hover/media:scale-103"
    : undefined;

  const frame = (
    <div
      className={cn(
        "group/media relative isolate overflow-hidden rounded-media bg-surface-2",
        ratioClasses[ratio],
        !caption && className,
      )}
    >
      {media?.kind === "image" && (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn(
            media.fit === "contain" ? "object-contain" : "object-cover",
            media.anchor === "top" && "object-top",
            zoomClasses,
          )}
        />
      )}
      {media?.kind === "video" && (
        <LazyVideo
          sources={media.sources}
          poster={media.poster}
          alt={media.alt}
          behavior={media.behavior ?? "ambient"}
          captions={media.captions}
          sizes={sizes}
          preload={preload}
          posterClassName={zoomClasses}
        />
      )}
      {media?.kind === "embed" && (
        <iframe
          src={media.src}
          title={media.title}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full bg-ink"
        />
      )}
      {scrim && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent"
        />
      )}
      {children}
    </div>
  );

  if (!caption) return frame;

  return (
    <figure className={className}>
      {frame}
      <figcaption className="mt-3 text-small text-fg-muted">{caption}</figcaption>
    </figure>
  );
}
