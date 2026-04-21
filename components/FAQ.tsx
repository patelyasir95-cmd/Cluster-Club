"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What makes your Belgian chocolate nut clusters unique?",
    a: "Our clusters contain over 50% premium nuts: walnuts, almonds and hazelnuts, coated in rich Belgian chocolate. That's not a snack pretending to be healthy. That's a snack that actually earns its place.",
  },
  {
    q: "How long is the shelf life of your chocolate nut clusters?",
    a: "Our clusters have a shelf life of one year. Store them in a cool, dry place and reseal the zip-lock pouch after opening to keep them at their best.",
  },
  {
    q: "Are your products suitable for individuals with nut allergies?",
    a: "Unfortunately, no. Our clusters contain a significant amount of nuts and are not suitable for anyone with nut allergies.",
  },
  {
    q: "I have an idea for a new flavour. How do I tell you about it?",
    a: "We love hearing from the people who eat our clusters. Drop us a message on the Contact page and tell us exactly what you're thinking. We're always listening.",
  },
  {
    q: "Are your chocolate nut clusters gluten-free?",
    a: "Our current range is not certified gluten-free. That said, our team is already working on a gluten-free cluster. Watch this space.",
  },
  {
    q: "What is the best way to store the chocolate nut clusters?",
    a: "Reseal the zip-lock pouch and store in a cool, dry place away from direct sunlight. Avoid the fridge. Nobody wants a fridge-cold cluster.",
  },
  {
    q: "Are your products ethically sourced?",
    a: "Yes. Our chocolate is Cocoa Horizons certified, meaning the cocoa is sourced responsibly and farmers are supported fairly.",
  },
  {
    q: "I'm not happy with the product I bought. How do I contact you?",
    a: "That would be our fault, not yours. Head to the Contact page and tell us what went wrong. We'll make it right.",
  },
  {
    q: "Are your chocolate nut clusters suitable for vegetarians or vegans?",
    a: "Our clusters are suitable for vegetarians. They do contain dairy, so they're not suitable for vegans, but we hear you and we're always developing new products.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-[#1C0A00]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2
          className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none mb-12"
          style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
        >
          Cluster Club FAQs
        </h2>
        <div className="divide-y divide-white/10">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                >
                  <span
                    className="text-white font-bold text-base group-hover:text-[#E8771A] transition-colors"
                    style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
                  >
                    {faq.q}
                  </span>
                  <span className="text-white text-xl font-light mt-0.5 flex-shrink-0 transition-transform duration-300" style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-white/60 text-sm leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
