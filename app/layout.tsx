import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dlh-plomberie-demo.vercel.app"),
  title: "DLH Plomberie | Plombier à Romainville",
  description: "Recherche de fuite, chauffe-eau, WC, douches, robinetterie, débouchage et réparation de tuyauterie à Romainville.",
  openGraph: {
    title: "DLH Plomberie — Dépannage, service et assistance",
    description: "Plomberie, dépannage, installations sanitaires et eau chaude à Romainville.",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/dlh-plomberie/og-image.jpg", width: 1200, height: 630, alt: "DLH Plomberie à Romainville" }],
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
