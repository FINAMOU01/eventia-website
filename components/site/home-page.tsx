import { Contact } from "@/components/site/contact";
import { Equipe } from "@/components/site/equipe";
import { Expertise } from "@/components/site/expertise";
import { Hero } from "@/components/site/hero";
import { Realisations } from "@/components/site/realisations";
import { Recrutement } from "@/components/site/recrutement";
import type { Locale } from "@/lib/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Expertise locale={locale} />
      <Realisations locale={locale} />
      <Equipe locale={locale} />
      <Recrutement locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
