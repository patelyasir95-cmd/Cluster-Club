import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://clusterclub.co.uk"),
  title: {
    default: "Cluster Club | Belgian Chocolate Nut Clusters — Indulge With Intention",
    template: "%s | Cluster Club",
  },
  description: "Cluster Club makes premium Belgian chocolate nut clusters with over 50% walnuts, almonds and hazelnuts. Cocoa Horizons certified. As seen on Aldi's Next Big Thing.",
  keywords: ["chocolate nut clusters", "Belgian chocolate snacks", "healthy chocolate snacks", "nut clusters UK", "Cluster Club", "premium snacks UK"],
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Cluster Club",
    title: "Cluster Club | Belgian Chocolate Nut Clusters",
    description: "Over 50% premium nuts. Rich Belgian chocolate. As seen on Aldi's Next Big Thing. Indulge with intention.",
    images: [{ url: "/layered2.png", width: 1200, height: 630, alt: "Cluster Club — Belgian Chocolate Nut Clusters" }],
    url: "https://clusterclub.co.uk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cluster Club | Belgian Chocolate Nut Clusters",
    description: "Over 50% premium nuts. Rich Belgian chocolate. Indulge with intention.",
    images: ["/layered2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://clusterclub.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
