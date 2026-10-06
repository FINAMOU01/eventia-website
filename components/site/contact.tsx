import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm, QuoteFormLink } from "@/components/site/contact-form";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { siteConfig, whatsappHref } from "@/lib/site";

export const contactIntro =
  "Vous préparez un événement, une activation de marque ou recherchez du personnel événementiel ? Parlons de votre projet.";

const channels = [
  { icon: Mail, label: "E-mail", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Phone, label: "Téléphone", value: siteConfig.contact.phoneDisplay, href: siteConfig.contact.phoneHref },
  { icon: MapPin, label: "Localisation", value: siteConfig.contact.address },
] as const;

export function ContactDetails() {
  return (
    <ul className="flex flex-col border-t border-line">
      {channels.map(({ icon: Icon, label, value, ...channel }) => {
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
            {"href" in channel ? (
              <a href={channel.href} className="group/channel flex items-center gap-4 py-5">
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

export function ContactActions({ withQuote = false }: { withQuote?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      {withQuote && <QuoteFormLink className="w-full sm:w-auto">{siteConfig.primaryCta.label}</QuoteFormLink>}
      <Link
        href={whatsappHref(siteConfig.whatsapp.contactMessage)}
        target="_blank"
        appearance="secondary"
        size="lg"
        icon={<WhatsAppIcon />}
        className="w-full sm:w-auto"
      >
        Échanger sur WhatsApp
      </Link>
      <Link href={`mailto:${siteConfig.contact.email}`} appearance="text" className="justify-center sm:justify-start">
        Écrire un e-mail
      </Link>
    </div>
  );
}

/** Two-column block: contact details on the left, quote form on the right. */
export function ContactBlock({ aside }: { aside: ReactNode }) {
  return (
    <div className="site-grid gap-y-14">
      <Reveal className="col-span-full lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-5 lg:self-start">
        {aside}
      </Reveal>
      <Reveal delay={0.1} className="col-span-full lg:col-span-7 xl:col-span-6 xl:col-start-7">
        <ContactForm />
      </Reveal>
    </div>
  );
}

/** Homepage closing section: a short invitation leading to /contact. */
export function Contact() {
  return (
    <Section id="contact" tone="light" aria-labelledby="contact-titre">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center py-6 text-center lg:py-10">
        <Eyebrow>Contact</Eyebrow>
        <h2
          id="contact-titre"
          className="mt-6 font-display text-[clamp(2.25rem,1.5rem+2.8vw,4rem)] leading-[1.06] tracking-[-0.015em] text-fg"
        >
          Parlons de <em className="text-accent italic">votre événement</em>.
        </h2>
        <p className="mt-6 max-w-xl text-lead text-fg-muted">{contactIntro}</p>
        <Link
          href={siteConfig.primaryCta.href}
          appearance="primary"
          size="lg"
          icon={<ArrowRight />}
          className="mt-10 w-full sm:w-auto"
        >
          {siteConfig.primaryCta.label}
        </Link>
      </Reveal>
    </Section>
  );
}
