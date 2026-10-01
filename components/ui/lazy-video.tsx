"use client";

import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

export type MediaSource = string | StaticImageData;

export type VideoSource = {
  src: string;
  type: "video/mp4" | "video/webm";
};

/**
 * ambient: muted loop, loaded only when near the viewport, paused off-screen.
 * controls: poster + play button; the file is fetched only after the click.
 */
export type VideoBehavior = "ambient" | "controls";

type LazyVideoProps = {
  sources: VideoSource[];
  poster: MediaSource;
  alt: string;
  behavior: VideoBehavior;
  sizes: string;
  preload?: boolean;
  captions?: string;
  posterClassName?: string;
};

function prefersDataSaving() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

export function LazyVideo({
  sources,
  poster,
  alt,
  behavior,
  sizes,
  preload,
  captions,
  posterClassName,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const reduceMotion = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isAmbient = behavior === "ambient";

  useEffect(() => {
    if (!isAmbient || reduceMotion) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!entry.isIntersecting) {
          video?.pause();
          return;
        }
        if (pausedByUser.current) return;
        if (video) {
          video.play().catch(() => undefined);
        } else if (!prefersDataSaving()) {
          setShouldLoad(true);
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isAmbient, reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!shouldLoad || !video) return;
    video.muted = isAmbient;
    // Autoplay may be refused (e.g. low-power mode); the poster stays visible.
    video.play().catch(() => undefined);
  }, [shouldLoad, isAmbient]);

  function handleToggle() {
    const video = videoRef.current;
    if (!video) {
      pausedByUser.current = false;
      setShouldLoad(true);
      return;
    }
    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => undefined);
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Image
        src={poster}
        alt={isAmbient ? alt : ""}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", posterClassName)}
      />

      {shouldLoad && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700",
            hasStarted && "opacity-100",
          )}
          playsInline
          loop={isAmbient}
          muted={isAmbient}
          controls={!isAmbient}
          preload="auto"
          aria-hidden={isAmbient || undefined}
          aria-label={isAmbient ? undefined : alt}
          tabIndex={isAmbient ? -1 : undefined}
          onPlaying={() => {
            setHasStarted(true);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
          {captions && <track kind="captions" src={captions} srcLang="fr" label="Français" default />}
        </video>
      )}

      {isAmbient ? (
        <IconButton
          label={isPlaying ? "Mettre la vidéo en pause" : "Lire la vidéo"}
          icon={isPlaying ? <Pause /> : <Play />}
          variant="overlay"
          onClick={handleToggle}
          className="absolute right-3 bottom-3 z-10"
        />
      ) : (
        !shouldLoad && (
          <div className="absolute inset-0 z-10 grid place-items-center">
            <IconButton
              label={`Lire la vidéo : ${alt}`}
              icon={<Play />}
              variant="overlay"
              size="lg"
              onClick={handleToggle}
            />
          </div>
        )
      )}
    </div>
  );
}
