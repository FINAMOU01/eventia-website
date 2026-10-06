export const siteConfig = {
  name: "EVENTIA BY N.J",
  title: "L’excellence de l’accueil au service de votre image",
  description:
    "Hôtesses, personnel événementiel, protocole, organisation événementielle et activation de produits & de marques à Yaoundé.",
  primaryCta: {
    label: "Demander un devis",
    href: "/contact",
  },
  contact: {
    email: "eventiabynouraj@gmail.com",
    phoneDisplay: "+237 6 56 69 72 72",
    phoneHref: "tel:+237656697272",
    phone2Display: "+237 6 75 42 32 65",
    phone2Href: "tel:+237675423265",
    address: "Bastos, Yaoundé",
  },
  whatsapp: {
    number: "237656697272",
    // Neutral until the name of the person answering is confirmed.
    defaultMessage: "Bonjour, je souhaite obtenir des informations concernant les services EVENTIA.",
    contactMessage: "Bonjour, je souhaite échanger avec EVENTIA au sujet d’un événement.",
  },
} as const;

export function whatsappHref(message: string = siteConfig.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const navigation = [
  { id: "accueil", label: "Accueil", href: "/#accueil" },
  { id: "expertise", label: "Expertises", href: "/expertises" },
  { id: "realisations", label: "Réalisations", href: "/realisations" },
  { id: "equipe", label: "L’équipe", href: "/equipe" },
  { id: "recrutement", label: "Recrutement", href: "/recrutement" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];

export const signature = ["Accueillir", "Représenter", "Valoriser"] as const;
