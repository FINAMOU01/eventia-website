import type { Metadata } from "next";
import { ContactPage } from "@/components/site/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Demandez un devis ou contactez l’équipe EVENTIA BY N.J pour votre événement à Yaoundé.",
};

export default function Page() {
  return (
    <main id="contenu" tabIndex={-1}>
      <ContactPage />
    </main>
  );
}
