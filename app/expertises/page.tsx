import type { Metadata } from "next";
import { ExpertisesPage } from "@/components/site/expertises-page";

export const metadata: Metadata = {
  title: "Expertises",
  description:
    "Accueil & représentation, protocole, organisation événementielle, activation de marques, personnel sur mesure, wedding planning, décoration, restauration et gestion d’image : découvrez les expertises d’EVENTIA BY N.J.",
};

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <ExpertisesPage />
    </main>
  );
}
