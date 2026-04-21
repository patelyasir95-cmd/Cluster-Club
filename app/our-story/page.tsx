"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const milestones = [
  {
    number: "01",
    year: "The Problem",
    title: "The Frustration",
    statement: "Why should balance taste like cardboard?",
    body: "You're standing in the snack aisle. Your options are: eat something virtuous that tastes like cardboard, or eat something delicious and feel guilty. That's not a choice. That's a trap. And it's exactly the frustration that started Cluster Club.",
    accent: "#E8771A",
    side: "left",
    image: "/frustration.jpg",
    caption: "The snack aisle problem.",
  },
  {
    number: "02",
    year: "The Solution",
    title: "The Idea",
    statement: "Chocolate and nuts. Simple. Honest. Real.",
    body: "No bars. No shortcuts. Just real clusters. Made with over 50% premium nuts and proper Belgian chocolate. A snack that looks real, tastes indulgent, and actually satisfies.",
    accent: "#2C1A0E",
    side: "right",
    image: "/img-1176.jpg",
    caption: "The first batch.",
  },
  {
    number: "03",
    year: "2022",
    title: "BBC Good Food Show",
    statement: "Real feedback from strangers who didn't owe us anything.",
    body: "No big team. No boardroom. Just an idea and a stall. People didn't just like it. They got it. Instantly. That was the signal. This wasn't a niche thing.",
    accent: "#E8771A",
    side: "left",
    image: "/bbc-good-food-show.jpg",
    caption: "BBC Good Food Show, 2022.",
  },
  {
    number: "04",
    year: "2023",
    title: "Aldi's Next Big Thing",
    statement: "Over 100,000 units. Under two weeks.",
    body: "From a food show stall to stepping onto Aldi's Next Big Thing. One of six brands, all pitching, all trying to prove their idea actually made sense. We weren't the biggest. Or the most polished. Just a simple product that did what it said it would. And that's what took us from a small stand to shelves across the country. No big build-up. No master plan. Just a small brand, finding its way into people's baskets.",
    accent: "#2C1A0E",
    side: "right",
    image: "/yasir-aldi.jpg",
    caption: "Pitching on Channel 4.",
  },
  {
    number: "05",
    year: "The Hard Part",
    title: "The Reality Check",
    statement: "Pressure that either breaks you or sharpens you.",
    body: "We scaled too fast. Lost our manufacturer. And suddenly, we didn't have a product at scale. The facility we built didn't hold up. The supply chain started to unravel. So we got on planes. Across the UK, Europe, wherever we needed to be, trying to find a way to keep this alive. At that point, we had a choice. Stop or pivot.",
    accent: "#8B4A1C",
    side: "left",
    image: "/kitchen-fixed.jpg",
    caption: "The facility that didn't hold up.",
  },
  {
    number: "06",
    year: "The Reset",
    title: "The Rebuild",
    statement: "Not give up. Reset.",
    body: "So we pivoted. We went out for investment. Got knocked back. Then landed it. The right manufacturing partner. A BRCGS-accredited facility, built properly this time. Less guesswork. More structure. Built to do what we couldn't before, actually meet demand at scale. This wasn't about starting again. It was about rebuilding it the right way.",
    accent: "#E8771A",
    side: "right",
    image: "/partner.png",
    caption: "The right partnership.",
  },
  {
    number: "07",
    year: "Today",
    title: "Where We Are Now",
    statement: "Indulge with intention.",
    body: "Cluster Club today is sharper, clearer, better. Belgian chocolate. Over 50% nuts. Source of fibre. The mission hasn't changed. Give people something that feels like a treat and works like food. Done properly.",
    accent: "#2C1A0E",
    side: "left",
    isFinal: true,
    image: "/indulge.png",
    caption: "The range today.",
  },
];

export default function OurStory() {
  return (
    <>
      <Nav />
      <main className="bg-[#F5F2E8]">

        {/* Hero — clean, no image */}
        <div className="pt-32 lg:pt-36 pb-20 lg:pb-28 px-6 lg:px-12 bg-[#F5F2E8]">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#E8771A] text-base font-semibold tracking-[0.3em] uppercase mb-6">
              The Cluster Story
            </p>
            <h1
              className="text-[#2C1A0E] font-black uppercase leading-none"
              style={{
                fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              This Is
              <br />
              <span className="text-[#E8771A]">Our Story</span>
            </h1>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24 lg:pb-32 relative">

          {/* Centre line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#2C1A0E]/10 hidden lg:block" />

          <div className="space-y-0">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 py-16 lg:py-20 ${
                  milestone.side === "right" ? "" : ""
                }`}
              >
                {/* Centre dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10">
                  <div
                    className="w-5 h-5 rounded-full border-4 border-[#F5F2E8]"
                    style={{ backgroundColor: milestone.accent }}
                  />
                </div>

                {/* Left column */}
                <div className={`${milestone.side === "right" ? "lg:text-right lg:pr-16" : "lg:pl-16 lg:order-2"}`}>
                  {milestone.side === "left" ? (
                    <div className="lg:pl-16">
                      <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-40 text-[#2C1A0E]">
                        {milestone.year}
                      </span>
                      <h2
                        className="text-[#2C1A0E] font-black uppercase leading-none mt-3 mb-4"
                        style={{
                          fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif",
                          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                        }}
                      >
                        {milestone.title}
                      </h2>
                      <p
                        className="font-black uppercase leading-tight mb-4 text-lg md:text-xl"
                        style={{ color: milestone.accent, fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
                      >
                        &ldquo;{milestone.statement}&rdquo;
                      </p>
                      <p className="text-[#2C1A0E]/60 text-sm leading-relaxed font-light max-w-md">
                        {milestone.body}
                      </p>
                      {milestone.isFinal && (
                        <Link
                          href="/#products"
                          className="inline-block mt-8 bg-[#2C1A0E] text-white text-sm font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#E8771A] transition-colors duration-300"
                        >
                          Try The Range
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="lg:text-right lg:pr-16">
                      <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-40 text-[#2C1A0E]">
                        {milestone.year}
                      </span>
                      <h2
                        className="text-[#2C1A0E] font-black uppercase leading-none mt-3 mb-4"
                        style={{
                          fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif",
                          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                        }}
                      >
                        {milestone.title}
                      </h2>
                      <p
                        className="font-black uppercase leading-tight mb-4 text-lg md:text-xl"
                        style={{ color: milestone.accent, fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
                      >
                        &ldquo;{milestone.statement}&rdquo;
                      </p>
                      <p className="text-[#2C1A0E]/60 text-sm leading-relaxed font-light max-w-md lg:ml-auto">
                        {milestone.body}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right column — image or empty spacer */}
                <div className={`hidden lg:flex items-center justify-center ${milestone.side === "left" ? "lg:order-1 lg:justify-end pr-16" : "lg:justify-start pl-16"}`}>
                  {milestone.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="relative"
                      style={{
                        transform: "rotate(-2deg)",
                        filter: "sepia(20%) contrast(1.05) brightness(0.97)",
                      }}
                    >
                      {/* Rustic frame */}
                      <div
                        className="p-4 pb-12 shadow-2xl"
                        style={{
                          backgroundColor: "#f0e6d3",
                          boxShadow: "4px 4px 18px rgba(44,26,14,0.25), inset 0 0 0 1px rgba(44,26,14,0.08)",
                        }}
                      >
                        <div
                          className="overflow-hidden"
                          style={{
                            boxShadow: "inset 0 0 8px rgba(44,26,14,0.15)",
                          }}
                        >
                          <Image
                            src={milestone.image}
                            alt={`Cluster Club — ${milestone.title}`}
                            width={420}
                            height={420}
                            className="object-cover"
                            quality={100}
                          />
                        </div>
                        {/* Caption area like a polaroid */}
                        <p
                          className="text-center text-[#2C1A0E]/50 text-xs mt-3 tracking-widest uppercase"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {milestone.caption || ""}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
