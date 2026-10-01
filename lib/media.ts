import type { FrameMedia } from "@/components/ui/media-frame";

export type PlaceholderMotif = "arch" | "spotlight" | "portrait";

export type MediaSlot = {
  label: string;
  /** Planned file path(s) under /public/media. */
  files: string[];
  motif: PlaceholderMotif;
  /** Leave undefined until the real EVENTIA asset is delivered. */
  media?: FrameMedia;
};

/*
 * Media manifest. To publish a real asset, drop the file in /public/media/... and set `media`, e.g.
 * media: { kind: "video", sources: [{ src: "/media/hero/hero-video.mp4", type: "video/mp4" }],
 *          poster: "/media/hero/hero-poster.jpg", alt: "…" }
 */
export const mediaSlots = {
  hero: {
    label: "Vidéo d’accueil",
    files: ["/media/hero/hero.jpg"],
    motif: "arch",
    media: {
      kind: "image",
      src: "/media/hero/hero.jpg",
      alt: "Hôtesses EVENTIA en uniforme bleu posant autour d’un kakémono Eventia",
    },
  },

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
    files: ["/media/realisations/littoral-sud-ouest-2026/main.jpg", "/media/realisations/littoral-sud-ouest-2026/video.mp4"],
    motif: "spotlight",
  },
  "realisation-littoral-detail-1": {
    label: "Littoral & Sud-Ouest — détail",
    files: ["/media/realisations/littoral-sud-ouest-2026/detail-1.jpg"],
    motif: "portrait",
  },
  "realisation-littoral-detail-2": {
    label: "Littoral & Sud-Ouest — détail",
    files: ["/media/realisations/littoral-sud-ouest-2026/detail-2.jpg"],
    motif: "arch",
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
  "realisation-miss-detail-1": {
    label: "Miss Cameroun 2026 — détail",
    files: ["/media/realisations/miss-cameroun-2026/miss cameroun2.jpg"],
    motif: "arch",
    media: {
      kind: "image",
      src: "/media/realisations/miss-cameroun-2026/miss cameroun2.jpg",
      alt: "Hôtesses EVENTIA remettant les sacs cadeaux aux candidates sur scène lors de Miss Cameroun",
    },
  },
  "realisation-miss-detail-2": {
    label: "Miss Cameroun 2026 — détail",
    files: [],
    motif: "portrait",
    media: {
      kind: "embed",
      // width/height match the 4:3 frame so the vertical reel is letterboxed, not cropped.
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent("https://www.facebook.com/reel/1539301614901692")}&show_text=false&width=800&height=600`,
      title: "Vidéo EVENTIA — Miss Cameroun 2026",
    },
  },
  "realisation-comica-main": {
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
  "realisation-comica-detail-1": {
    label: "COMICA — détail",
    files: ["/media/realisations/comica/detail-1.jpg"],
    motif: "spotlight",
  },
  "realisation-comica-detail-2": {
    label: "COMICA — détail",
    files: ["/media/realisations/comica/detail-2.jpg"],
    motif: "portrait",
  },

  "equipe-noura": {
    label: "Portrait — Noura Njikam",
    files: ["/media/equipe/noura.jpg"],
    motif: "portrait",
    media: {
      kind: "image",
      src: "/media/equipe/noura.jpg",
      alt: "Portrait de Noura Njikam, PDG d’EVENTIA BY N.J",
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
} satisfies Record<string, MediaSlot>;

export type MediaSlotId = keyof typeof mediaSlots;

export function getMediaSlot(id: MediaSlotId): MediaSlot {
  return mediaSlots[id];
}
