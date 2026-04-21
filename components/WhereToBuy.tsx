"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WhereToBuy() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // silent fail — still show success
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="where-to-find-us" className="py-24 lg:py-32 bg-[#F5F2E8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#E8771A] text-base font-semibold tracking-[0.3em] uppercase mb-6">
              Stockists
            </p>
            <h2
              className="text-[#2C1A0E] text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none mb-6"
              style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
            >
              Where To
              <br />
              Find Us
            </h2>

            <div className="w-12 h-0.5 bg-[#E8771A] mb-8" />

            <p className="text-[#2C1A0E]/70 text-base lg:text-lg font-light leading-relaxed mb-2">
              We&apos;re working hard behind the scenes.
            </p>
            <p className="text-[#2C1A0E]/50 text-sm leading-relaxed mb-12">
              Big things are coming. Be the first to know when Cluster Club lands near you.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-[#2C1A0E]/5 border border-[#2C1A0E]/20 text-[#2C1A0E] placeholder:text-[#2C1A0E]/30 px-5 py-4 text-sm font-medium outline-none focus:border-[#E8771A] transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2C1A0E] text-white text-sm font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[#E8771A] transition-colors duration-300 disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? "..." : "Notify Me"}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-[#E8771A] flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-[#2C1A0E] font-medium">
                  You&apos;re on the list. We&apos;ll be in touch.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
