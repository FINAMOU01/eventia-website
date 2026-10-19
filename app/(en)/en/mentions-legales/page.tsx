import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("legal", "en");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1} className="pt-(--header-height)">
      <LegalPage locale="en" />
    </main>
  );
}
