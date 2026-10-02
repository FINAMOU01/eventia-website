import type { LightboxVideo } from "@/components/ui/video-lightbox";
import type { MediaSlotId } from "@/lib/media";
import { siteConfig } from "@/lib/site";

// Taglines and method steps are client-approved; descriptions paraphrase the client brief.

export type Expertise = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  slot: MediaSlotId;
};

export const expertises: Expertise[] = [
  {
    id: "accueil-representation",
    number: "01",
    title: "Accueil & représentation",
    tagline: "Le premier contact qui valorise votre image.",
    description:
      "Nos équipes accueillent, orientent et représentent votre marque auprès de votre public, avec élégance et professionnalisme.",
    slot: "expertise-accueil",
  },
  {
    id: "protocole-accompagnement",
    number: "02",
    title: "Protocole & accompagnement",
    tagline: "Accueillir et accompagner vos invités avec attention.",
    description: "Nos équipes accueillent, guident et accompagnent vos invités tout au long de votre événement.",
    slot: "expertise-protocole",
  },
  {
    id: "organisation-evenementielle",
    number: "03",
    title: "Organisation événementielle",
    tagline: "Des équipes engagées pour contribuer au bon déroulement de vos événements.",
    description: "EVENTIA met à votre disposition un personnel qui contribue au bon déroulement de votre événement.",
    slot: "expertise-organisation",
  },
  {
    id: "activation-produits-marques",
    number: "04",
    title: "Activation de produits & de marques",
    tagline: "Créer une interaction entre votre marque et votre public.",
    description:
      "Nos équipes participent à vos activations de produits et de marques et créent de véritables échanges avec votre public.",
    slot: "expertise-activation",
  },
  {
    id: "personnel-sur-mesure",
    number: "05",
    title: "Personnel événementiel sur mesure",
    tagline: "Des équipes adaptées aux exigences de votre événement.",
    description: "EVENTIA constitue ses équipes selon les besoins spécifiques de chaque mission.",
    slot: "expertise-personnel",
  },
];

export const method = [
  { verb: "Comprendre", text: "Identifier les besoins de votre événement." },
  { verb: "Constituer", text: "Constituer une équipe adaptée à la mission." },
  { verb: "Préparer", text: "Briefing et préparation des équipes." },
  { verb: "Accompagner", text: "Être présent sur le terrain et contribuer à la qualité de l’expérience." },
] as const;

export const realisationsIntro = {
  title: "Des événements. Des visages. Des expériences.",
  intro: "EVENTIA en action à travers des événements qui nous ont fait confiance.",
  category: "Événements premium",
  context:
    "Partenaire du COMICA, EVENTIA a accompagné ces étapes avec ses équipes, contribuant à l’accueil, à l’accompagnement et à l’image de l’événement.",
} as const;

export type Realisation = {
  id: string;
  number: string;
  /** Event type, shown before the event name (e.g. "Concours régional"). */
  type: string;
  title: string;
  /** Lead visual, side visual, then an optional third visual below. */
  slots: [MediaSlotId, MediaSlotId, MediaSlotId?];
};

export const realisations: Realisation[] = [
  {
    id: "littoral-sud-ouest-2026",
    number: "01",
    type: "Concours régional",
    title: "Littoral & Sud-Ouest 2026",
    slots: ["realisation-littoral-main", "realisation-littoral-detail"],
  },
  {
    id: "miss-cameroun-2026",
    number: "02",
    type: "Finale nationale",
    title: "Miss Cameroun 2026",
    slots: ["realisation-miss-main", "realisation-miss-side", "realisation-miss-detail"],
  },
];

export const eventiaSpot: LightboxVideo = {
  kind: "file",
  src: "/media/hero/hero.mp4",
  orientation: "landscape",
  title: "Le spot EVENTIA",
};

export const teamValues = ["Élégance", "Professionnalisme", "Dynamisme", "Engagement"] as const;

// Client-approved wording only.
export const team = {
  headline: ["Une vision.", "Une équipe.", "Une ambition."],
  summary:
    "EVENTIA réunit des équipes préparées, briefées et engagées autour d’une même exigence : faire de chaque événement une expérience professionnelle, élégante et mémorable.",
  quote: "L’accueil est le premier reflet de votre image.",
  leader: {
    name: "Noura Njikam",
    role: "PDG — EVENTIA",
    titles: "Miss Cameroun 2024 · Miss World Cameroun 2026",
  },
  agency:
    "EVENTIA est une agence spécialisée dans l’accueil, la représentation, l’animation et l’accompagnement événementiel. Elle met à disposition des équipes préparées, dynamiques et engagées pour accompagner entreprises, institutions et organisateurs.",
  ambition: "Faire de chaque rencontre avec votre public une expérience qui vous ressemble.",
  crew: "Autour de Noura Njikam, une équipe préparée, briefée et engagée, présente sur le terrain pour représenter votre image.",
} as const;

// Client-approved wording only; do not add criteria the client has not provided.
export const recruitment = {
  title: "Rejoignez l’équipe EVENTIA",
  tagline: "Des profils. Des personnalités. Une même exigence.",
  intro:
    "EVENTIA recherche des profils dynamiques, élégants et professionnels, capables de représenter une marque et d’offrir une expérience irréprochable au public.",
  pageIntro:
    "Nous recherchons des personnalités capables d’incarner l’élégance, le professionnalisme et l’énergie EVENTIA.",
  note: "Les candidatures sont étudiées selon les besoins et les missions.",
  closing: "Votre image commence par les personnes qui vous représentent.",
  previewProfiles: [
    "Hôtesses événementielles",
    "Profils bilingues français / anglais",
    "Profils dynamiques et souriants",
    "Excellente présentation",
    "Très bon relationnel",
  ],
  profiles: [
    "Hôtesses événementielles",
    "Profils bilingues français / anglais",
    "Personnes dynamiques et souriantes",
    "Excellent relationnel",
    "Bonne présentation",
  ],
  criteria: [
    { label: "Taille minimale", value: "1,70 m" },
    { label: "Âge", value: "19–30 ans" },
    { value: "Français / Anglais" },
    { value: "Dynamisme et ponctualité" },
    { value: "Bonne présentation" },
    { value: "Bon relationnel" },
  ],
  documents: ["CV", "Lettre de motivation", "Photo portrait récente", "Photo récente en pied, sans filtre"],
} as const;

export const applicationHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
  "Candidature — EVENTIA",
)}&body=${encodeURIComponent(
  `Bonjour,\n\nJe souhaite rejoindre l’équipe EVENTIA. Vous trouverez ci-joint :\n${recruitment.documents
    .map((document) => `- ${document}`)
    .join("\n")}\n\nCordialement,\n`,
)}`;
