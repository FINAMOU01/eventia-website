import type { Metadata } from "next";
import { Contact } from "@/components/site/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Demandez un devis ou contactez l’équipe EVENTIA BY N.J pour votre événement à Yaoundé.",
};

export default function ContactPage() {
  return (
    <main id="contenu" tabIndex={-1} className="pt-(--header-height)">
      <Contact />
    </main>
  );
}
