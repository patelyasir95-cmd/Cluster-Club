import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import UspTicker from "@/components/UspTicker";
import ProductGrid from "@/components/ProductGrid";
import AldiWin from "@/components/AldiWin";
import WhereToBuy from "@/components/WhereToBuy";
import FAQ from "@/components/FAQ";
import SocialFeed from "@/components/SocialFeed";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://clusterclub.co.uk/#organization",
      name: "Cluster Club",
      url: "https://clusterclub.co.uk",
      logo: "https://clusterclub.co.uk/logo.png",
      sameAs: ["https://www.instagram.com/theclusterclub"],
      description: "Cluster Club makes premium Belgian chocolate nut clusters with over 50% walnuts, almonds and hazelnuts. Cocoa Horizons certified. As seen on Aldi's Next Big Thing.",
    },
    {
      "@type": "WebSite",
      "@id": "https://clusterclub.co.uk/#website",
      url: "https://clusterclub.co.uk",
      name: "Cluster Club",
      publisher: { "@id": "https://clusterclub.co.uk/#organization" },
    },
    {
      "@type": "Product",
      name: "Milk Chocolate Nut Clusters",
      brand: { "@id": "https://clusterclub.co.uk/#organization" },
      description: "Belgian milk chocolate nut clusters with walnuts, almonds and hazelnuts. Over 50% nuts. Source of fibre.",
      image: "https://clusterclub.co.uk/pouch-milk.png",
      url: "https://clusterclub.co.uk/#products",
    },
    {
      "@type": "Product",
      name: "White Chocolate & Cranberry Nut Clusters",
      brand: { "@id": "https://clusterclub.co.uk/#organization" },
      description: "Belgian white chocolate and cranberry nut clusters with walnuts, almonds and hazelnuts. Over 50% nuts. Source of fibre.",
      image: "https://clusterclub.co.uk/pouch-white.png",
      url: "https://clusterclub.co.uk/#products",
    },
    {
      "@type": "Product",
      name: "Orange Milk Chocolate Nut Clusters",
      brand: { "@id": "https://clusterclub.co.uk/#organization" },
      description: "Belgian orange milk chocolate nut clusters with walnuts, almonds and hazelnuts. Over 50% nuts. Source of fibre.",
      image: "https://clusterclub.co.uk/pouch-orange.png",
      url: "https://clusterclub.co.uk/#products",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <UspTicker />
        <ProductGrid />
        <AldiWin />
        <WhereToBuy />
        <section id="faq">
          <FAQ />
        </section>
        <SocialFeed />
      </main>
      <Footer />
    </>
  );
}
