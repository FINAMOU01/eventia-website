import type { Metadata } from "next";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getSiteText, siteConfig } from "@/lib/site";

export const SITE_URL = "https://eventianj.com";

export type PageKey = "home" | "expertises" | "realisations" | "equipe" | "recrutement" | "contact" | "legal";

const paths: Record<PageKey, string> = {
  home: "/",
  expertises: "/expertises",
  realisations: "/realisations",
  equipe: "/equipe",
  recrutement: "/recrutement",
  contact: "/contact",
  legal: "/mentions-legales",
};

const pageText: Record<Locale, Record<Exclude<PageKey, "home">, { title: string; description?: string }>> = {
  fr: {
    expertises: {
      title: "Expertises",
      description:
        "Accueil & représentation, protocole, organisation événementielle, activation de marques, personnel sur mesure, wedding planning, décoration, restauration et gestion d’image : découvrez les expertises d’EVENTIA BY N.J.",
    },
    realisations: {
      title: "Réalisations",
      description:
        "Des événements. Des visages. Des expériences. EVENTIA en action : Concours régional Littoral & Sud-Ouest 2026 et Finale nationale Miss Cameroun 2026.",
    },
    equipe: {
      title: "L’équipe",
      description:
        "Une vision. Une équipe. Une ambition. Découvrez la vision portée par Noura Njikam et les équipes EVENTIA : préparées, briefées et engagées.",
    },
    recrutement: {
      title: "Recrutement",
      description:
        "Rejoignez l’équipe EVENTIA : hôtesses événementielles, profils bilingues français / anglais. Critères, documents demandés et candidature.",
    },
    contact: {
      title: "Contact",
      description: "Demandez un devis ou contactez l’équipe EVENTIA BY N.J pour votre événement à Yaoundé.",
    },
    legal: { title: "Mentions légales" },
  },
  en: {
    expertises: {
      title: "Expertise",
      description:
        "Reception & representation, protocol, event organisation, brand activation, tailored staff, wedding planning, decoration, catering and image management: discover the expertise of EVENTIA BY N.J.",
    },
    realisations: {
      title: "Our work",
      description:
        "Events. Faces. Experiences. EVENTIA in action: the Littoral & South-West 2026 regional pageant and the Miss Cameroun 2026 national final.",
    },
    equipe: {
      title: "The team",
      description:
        "One vision. One team. One ambition. Discover the vision led by Noura Njikam and the EVENTIA teams: prepared, briefed and committed.",
    },
    recrutement: {
      title: "Careers",
      description:
        "Join the EVENTIA team: event hostesses, bilingual French / English profiles. Criteria, required documents and application.",
    },
    contact: {
      title: "Contact",
      description: "Request a quote or contact the EVENTIA BY N.J team for your event in Yaoundé.",
    },
    legal: { title: "Legal notice" },
  },
};

export function rootMetadata(locale: Locale): Metadata {
  const text = getSiteText(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteConfig.name} — ${text.title}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: text.description,
  };
}

/** Per-page title/description plus the FR/EN alternates search engines use to pair both versions. */
export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const path = paths[page];
  // The home page keeps the layout's default title and description.
  const text = page === "home" ? {} : pageText[locale][page];
  return {
    ...text,
    alternates: {
      canonical: localizeHref(path, locale),
      languages: { fr: path, en: localizeHref(path, "en"), "x-default": path },
    },
    ...(page === "legal" && { robots: { index: false } }),
  };
}
