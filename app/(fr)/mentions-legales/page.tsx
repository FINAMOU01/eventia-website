import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("legal", "fr");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1} className="pt-(--header-height)">
      <LegalPage locale="fr" />
    </main>
  );
}
