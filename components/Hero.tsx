"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row pt-28 lg:pt-32">
      {/* LEFT — clean background with text (1/3) */}
      <div className="lg:w-1/3 bg-[#F5F2E8] flex items-center px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg"
        >
          {/* Eyebrow */}
          <p className="text-[#E8771A] text-xs font-semibold tracking-[0.3em] uppercase mb-8">
            Belgian Chocolate · Over 50% Nuts
          </p>

          {/* Main headline */}
          <h1
            className="text-[#2C1A0E] text-5xl md:text-6xl xl:text-7xl font-black leading-none tracking-tight uppercase"
            style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
          >
            Indulge
            <br />
            <span className="text-[#E8771A]">with</span>
            <br />
            intention
          </h1>


          {/* Sub claim */}
          <p className="text-[#2C1A0E]/60 text-base font-light leading-relaxed max-w-sm mt-8">
            Chocolate &amp; Nuts. Simply bridging the gap between health and indulgence.
          </p>

          {/* SEO — visually hidden, keyword-rich context for crawlers */}
          <p className="sr-only">
            Cluster Club makes premium Belgian chocolate nut clusters with over 50% walnuts, almonds and hazelnuts. Our chocolate snacks are a source of fibre, Cocoa Horizons certified, and as seen on Aldi&apos;s Next Big Thing on Channel 4. Buy chocolate nut clusters online in the UK.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/our-story"
              className="inline-block bg-[#2C1A0E] text-white text-sm font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#E8771A] transition-colors duration-300"
            >
              Our Story
            </Link>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — product image, dark background (2/3) */}
      <div className="lg:w-2/3 bg-[#1C0A00] relative overflow-hidden min-h-[60vh] lg:min-h-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/layered2.png"
            alt="Cluster Club Belgian chocolate nut clusters — milk chocolate, white chocolate cranberry and orange milk chocolate pouches"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
