import type { Metadata } from "next";
import { EquipePage } from "@/components/site/equipe-page";

export const metadata: Metadata = {
  title: "L’équipe",
  description:
    "Une vision. Une équipe. Une ambition. Découvrez la vision portée par Noura Njikam et les équipes EVENTIA : préparées, briefées et engagées.",
};

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <EquipePage />
    </main>
  );
}
