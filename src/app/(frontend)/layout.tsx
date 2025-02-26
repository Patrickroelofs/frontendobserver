import "@/styles/globals.css";
import "@fontsource-variable/literata";
import "@fontsource-variable/literata/opsz.css";
import "@fontsource-variable/literata/opsz-italic.css";
import "@fontsource-variable/literata/wght-italic.css";

import { Footer } from "@/components/footer/footer";
import { Navigation } from "@/components/navigation/navigation";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import React, { type ReactElement, type ReactNode } from "react";

export default function RootLayout({
  children,
}: { children: ReactNode }): ReactElement {
  return (
    <html lang="en" className="bg-ginger font-serif">
      <body>
        <Navigation />
        <main className="border-black border-l-2 border-r-2 container p-0">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Frontend Observer",
  openGraph: {
    title: "Frontend Observer",
    type: "website",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/ico",
        url: "./favicon/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "./favicon/icon.png",
      },
      {
        rel: "icon",
        type: "image/svg",
        url: "./favicon/icon.svg",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        url: "./favicon/apple-icon.png",
      },
    ],
  },

  manifest: "./favicon/manifest.json",
};
