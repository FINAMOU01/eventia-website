import type { Locale } from "@/lib/i18n";
import { mailtoHref } from "@/lib/site";

export type QuoteRequest = {
  name: string;
  company: string;
  email: string;
  phone: string;
  date: string;
  location: string;
  eventType: string;
  need: string;
};

const emailText: Record<Locale, { labels: Record<keyof QuoteRequest, string>; subject: string; intro: string }> = {
  fr: {
    labels: {
      name: "Nom & prénom",
      company: "Société",
      email: "E-mail",
      phone: "Téléphone",
      date: "Date",
      location: "Lieu",
      eventType: "Type d’événement",
      need: "Besoin",
    },
    subject: "Demande de devis",
    intro: "Bonjour,\n\nJe souhaite obtenir un devis pour mon événement.",
  },
  en: {
    labels: {
      name: "Full name",
      company: "Company",
      email: "E-mail",
      phone: "Phone",
      date: "Date",
      location: "Venue",
      eventType: "Type of event",
      need: "Requirements",
    },
    subject: "Quote request",
    intro: "Hello,\n\nI would like to request a quote for my event.",
  },
};

/** How the request left the site; "mail-client" means the visitor still has to send the pre-filled e-mail. */
export type QuoteDelivery = "mail-client";

/**
 * Single integration point for quote requests. No backend is configured yet, so this opens the visitor's
 * e-mail client with a pre-filled message. Replace the body with a real call (API route, form service…) later.
 */
export async function submitQuoteRequest(request: QuoteRequest, locale: Locale): Promise<QuoteDelivery> {
  const { labels, subject, intro } = emailText[locale];
  const summary = (Object.keys(labels) as (keyof QuoteRequest)[])
    .filter((key) => request[key].trim() !== "")
    .map((key) => `${labels[key]} : ${request[key].trim()}`)
    .join("\n");

  const eventType = request.eventType.trim();
  window.location.href = mailtoHref(`${subject}${eventType ? ` — ${eventType}` : ""}`, `${intro}\n\n${summary}\n`);
  return "mail-client";
}
