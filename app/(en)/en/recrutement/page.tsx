import { RecrutementPage } from "@/components/site/recrutement-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("recrutement", "en");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <RecrutementPage locale="en" />
    </main>
  );
}
