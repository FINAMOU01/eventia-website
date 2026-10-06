import { Contact } from "@/components/site/contact";
import { Equipe } from "@/components/site/equipe";
import { Expertise } from "@/components/site/expertise";
import { Hero } from "@/components/site/hero";
import { Realisations } from "@/components/site/realisations";
import { Recrutement } from "@/components/site/recrutement";

export default function Home() {
  return (
    <main id="contenu" tabIndex={-1}>
      <Hero />
      <Expertise />
      <Realisations />
      <Equipe />
      <Recrutement />
      <Contact />
    </main>
  );
}
