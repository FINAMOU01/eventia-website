import type { FrameMedia } from "@/components/ui/media-frame";
import type { VideoSource } from "@/components/ui/lazy-video";

export type PlaceholderMotif = "arch" | "spotlight" | "portrait";

export type MediaSlot = {
  label: string;
  /** Planned file path(s) under /public/media. */
  files: string[];
  motif: PlaceholderMotif;
  /** Leave undefined until the real EVENTIA asset is delivered. */
  media?: FrameMedia;
};

export const heroVideo = {
  // Web encode of the client spot (master kept outside the project: eventia-assets/hero/Spot eventia.MOV).
  // H.264 1080p 30 fps, no audio, faststart.
  sources: [{ src: "/media/hero/hero.mp4", type: "video/mp4" }],
  poster: "/media/hero/hero.jpg",
  alt: "Hôtesses EVENTIA en uniforme bleu lors d’un événement",
} satisfies { sources: VideoSource[]; poster: string; alt: string };

/*
 * Media manifest. To publish a real asset, drop the file in /public/media/... and set `media`, e.g.
 * media: { kind: "video", sources: [{ src: "/media/hero/hero-video.mp4", type: "video/mp4" }],
 *          poster: "/media/hero/hero-poster.jpg", alt: "…" }
 */
export const mediaSlots = {
  "expertise-accueil": {
    label: "Accueil & représentation",
    files: ["/media/expertise/01-accueil-representation.jpg"],
    motif: "portrait",
  },
  "expertise-protocole": {
    label: "Protocole & accompagnement",
    files: ["/media/expertise/02-protocole-accompagnement.jpg"],
    motif: "arch",
  },
  "expertise-organisation": {
    label: "Organisation événementielle",
    files: ["/media/expertise/03-organisation-evenementielle.jpg"],
    motif: "spotlight",
  },
  "expertise-activation": {
    label: "Activation de produits & de marques",
    files: ["/media/expertise/04-activation-produits-marques.jpg"],
    motif: "spotlight",
  },
  "expertise-personnel": {
    label: "Personnel événementiel sur mesure",
    files: ["/media/expertise/05-personnel-sur-mesure.jpg"],
    motif: "portrait",
  },

  "realisation-littoral-main": {
    label: "Littoral & Sud-Ouest 2026",
    files: ["/media/realisations/littoral-sud-ouest-2026/main.jpg"],
    motif: "spotlight",
  },
  "realisation-littoral-detail": {
    label: "Littoral & Sud-Ouest 2026 — détail",
    files: ["/media/realisations/littoral-sud-ouest-2026/detail-1.jpg"],
    motif: "portrait",
  },
  "realisation-miss-main": {
    label: "Miss Cameroun 2026",
    files: ["/media/realisations/miss-cameroun-2026/misscameroun1.jpg"],
    motif: "spotlight",
    media: {
      kind: "image",
      src: "/media/realisations/miss-cameroun-2026/misscameroun1.jpg",
      alt: "Hôtesses EVENTIA en uniforme bleu présentant les écharpes des lauréates sur la scène de Miss Cameroun",
    },
  },
  "realisation-miss-side": {
    label: "Miss Cameroun 2026 — photo",
    files: ["/media/realisations/miss-cameroun-2026/miss cameroun3.png"],
    motif: "portrait",
    media: {
      kind: "image",
      src: "/media/realisations/miss-cameroun-2026/miss cameroun3.png",
      alt: "Remise des écharpes sur la scène de la finale Miss Cameroun, avec une hôtesse EVENTIA en robe bleue",
    },
  },
  "realisation-miss-detail": {
    label: "Miss Cameroun 2026 — détail",
    files: ["/media/realisations/miss-cameroun-2026/miss cameroun2.jpg"],
    motif: "arch",
    media: {
      kind: "image",
      src: "/media/realisations/miss-cameroun-2026/miss cameroun2.jpg",
      alt: "Hôtesses EVENTIA remettant les sacs cadeaux aux candidates sur scène lors de Miss Cameroun",
    },
  },
  "realisation-comica": {
    label: "Partenariat COMICA",
    files: ["/media/realisations/comica/COMICA_partenariat.jpg"],
    motif: "arch",
    media: {
      kind: "image",
      src: "/media/realisations/comica/COMICA_partenariat.jpg",
      alt: "Affiche : COMICA et Eventia annoncent leur partenariat pour Miss Cameroun 2026 — hôtesses événementielles et accueil des invités VVIP, finale nationale le 19 septembre 2026",
      fit: "contain",
    },
  },

  "equipe-noura": {
    label: "Portrait — Noura Njikam",
    files: ["/media/equipe/NouraPDG.PNG"],
    motif: "portrait",
    media: {
      kind: "image",
      src: "/media/equipe/NouraPDG.PNG",
      alt: "Portrait de Noura Njikam, PDG d’EVENTIA BY N.J, en tailleur bleu",
      anchor: "top",
    },
  },
  "equipe-groupe": {
    label: "L’équipe EVENTIA",
    files: ["/media/equipe/equipe1.jpg"],
    motif: "spotlight",
    media: {
      kind: "image",
      src: "/media/equipe/equipe1.jpg",
      alt: "Noura Njikam, Miss World Cameroun 2026, entourée des hôtesses EVENTIA en uniforme bleu",
    },
  },
  "equipe-terrain": {
    label: "L’équipe EVENTIA sur le terrain",
    files: ["/media/hero/hero.jpg"],
    motif: "portrait",
    media: {
      kind: "image",
      src: "/media/hero/hero.jpg",
      alt: "Hôtesses EVENTIA en uniforme bleu posant autour d’un kakémono Eventia",
    },
  },

  "recrutement-portrait": {
    label: "Recrutement",
    files: ["/media/recrutement/recrutement.png"],
    motif: "portrait",
    media: {
      kind: "image",
      src: "/media/recrutement/recrutement.png",
      alt: "Hôtesse EVENTIA souriante en uniforme bleu et foulard blanc",
      anchor: "top",
    },
  },
  "recrutement-equipe": {
    label: "Les hôtesses EVENTIA",
    files: ["/media/realisations/miss-cameroun-2026/mis cameroun4.PNG"],
    motif: "spotlight",
    media: {
      kind: "image",
      src: "/media/realisations/miss-cameroun-2026/mis cameroun4.PNG",
      alt: "Les hôtesses EVENTIA en robes de satin bleu roi devant le mur Eventia",
    },
  },
} satisfies Record<string, MediaSlot>;

export type MediaSlotId = keyof typeof mediaSlots;

export type ShowcasePhoto = {
  /** `id` of the matching entry in `realisations` (lib/content.ts); its type and title caption the slide. */
  realisationId: string;
  src: string;
  alt: string;
};

/** Homepage Réalisations carousel, in display order. Add an item to add a slide (real event photos only). */
export const realisationsShowcase: ShowcasePhoto[] = [
  {
    realisationId: "miss-cameroun-2026",
    src: "/media/realisations/miss-cameroun-2026/mis cameroun4.PNG",
    alt: "Les hôtesses EVENTIA en robes de satin bleu roi devant le mur Eventia lors de Miss Cameroun 2026",
  },
  {
    realisationId: "miss-cameroun-2026",
    src: "/media/realisations/miss-cameroun-2026/misscameroun1.jpg",
    alt: "Hôtesses EVENTIA en uniforme bleu présentant les écharpes des lauréates sur la scène de Miss Cameroun",
  },
  {
    realisationId: "miss-cameroun-2026",
    src: "/media/realisations/miss-cameroun-2026/miss cameroun3.png",
    alt: "Remise des écharpes sur la scène de la finale Miss Cameroun, avec une hôtesse EVENTIA en robe bleue",
  },
  {
    realisationId: "miss-cameroun-2026",
    src: "/media/realisations/miss-cameroun-2026/miss cameroun2.jpg",
    alt: "Hôtesses EVENTIA remettant les sacs cadeaux aux candidates sur scène lors de Miss Cameroun",
  },
];

export function getMediaSlot(id: MediaSlotId): MediaSlot {
  return mediaSlots[id];
}
