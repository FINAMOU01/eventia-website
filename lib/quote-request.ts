import { siteConfig } from "@/lib/site";

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

const fieldLabels: Record<keyof QuoteRequest, string> = {
  name: "Nom & prénom",
  company: "Société",
  email: "E-mail",
  phone: "Téléphone",
  date: "Date",
  location: "Lieu",
  eventType: "Type d’événement",
  need: "Besoin",
};

/** How the request left the site; "mail-client" means the visitor still has to send the pre-filled e-mail. */
export type QuoteDelivery = "mail-client";

/**
 * Single integration point for quote requests. No backend is configured yet, so this opens the visitor's
 * e-mail client with a pre-filled message. Replace the body with a real call (API route, form service…) later.
 */
export async function submitQuoteRequest(request: QuoteRequest): Promise<QuoteDelivery> {
  const summary = (Object.keys(fieldLabels) as (keyof QuoteRequest)[])
    .filter((key) => request[key].trim() !== "")
    .map((key) => `${fieldLabels[key]} : ${request[key].trim()}`)
    .join("\n");

  const subject = `Demande de devis${request.eventType.trim() ? ` — ${request.eventType.trim()}` : ""}`;
  const body = `Bonjour,\n\nJe souhaite obtenir un devis pour mon événement.\n\n${summary}\n`;

  window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "mail-client";
}
