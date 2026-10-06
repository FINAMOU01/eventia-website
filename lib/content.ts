import type { LightboxVideo } from "@/components/ui/video-lightbox";
import type { MediaSlotId } from "@/lib/media";
import { siteConfig } from "@/lib/site";

// Expertise titles/descriptions and method steps are the client's exact wording.

export type Expertise = {
  id: string;
  number: string;
  title: string;
  description: string;
  /** "coeur": historical core offer (01–05); "elargie": offer extensions (06–09). */
  group: "coeur" | "elargie";
  slot: MediaSlotId;
};

export const expertises: Expertise[] = [
  {
    id: "accueil-representation",
    number: "01",
    title: "Accueil & représentation",
    description: "Premier contact, première impression\u00a0: valoriser votre image auprès de vos publics.",
    group: "coeur",
    slot: "expertise-accueil",
  },
  {
    id: "protocole-accompagnement",
    number: "02",
    title: "Protocole & accompagnement",
    description: "Accueillir et accompagner vos invités avec attention et professionnalisme.",
    group: "coeur",
    slot: "expertise-protocole",
  },
  {
    id: "organisation-evenementielle",
    number: "03",
    title: "Organisation événementielle",
    description: "Des équipes mobilisées pour contribuer au bon déroulement de vos événements.",
    group: "coeur",
    slot: "expertise-organisation",
  },
  {
    id: "activation-produits-marques",
    number: "04",
    title: "Activation de produits & de marques",
    description: "Créer une interaction forte entre votre marque, vos produits et votre public.",
    group: "coeur",
    slot: "expertise-activation",
  },
  {
    id: "personnel-sur-mesure",
    number: "05",
    title: "Personnel événementiel sur mesure",
    description: "Des équipes adaptées à vos besoins, à votre événement et à votre image.",
    group: "coeur",
    slot: "expertise-personnel",
  },
  {
    id: "wedding-planning",
    number: "06",
    title: "Wedding Planning",
    description: "Imaginer et orchestrer des célébrations qui vous ressemblent.",
    group: "elargie",
    slot: "expertise-wedding",
  },
  {
    id: "decoration-evenementielle",
    number: "07",
    title: "Décoration événementielle",
    description: "Créer des univers élégants, cohérents et mémorables.",
    group: "elargie",
    slot: "expertise-decoration",
  },
  {
    id: "restauration-evenementielle",
    number: "08",
    title: "Restauration événementielle",
    description: "Proposer une expérience culinaire adaptée à chaque occasion.",
    group: "elargie",
    slot: "expertise-restauration",
  },
  {
    id: "gestion-image",
    number: "09",
    title: "Gestion d’image",
    description: "Soigner votre présence, votre image et celle de votre événement.",
    group: "elargie",
    slot: "expertise-image",
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
  /** Lead visual, side visual, then up to two optional visuals below. */
  slots: [MediaSlotId, MediaSlotId, MediaSlotId?, MediaSlotId?];
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
    slots: ["realisation-miss-main", "realisation-miss-side", "realisation-miss-detail", "realisation-miss-extra"],
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
