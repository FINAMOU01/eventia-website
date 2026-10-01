import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { signature, siteConfig } from "@/lib/site";

const channels = [
  { icon: Mail, label: "E-mail", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Phone, label: "Téléphone", value: siteConfig.contact.phoneDisplay, href: siteConfig.contact.phoneHref },
  { icon: MapPin, label: "Adresse", value: siteConfig.contact.address },
] as const;

export function Contact() {
  return (
    <Section id="contact" tone="light" aria-labelledby="contact-titre">
      <Reveal>
        <SectionHeading
          as="h1"
          id="contact-titre"
          title={
            <>
              Parlons de <em>votre événement</em>.
            </>
          }
        />
      </Reveal>

      <div className="site-grid mt-14 gap-y-10 lg:mt-20">
        <Reveal className="col-span-full lg:col-span-5">
          <div className="tone-deep flex h-full flex-col gap-10 rounded-card bg-canvas p-8 text-fg sm:p-10">
            <div>
              <Eyebrow>Contact direct</Eyebrow>
              <p className="mt-5 text-lead text-fg-muted">
                Partagez-nous quelques informations sur votre événement, ou contactez directement l’équipe EVENTIA.
              </p>
            </div>

            <ul className="flex flex-col gap-6">
              {channels.map(({ icon: Icon, label, value, ...channel }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-control border border-line text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-eyebrow text-fg-muted uppercase">{label}</span>
                    {"href" in channel ? (
                      <Link href={channel.href} className="text-body break-all">
                        {value}
                      </Link>
                    ) : (
                      <span className="text-body">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-auto border-t border-line pt-6 text-eyebrow text-accent uppercase">
              {signature.map((word) => `${word}.`).join(" ")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="col-span-full lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
