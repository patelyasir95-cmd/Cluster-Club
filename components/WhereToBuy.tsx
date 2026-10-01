"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const STOCKISTS = [
  {
    name: "EG On The Move",
    detail: "Forecourt & convenience stores across the UK",
    logo: "/egotm-logo.svg",
    locatorUrl: "https://eg-otm.com/locator",
  },
];

export default function WhereToBuy() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch {
      setError(true);
    }
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

            <ul className="mb-12">
              {STOCKISTS.map((stockist) => (
                <li key={stockist.name}>
                  <a
                    href={stockist.locatorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 sm:gap-6 border border-[#2C1A0E]/15 bg-white px-5 py-5 sm:px-6 hover:border-[#E8771A] transition-colors duration-300"
                  >
                    <Image
                      src={stockist.logo}
                      alt={`${stockist.name} logo`}
                      width={88}
                      height={60}
                      className="w-[72px] sm:w-[88px] h-auto shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[#2C1A0E]/60 text-sm">{stockist.detail}</p>
                      <p className="text-[#E8771A] text-xs font-bold tracking-[0.15em] uppercase mt-3 group-hover:underline">
                        Find your nearest store&nbsp;→
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-[#2C1A0E]/70 text-base lg:text-lg font-light leading-relaxed mb-2">
              More stockists coming soon.
            </p>
            <p className="text-[#2C1A0E]/50 text-sm leading-relaxed mb-8">
              Be the first to know when Cluster Club lands near you.
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
            {!submitted && error && (
              <p role="alert" className="text-[#B3261E] text-sm mt-3">
                Sorry, that didn&apos;t go through. Please try again in a moment.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
