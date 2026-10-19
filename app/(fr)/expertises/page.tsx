import { ExpertisesPage } from "@/components/site/expertises-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("expertises", "fr");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <ExpertisesPage locale="fr" />
    </main>
  );
}
