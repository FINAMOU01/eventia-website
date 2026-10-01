import NextLink from "next/link";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { navigation, signature, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="tone-deep bg-ink pb-28 text-fg md:pb-0">
      <Container className="flex flex-col gap-10 border-b border-line py-section-sm lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-3xl font-display text-h2 text-fg">
          {signature.map((word, index) => (
            <span key={word} className={index === 1 ? "text-accent italic" : undefined}>
              {word}.{" "}
            </span>
          ))}
        </p>
      </Container>

      <Container grid className="gap-y-10 py-14">
        <div className="col-span-full flex flex-col items-start gap-5 md:col-span-4 lg:col-span-5">
          <NextLink href="/#accueil" aria-label={`${siteConfig.name} — retour à l’accueil`} className="rounded-media">
            <Logo className="h-16 lg:h-16" />
          </NextLink>
          <p className="max-w-xs text-small text-fg-muted">{siteConfig.title}.</p>
        </div>

        <nav aria-label="Navigation du pied de page" className="col-span-2 md:col-span-2 lg:col-span-3">
          <p className="text-eyebrow text-fg-muted uppercase">Navigation</p>
          <ul className="mt-5 flex flex-col gap-3 text-small">
            {navigation.map(({ id, label, href }) => (
              <li key={id}>
                <NextLink href={href} className="text-fg transition-colors hover:text-accent">
                  {label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-full md:col-span-2 lg:col-span-4">
          <p className="text-eyebrow text-fg-muted uppercase">Contact</p>
          <ul className="mt-5 flex flex-col gap-3 text-small">
            <li>
              <Link href={`mailto:${siteConfig.contact.email}`} className="break-all">
                {siteConfig.contact.email}
              </Link>
            </li>
            <li>
              <Link href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneDisplay}</Link>
            </li>
            <li>
              <Link href={siteConfig.contact.phone2Href}>{siteConfig.contact.phone2Display}</Link>
            </li>
            <li className="text-fg">{siteConfig.contact.address}</li>
          </ul>
        </div>
      </Container>

      <Container className="border-t border-line py-6 text-small text-fg-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
}
