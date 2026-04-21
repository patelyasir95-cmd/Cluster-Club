"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  {
    name: "Milk Chocolate Nut Clusters",
    short: "Milk Chocolate",
    image: "/pouch-milk.png",
    bg: "#8B4A1C",
    textColor: "#FFFFFF",
    nuts: "Walnuts, Almonds & Hazelnuts",
  },
  {
    name: "White Chocolate & Cranberry Nut Clusters",
    short: "White Choc & Cranberry",
    image: "/pouch-white.png",
    bg: "#D41B1B",
    textColor: "#FFFFFF",
    nuts: "Walnuts, Almonds & Hazelnuts",
  },
  {
    name: "Orange Milk Chocolate Nut Clusters",
    short: "Orange Milk Chocolate",
    image: "/pouch-orange.png",
    bg: "#E8771A",
    textColor: "#FFFFFF",
    nuts: "Walnuts, Almonds & Hazelnuts",
  },
];

export default function ProductGrid() {
  return (
    <section id="products" className="py-24 lg:py-32 bg-[#F5F2E8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-[#E8771A] text-base font-semibold tracking-[0.3em] uppercase mb-4">The Range</p>
          <h2
            className="text-[#2C1A0E] text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none"
            style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
          >
            Pick Your Flavour
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden"
              style={{ backgroundColor: product.bg }}
            >
              {/* Product image */}
              <div className="relative h-80 lg:h-96 flex items-center justify-center px-8 pt-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={350}
                  className="object-contain h-full w-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product info */}
              <div className="px-6 pb-8 pt-4 text-center">
                <h3
                  className="text-white text-xl font-black uppercase leading-tight"
                  style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
                >
                  {product.short}
                </h3>
                <p className="text-white/60 text-xs font-medium tracking-widest uppercase mt-2">
                  {product.nuts}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credentials banner */}
      <div className="bg-[#2C1A0E] mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

            {/* Cocoa Horizons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="flex items-center gap-5 py-8 md:py-0 md:px-10 first:pl-0 last:pr-0"
            >
              <a href="https://www.cocoahorizons.org" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <Image
                  src="/cocoa-horizons-logo-white.png"
                  alt="Cocoa Horizons Certified"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </a>
              <div>
                <p className="text-white font-bold text-sm uppercase tracking-wide leading-tight"
                  style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}>
                  Cocoa Horizons Certified
                </p>
                <a href="https://www.cocoahorizons.org" target="_blank" rel="noopener noreferrer"
                  className="text-white/30 text-xs hover:text-[#E8771A] transition-colors mt-0.5 block">
                  cocoahorizons.org
                </a>
              </div>
            </motion.div>

            {/* BRCGS */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-5 py-8 md:py-0 md:px-10"
            >
              <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-xs tracking-tight">BRCGS</span>
              </div>
              <p className="text-white font-bold text-sm uppercase tracking-wide"
                style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}>
                BRCGS Accredited
              </p>
            </motion.div>

            {/* Sustainable Packaging */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-5 py-8 md:py-0 md:px-10"
            >
              <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center text-2xl text-white flex-shrink-0">
                ♻
              </div>
              <p className="text-white font-bold text-sm uppercase tracking-wide"
                style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}>
                Sustainable Packaging
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
