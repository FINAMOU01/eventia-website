import { HomePage } from "@/components/site/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home", "fr");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <HomePage locale="fr" />
    </main>
  );
}
