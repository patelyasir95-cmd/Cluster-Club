"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    text: "Finally a snack that actually satisfies. I'm not reaching for biscuits after these.",
    author: "Sarah M.",
    stars: 5,
  },
  {
    text: "The orange milk chocolate ones are dangerously good. Don't say I didn't warn you.",
    author: "James K.",
    stars: 5,
  },
  {
    text: "Bought for my partner as a 'healthy' treat. We've now ordered three more bags.",
    author: "Rachel T.",
    stars: 5,
  },
];

export default function SocialFeed() {
  return (
    <section className="py-24 lg:py-32 bg-[#2C1A0E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[#E8771A] text-base font-semibold tracking-[0.3em] uppercase mb-4">Community</p>
            <h2
              className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none"
              style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
            >
              The Club
              <br />
              Speaks
            </h2>
          </div>
          <a
            href="https://www.instagram.com/theclusterclub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white font-bold text-sm tracking-[0.15em] uppercase group"
          >
            <span>@theclusterclub</span>
            <span className="block w-8 h-px bg-white transition-all duration-300 group-hover:w-16 group-hover:bg-[#E8771A]" />
          </a>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: review.stars }).map((_, s) => (
                  <span key={s} className="text-[#E8771A] text-sm">★</span>
                ))}
              </div>
              <p className="text-white/80 text-base font-light leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase">
                {review.author}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="border-t border-white/10 pt-12 text-center">
          <p className="text-white/50 text-sm mb-4">Join the conversation</p>
          <a
            href="https://www.instagram.com/theclusterclub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent border border-white text-white text-sm font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-white hover:text-[#2C1A0E] transition-colors duration-300"
          >
            Follow Us on Instagram
          </a>
          {/* Behold.so embed placeholder */}
          {/* To activate: create account at behold.so, connect @theclusterclub, paste your embed code below */}
          {/* <div id="behold-widget" data-feed-id="YOUR_FEED_ID" /> */}
          {/* <script src="https://w.behold.so/widget.js" type="module" /> */}
        </div>
      </div>
    </section>
  );
}
