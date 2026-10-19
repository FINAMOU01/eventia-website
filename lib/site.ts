import { localizeHref, type Locale } from "@/lib/i18n";

export const siteConfig = {
  name: "EVENTIA BY N.J",
  primaryCtaHref: "/contact",
  contact: {
    email: "contact@eventianj.com",
    recruitmentEmail: "candidature@eventianj.com",
    phoneDisplay: "+237 6 56 69 72 72",
    phoneHref: "tel:+237656697272",
    phone2Display: "+237 6 75 42 32 65",
    phone2Href: "tel:+237675423265",
    address: "Bastos, Yaoundé",
  },
  whatsappNumber: "237656697272",
} as const;

type SiteText = {
  title: string;
  description: string;
  primaryCta: string;
  /** Neutral until the name of the person answering is confirmed. */
  whatsappDefault: string;
  whatsappContact: string;
  signature: readonly string[];
  backHome: string;
  skipLink: string;
  nav: Record<SectionId, string>;
};

const siteText: Record<Locale, SiteText> = {
  fr: {
    title: "L’excellence de l’accueil au service de votre image",
    description:
      "Hôtesses, personnel événementiel, protocole, organisation événementielle et activation de produits & de marques à Yaoundé.",
    primaryCta: "Demander un devis",
    whatsappDefault: "Bonjour, je souhaite obtenir des informations concernant les services EVENTIA.",
    whatsappContact: "Bonjour, je souhaite échanger avec EVENTIA au sujet d’un événement.",
    signature: ["Accueillir", "Représenter", "Valoriser"],
    backHome: "retour à l’accueil",
    skipLink: "Aller au contenu",
    nav: {
      accueil: "Accueil",
      expertise: "Expertises",
      realisations: "Réalisations",
      equipe: "L’équipe",
      recrutement: "Recrutement",
      contact: "Contact",
    },
  },
  en: {
    title: "Hospitality excellence in service of your image",
    description:
      "Hostesses, event staff, protocol, event organisation and product & brand activation in Yaoundé.",
    primaryCta: "Request a quote",
    whatsappDefault: "Hello, I would like some information about EVENTIA’s services.",
    whatsappContact: "Hello, I would like to talk with EVENTIA about an event.",
    signature: ["Welcome", "Represent", "Elevate"],
    backHome: "back to home",
    skipLink: "Skip to content",
    nav: {
      accueil: "Home",
      expertise: "Expertise",
      realisations: "Our work",
      equipe: "The team",
      recrutement: "Careers",
      contact: "Contact",
    },
  },
};

export function getSiteText(locale: Locale) {
  return siteText[locale];
}

export function whatsappHref(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(subject: string, body: string, to: string = siteConfig.contact.email) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const navigationItems = [
  { id: "accueil", href: "/#accueil" },
  { id: "expertise", href: "/expertises" },
  { id: "realisations", href: "/realisations" },
  { id: "equipe", href: "/equipe" },
  { id: "recrutement", href: "/recrutement" },
  { id: "contact", href: "/contact" },
] as const;

export type SectionId = (typeof navigationItems)[number]["id"];

function buildNavigation(locale: Locale) {
  return navigationItems.map(({ id, href }) => ({ id, href: localizeHref(href, locale), label: siteText[locale].nav[id] }));
}

// Built once so client components get stable references.
const navigationByLocale: Record<Locale, ReturnType<typeof buildNavigation>> = {
  fr: buildNavigation("fr"),
  en: buildNavigation("en"),
};

export function getNavigation(locale: Locale) {
  return navigationByLocale[locale];
}
