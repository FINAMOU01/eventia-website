import type { Metadata } from "next";
import { RealisationsPage } from "@/components/site/realisations-page";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Des événements. Des visages. Des expériences. EVENTIA en action : Concours régional Littoral & Sud-Ouest 2026 et Finale nationale Miss Cameroun 2026.",
};

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <RealisationsPage />
    </main>
  );
}
