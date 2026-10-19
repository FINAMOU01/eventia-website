import { RealisationsPage } from "@/components/site/realisations-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("realisations", "en");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <RealisationsPage locale="en" />
    </main>
  );
}
