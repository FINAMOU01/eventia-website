import { ContactPage } from "@/components/site/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("contact", "fr");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <ContactPage locale="fr" />
    </main>
  );
}
