import type { ReactNode } from "react";
import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { MediaFrame, type MediaRatio } from "@/components/ui/media-frame";
import type { Locale } from "@/lib/i18n";
import { getMediaSlot, type MediaSlotId } from "@/lib/media";

type MediaSlotFrameProps = {
  slot: MediaSlotId;
  locale: Locale;
  ratio?: MediaRatio;
  sizes?: string;
  preload?: boolean;
  tone?: "deep" | "light";
  compact?: boolean;
  caption?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/** Renders the real asset when declared in lib/media.ts, otherwise a labelled placeholder. */
export function MediaSlotFrame({
  slot,
  locale,
  ratio,
  sizes,
  preload,
  tone,
  compact,
  caption,
  className,
  children,
}: MediaSlotFrameProps) {
  const { media, label, files, motif } = getMediaSlot(slot, locale);

  return (
    <MediaFrame
      media={media}
      ratio={ratio}
      sizes={sizes}
      preload={media ? preload : false}
      interactive
      caption={caption}
      className={className}
    >
      {!media && (
        <MediaPlaceholder label={label} files={files} motif={motif} tone={tone} compact={compact} locale={locale} />
      )}
      {children}
    </MediaFrame>
  );
}
