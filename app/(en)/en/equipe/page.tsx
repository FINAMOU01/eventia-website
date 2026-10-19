import { EquipePage } from "@/components/site/equipe-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("equipe", "en");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <EquipePage locale="en" />
    </main>
  );
}
