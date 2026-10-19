import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm, QuoteFormLink } from "@/components/site/contact-form";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getSiteText, siteConfig, whatsappHref } from "@/lib/site";

const copy = {
  fr: {
    intro:
      "Vous préparez un événement, une activation de marque ou recherchez du personnel événementiel ? Parlons de votre projet.",
    email: "E-mail",
    phone: "Téléphone",
    location: "Localisation",
    whatsapp: "Échanger sur WhatsApp",
    writeEmail: "Écrire un e-mail",
    title: (
      <>
        Parlons de <em className="text-accent italic">votre événement</em>.
      </>
    ),
  },
  en: {
    intro:
      "Planning an event, a brand activation or looking for event staff? Let’s talk about your project.",
    email: "E-mail",
    phone: "Phone",
    location: "Location",
    whatsapp: "Chat on WhatsApp",
    writeEmail: "Send an e-mail",
    title: (
      <>
        Let’s talk about <em className="text-accent italic">your event</em>.
      </>
    ),
  },
} satisfies Record<Locale, Record<string, ReactNode>>;

export function contactTitle(locale: Locale) {
  return copy[locale].title;
}

export function ContactDetails({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const channels = [
    { icon: Mail, label: t.email, value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: Phone, label: t.phone, value: siteConfig.contact.phoneDisplay, href: siteConfig.contact.phoneHref },
    { icon: MapPin, label: t.location, value: siteConfig.contact.address },
  ];

  return (
    <ul className="flex flex-col border-t border-line">
      {channels.map(({ icon: Icon, label, value, href }) => {
        const content = (
          <>
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-accent transition-colors group-hover/channel:border-accent">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-eyebrow font-medium tracking-[0.14em] text-fg-muted uppercase">{label}</span>
              <span className="text-lead text-fg [overflow-wrap:anywhere] transition-colors group-hover/channel:text-accent">
                {value}
              </span>
            </span>
          </>
        );
        return (
          <li key={label} className="border-b border-line">
            {href ? (
              <a href={href} className="group/channel flex items-center gap-4 py-5">
                {content}
              </a>
            ) : (
              <div className="flex items-center gap-4 py-5">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function ContactActions({ locale, withQuote = false }: { locale: Locale; withQuote?: boolean }) {
  const t = copy[locale];
  const text = getSiteText(locale);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      {withQuote && <QuoteFormLink className="w-full sm:w-auto">{text.primaryCta}</QuoteFormLink>}
      <Link
        href={whatsappHref(text.whatsappContact)}
        target="_blank"
        appearance="secondary"
        size="lg"
        icon={<WhatsAppIcon />}
        className="w-full sm:w-auto"
      >
        {t.whatsapp}
      </Link>
      <Link href={`mailto:${siteConfig.contact.email}`} appearance="text" className="justify-center sm:justify-start">
        {t.writeEmail}
      </Link>
    </div>
  );
}

/** Two-column block: contact details on the left, quote form on the right. */
export function ContactBlock({ aside, locale }: { aside: ReactNode; locale: Locale }) {
  return (
    <div className="site-grid gap-y-14">
      <Reveal className="col-span-full lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-5 lg:self-start">
        {aside}
      </Reveal>
      <Reveal delay={0.1} className="col-span-full lg:col-span-7 xl:col-span-6 xl:col-start-7">
        <ContactForm locale={locale} />
      </Reveal>
    </div>
  );
}

/** Homepage closing section: a short invitation leading to /contact. */
export function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <Section id="contact" tone="light" aria-labelledby="contact-titre">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center py-6 text-center lg:py-10">
        <Eyebrow>Contact</Eyebrow>
        <h2
          id="contact-titre"
          className="mt-6 font-display text-[clamp(2.25rem,1.5rem+2.8vw,4rem)] leading-[1.06] tracking-[-0.015em] text-fg"
        >
          {t.title}
        </h2>
        <p className="mt-6 max-w-xl text-lead text-fg-muted">{t.intro}</p>
        <Link
          href={localizeHref(siteConfig.primaryCtaHref, locale)}
          appearance="primary"
          size="lg"
          icon={<ArrowRight />}
          className="mt-10 w-full sm:w-auto"
        >
          {getSiteText(locale).primaryCta}
        </Link>
      </Reveal>
    </Section>
  );
}
