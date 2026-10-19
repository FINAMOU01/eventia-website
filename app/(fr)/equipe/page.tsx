import { EquipePage } from "@/components/site/equipe-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("equipe", "fr");

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <EquipePage locale="fr" />
    </main>
  );
}
