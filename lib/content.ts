import type { MediaSlotId } from "@/lib/media";

// Service descriptions and method details are drafts derived from the client brief: to validate with EVENTIA.

export type Expertise = {
  id: string;
  number: string;
  title: string;
  description: string;
  slot: MediaSlotId;
};

export const expertises: Expertise[] = [
  {
    id: "accueil-representation",
    number: "01",
    title: "Accueil & représentation",
    description:
      "Des hôtesses et hôtes pour accueillir, orienter et représenter votre marque auprès de votre public.",
    slot: "expertise-accueil",
  },
  {
    id: "protocole-accompagnement",
    number: "02",
    title: "Protocole & accompagnement",
    description:
      "Un protocole maîtrisé pour accompagner vos invités et vos temps forts avec élégance et discrétion.",
    slot: "expertise-protocole",
  },
  {
    id: "organisation-evenementielle",
    number: "03",
    title: "Organisation événementielle",
    description: "Un appui à l’organisation de votre événement, de la préparation jusqu’au jour J.",
    slot: "expertise-organisation",
  },
  {
    id: "activation-produits-marques",
    number: "04",
    title: "Activation de produits & de marques",
    description:
      "Des équipes dynamiques pour faire découvrir vos produits et faire vivre votre marque au contact du public.",
    slot: "expertise-activation",
  },
  {
    id: "personnel-sur-mesure",
    number: "05",
    title: "Personnel événementiel sur mesure",
    description: "Des profils sélectionnés selon votre événement, votre image et votre public.",
    slot: "expertise-personnel",
  },
];

export const method = [
  { verb: "Comprendre", text: "Votre événement, votre public et l’image que vous souhaitez transmettre." },
  { verb: "Constituer", text: "Une équipe choisie pour votre événement et ses exigences." },
  { verb: "Préparer", text: "Briefing, présentation et consignes de mission." },
  { verb: "Accompagner", text: "Une présence engagée sur le terrain, du début à la fin." },
] as const;

export type Realisation = {
  id: string;
  number: string;
  category: string;
  title: string;
  /** Confirmed missions only; empty until EVENTIA validates them. */
  missions: string[];
  slots: [MediaSlotId, MediaSlotId, MediaSlotId];
};

export const realisations: Realisation[] = [
  {
    id: "littoral-sud-ouest-2026",
    number: "01",
    category: "Concours régional",
    title: "Littoral & Sud-Ouest 2026",
    missions: [],
    slots: ["realisation-littoral-main", "realisation-littoral-detail-1", "realisation-littoral-detail-2"],
  },
  {
    id: "miss-cameroun-2026",
    number: "02",
    category: "Finale nationale",
    title: "Miss Cameroun 2026",
    missions: [],
    slots: ["realisation-miss-main", "realisation-miss-detail-1", "realisation-miss-detail-2"],
  },
  {
    id: "comica",
    number: "03",
    category: "Partenaire",
    title: "COMICA",
    missions: [],
    slots: ["realisation-comica-main", "realisation-comica-detail-1", "realisation-comica-detail-2"],
  },
];

export const teamValues = ["Élégance", "Professionnalisme", "Dynamisme", "Engagement"] as const;

export const recruitment = {
  profiles: [
    "Hôtesses événementielles",
    "Profils bilingues français / anglais",
    "Personnes dynamiques et souriantes",
    "Excellent relationnel",
    "Bonne présentation",
  ],
  criteria: [
    { label: "Taille", value: "1,70 m minimum" },
    { label: "Âge", value: "19 – 30 ans" },
    { label: "Langues", value: "Français / Anglais" },
    { label: "Qualités", value: "Dynamisme, ponctualité, bonne présentation, qualités relationnelles" },
  ],
  documents: ["CV", "Lettre de motivation", "Portrait récent", "Photo récente en pied, sans filtre"],
} as const;
