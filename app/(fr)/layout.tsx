import type { ReactNode } from "react";
import { RootDocument } from "@/components/site/root-document";
import { browserLanguageRedirect } from "@/lib/i18n";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata("fr");

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootDocument
      locale="fr"
      head={
        <head>
          {/* Static string (no user input), run before paint so English visitors never see the French page first. */}
          <script dangerouslySetInnerHTML={{ __html: browserLanguageRedirect }} />
        </head>
      }
    >
      {children}
    </RootDocument>
  );
}
