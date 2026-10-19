import type { Content } from "@/lib/content";
import { mailtoHref, siteConfig } from "@/lib/site";

// English version of lib/content.ts: faithful translation of the client-approved French wording.

const documents = ["CV", "Cover letter", "Recent portrait photo", "Recent full-length photo, unfiltered"];

export const contentEn: Content = {
  expertises: [
    {
      id: "accueil-representation",
      number: "01",
      title: "Reception & representation",
      tagline: "Creating a first contact that enhances your image.",
      description: "First contact, first impression: showcasing your image to your audiences.",
      group: "coeur",
      slot: "expertise-accueil",
    },
    {
      id: "protocole-accompagnement",
      number: "02",
      title: "Protocol & guest assistance",
      tagline: "Welcoming and accompanying your guests with care.",
      description: "Welcoming and accompanying your guests with attention and professionalism.",
      group: "coeur",
      slot: "expertise-protocole",
    },
    {
      id: "organisation-evenementielle",
      number: "03",
      title: "Event organisation",
      tagline: "Planning and coordinating your events with precision.",
      description: "Teams mobilised to help your events run smoothly.",
      group: "coeur",
      slot: "expertise-organisation",
    },
    {
      id: "activation-produits-marques",
      number: "04",
      title: "Product & brand activation",
      tagline: "Creating interaction between your brand and your audience.",
      description: "Creating strong interaction between your brand, your products and your audience.",
      group: "coeur",
      slot: "expertise-activation",
    },
    {
      id: "personnel-sur-mesure",
      number: "05",
      title: "Tailored event staff",
      tagline: "Teams adapted to the needs of every event.",
      description: "Teams adapted to your needs, your event and your image.",
      group: "coeur",
      slot: "expertise-personnel",
    },
    {
      id: "wedding-planning",
      number: "06",
      title: "Wedding Planning",
      tagline: "Imagining and orchestrating celebrations that reflect who you are.",
      description: "Imagining and orchestrating celebrations that reflect who you are.",
      group: "elargie",
      slot: "expertise-wedding",
    },
    {
      id: "decoration-evenementielle",
      number: "07",
      title: "Event decoration",
      tagline: "Creating elegant, coherent and memorable settings.",
      description: "Creating elegant, coherent and memorable settings.",
      group: "elargie",
      slot: "expertise-decoration",
    },
    {
      id: "restauration-evenementielle",
      number: "08",
      title: "Event catering",
      tagline: "Offering a culinary experience suited to every occasion.",
      description: "Offering a culinary experience suited to every occasion.",
      group: "elargie",
      slot: "expertise-restauration",
    },
    {
      id: "gestion-image",
      number: "09",
      title: "Image management",
      tagline: "Taking care of your presence, your image and that of your event.",
      description: "Taking care of your presence, your image and that of your event.",
      group: "elargie",
      slot: "expertise-image",
    },
  ],
  method: [
    { verb: "Understand", text: "Identify the needs of your event." },
    { verb: "Assemble", text: "Build a team suited to the assignment." },
    { verb: "Prepare", text: "Briefing and preparation of the teams." },
    { verb: "Support", text: "Be present on site and contribute to the quality of the experience." },
  ],
  realisationsIntro: {
    title: "Events. Faces. Experiences.",
    intro: "EVENTIA in action at events that placed their trust in us.",
    category: "Premium events",
    context:
      "As a partner of COMICA, EVENTIA supported these stages with its teams, contributing to the welcome, the guest assistance and the image of the event.",
  },
  realisations: [
    {
      id: "littoral-sud-ouest-2026",
      number: "01",
      type: "Regional pageant",
      title: "Littoral & South-West 2026",
      slots: ["realisation-littoral-main", "realisation-littoral-detail"],
    },
    {
      id: "miss-cameroun-2026",
      number: "02",
      type: "National final",
      title: "Miss Cameroun 2026",
      slots: ["realisation-miss-main", "realisation-miss-side", "realisation-miss-detail", "realisation-miss-extra"],
    },
  ],
  eventiaSpot: {
    kind: "file",
    src: "/media/hero/hero.mp4",
    orientation: "landscape",
    title: "The EVENTIA film",
  },
  teamValues: ["Elegance", "Professionalism", "Energy", "Commitment"],
  team: {
    headline: ["One vision.", "One team.", "One ambition."],
    summary:
      "EVENTIA brings together prepared, briefed and committed teams around one shared standard: making every event a professional, elegant and memorable experience.",
    quote: "Hospitality is the first reflection of your image.",
    leader: {
      name: "Noura Njikam",
      role: "CEO — EVENTIA",
      titles: "Miss Cameroun 2024 · Miss World Cameroun 2026",
    },
    agency:
      "EVENTIA is an agency specialising in hospitality, representation, event animation and event support. It provides prepared, dynamic and committed teams to support companies, institutions and organisers.",
    ambition: "Making every encounter with your audience an experience that reflects who you are.",
    crew: "Around Noura Njikam, a prepared, briefed and committed team, present on site to represent your image.",
  },
  recruitment: {
    title: "Join the EVENTIA team",
    tagline: "Profiles. Personalities. One shared standard.",
    intro:
      "EVENTIA is looking for dynamic, elegant and professional profiles, able to represent a brand and offer the public a flawless experience.",
    pageIntro: "We are looking for personalities able to embody the elegance, professionalism and energy of EVENTIA.",
    note: "Applications are reviewed according to needs and assignments.",
    closing: "Your image starts with the people who represent you.",
    previewProfiles: [
      "Event hostesses",
      "Bilingual French / English profiles",
      "Dynamic, smiling profiles",
      "Excellent presentation",
      "Very good interpersonal skills",
    ],
    profiles: [
      "Event hostesses",
      "Bilingual French / English profiles",
      "Dynamic, smiling people",
      "Excellent interpersonal skills",
      "Good presentation",
    ],
    criteria: [
      { label: "Minimum height", value: "1.70 m" },
      { label: "Age", value: "19–30 years" },
      { value: "French / English" },
      { value: "Energy and punctuality" },
      { value: "Good presentation" },
      { value: "Good interpersonal skills" },
    ],
    documents,
  },
  applicationHref: mailtoHref(
    "Application — EVENTIA",
    `Hello,\n\nI would like to join the EVENTIA team. Please find attached:\n${documents
      .map((document) => `- ${document}`)
      .join("\n")}\n\nKind regards,\n`,
    siteConfig.contact.recruitmentEmail,
  ),
};
