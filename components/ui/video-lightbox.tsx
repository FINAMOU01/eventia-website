"use client";

import { Play, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

export type LightboxVideo = {
  title: string;
  orientation: "landscape" | "portrait";
} & ({ kind: "file"; src: string } | { kind: "facebook"; url: string });

function facebookEmbedSrc(url: string, orientation: LightboxVideo["orientation"]) {
  // width/height only set the ratio: the Facebook player scales to the iframe and letterboxes the video.
  const [width, height] = orientation === "portrait" ? [450, 800] : [1280, 720];
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=${width}&height=${height}`;
}

type VideoLightboxProps = {
  video: LightboxVideo;
  /** Visual shown inside the trigger button (poster, artwork…). */
  children: ReactNode;
  className?: string;
};

/** A poster button that opens the video in a modal dialog (Escape, backdrop click and close button dismiss it). */
export function VideoLightbox({ video, children, className }: VideoLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const isPortrait = video.orientation === "portrait";

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Lire la vidéo : ${video.title}`}
        onClick={() => setIsOpen(true)}
        className={cn("group/video relative block w-full overflow-hidden text-left", className)}
      >
        {children}
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-full bg-white/90 text-deep shadow-lift transition-transform duration-500 ease-eventia group-hover/video:scale-110 lg:size-20">
            <Play className="size-6 translate-x-0.5 fill-current lg:size-7" />
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={video.title}
        onClose={() => setIsOpen(false)}
        onCancel={(event) => {
          event.preventDefault();
          setIsOpen(false);
        }}
        // Native Escape handling can be skipped by some browsers' close-watcher rules.
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          setIsOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none items-center justify-center bg-ink/92 p-4 text-white backdrop:bg-transparent open:flex sm:p-10"
      >
        {isOpen && (
          <>
            <IconButton
              label="Fermer la vidéo"
              icon={<X />}
              variant="overlay"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 sm:top-6 sm:right-6"
            />
            <div
              className={cn(
                "overflow-hidden rounded-media bg-black shadow-lift",
                isPortrait
                  ? "aspect-9/16 h-[min(85dvh,calc((100vw-2rem)*16/9))]"
                  : "aspect-video w-[min(100%,calc(85dvh*16/9))]",
              )}
            >
              {video.kind === "file" ? (
                // The web encode has no audio track, so starting playback on open is silent.
                <video src={video.src} controls autoPlay playsInline className="size-full bg-black object-contain" />
              ) : (
                <iframe
                  src={facebookEmbedSrc(video.url, video.orientation)}
                  title={video.title}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full"
                />
              )}
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
