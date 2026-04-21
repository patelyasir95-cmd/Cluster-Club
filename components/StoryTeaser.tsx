"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function StoryTeaser() {
  return (
    <section className="py-24 lg:py-32 bg-[#2C1A0E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left — chapter label + quote */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#E8771A] text-base font-semibold tracking-[0.3em] uppercase mb-6">
              The Beginning
            </p>
            <blockquote
              className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight"
              style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
            >
              "Most healthy snacks tasted like cardboard."
            </blockquote>
          </motion.div>

          {/* Right — teaser copy + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 h-0.5 bg-[#E8771A] mb-8" />
            <p className="text-white/70 text-base lg:text-lg font-light leading-relaxed max-w-md">
              Cluster Club wasn&apos;t born in a boardroom. It came from a very real frustration with snacks that made you choose between indulging and being healthy. We asked: why not both?
            </p>
            <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-md">
              From a BBC Good Food Show stall to a national Aldi listing, ours is not a straight line. It&apos;s a proper story.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-3 mt-10 text-white font-bold text-sm tracking-[0.15em] uppercase group"
            >
              <span>Read Our Story</span>
              <span className="block w-8 h-px bg-white transition-all duration-300 group-hover:w-16 group-hover:bg-[#E8771A]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
