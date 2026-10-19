import { RealisationsPage } from "@/components/site/realisations-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("realisations", "fr");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <RealisationsPage locale="fr" />
    </main>
  );
}
