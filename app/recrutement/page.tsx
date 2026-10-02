import type { Metadata } from "next";
import { RecrutementPage } from "@/components/site/recrutement-page";

export const metadata: Metadata = {
  title: "Recrutement",
  description:
    "Rejoignez l’équipe EVENTIA : hôtesses événementielles, profils bilingues français / anglais. Critères, documents demandés et candidature.",
};

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <RecrutementPage />
    </main>
  );
}
