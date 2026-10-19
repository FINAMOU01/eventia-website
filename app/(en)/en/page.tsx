import { HomePage } from "@/components/site/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home", "en");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <HomePage locale="en" />
    </main>
  );
}
