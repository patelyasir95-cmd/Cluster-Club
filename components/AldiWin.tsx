"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AldiWin() {
  return (
    <section className="py-24 lg:py-32 bg-[#2C1A0E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-[#E8771A] text-base font-semibold tracking-[0.3em] uppercase mb-4">As Seen On</p>
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none"
            style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
          >
            Aldi&apos;s Next
            <br />
            Big Thing
          </h2>
        </motion.div>

        {/* YouTube embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full aspect-video bg-[#1C0A00] mb-16"
        >
          <iframe
            src="https://www.youtube.com/embed/3Ovd2DrBZh8?start=1044"
            title="Cluster Club Belgian chocolate nut clusters featured on Aldi's Next Big Thing — Channel 4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
        <p className="sr-only">
          Cluster Club was featured on Channel 4&apos;s Aldi&apos;s Next Big Thing, selling over 100,000 units in under two weeks. Our Belgian chocolate nut clusters are made with over 50% premium nuts including walnuts, almonds and hazelnuts.
        </p>

      </div>
    </section>
  );
}
