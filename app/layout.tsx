import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { QuickActions } from "@/components/site/quick-actions";
import { siteConfig } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${montserrat.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <a
          href="#contenu"
          className="sr-only rounded-control bg-cta px-5 py-3 text-button text-cta-fg uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
          <QuickActions />
        </MotionProvider>
      </body>
    </html>
  );
}
