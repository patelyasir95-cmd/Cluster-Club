import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "From a food show stall to Aldi's Next Big Thing. The story of how Cluster Club was built — the hard way. Belgian chocolate nut clusters made with over 50% premium nuts.",
  openGraph: {
    title: "Our Story | Cluster Club",
    description: "From a food show stall to Aldi's Next Big Thing. The real story behind Cluster Club.",
    images: [{ url: "/yasir-aldi.jpg", width: 1200, height: 630, alt: "Cluster Club — Our Story" }],
    url: "https://clusterclub.co.uk/our-story",
  },
  alternates: {
    canonical: "https://clusterclub.co.uk/our-story",
  },
};

export default function OurStoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
