import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Got a question, a flavour idea, or feedback? Get in touch with the Cluster Club team. We're a small team — you'll hear from a real person.",
  openGraph: {
    title: "Contact | Cluster Club",
    description: "Got a question or flavour idea? Get in touch — you'll hear from a real person.",
    url: "https://clusterclub.co.uk/contact",
  },
  alternates: {
    canonical: "https://clusterclub.co.uk/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
