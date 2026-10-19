import { Montserrat, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { QuickActions } from "@/components/site/quick-actions";
import { type Locale } from "@/lib/i18n";
import { getSiteText } from "@/lib/site";
import "@/app/globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

/** Shared <html> shell of the French and English root layouts. */
export function RootDocument({ locale, head, children }: { locale: Locale; head?: ReactNode; children: ReactNode }) {
  return (
    <html lang={locale} className={`${playfair.variable} ${montserrat.variable} antialiased`}>
      {head}
      <body className="min-h-dvh">
        <a
          href="#contenu"
          className="sr-only rounded-control bg-cta px-5 py-3 text-button text-cta-fg uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          {getSiteText(locale).skipLink}
        </a>
        <MotionProvider>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
          <QuickActions locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
