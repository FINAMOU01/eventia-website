import { RecrutementPage } from "@/components/site/recrutement-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("recrutement", "fr");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <RecrutementPage locale="fr" />
    </main>
  );
}
