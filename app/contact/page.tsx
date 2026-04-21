"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Nav />
      <main className="pt-16 lg:pt-20 min-h-screen bg-[#F5F2E8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left — headline */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-[#E8771A] text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                  Get In Touch
                </p>
                <h1
                  className="text-[#2C1A0E] text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none"
                  style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
                >
                  Say
                  <br />
                  Hello
                </h1>
                <div className="w-8 h-0.5 bg-[#E8771A] my-8" />
                <p className="text-[#2C1A0E]/70 text-base font-light leading-relaxed">
                  Got a question? A wild flavour idea? Not happy with something? Whatever it is, we&apos;re listening.
                </p>
                <p className="text-[#2C1A0E]/50 text-sm mt-4 leading-relaxed">
                  We&apos;re a small team. You&apos;ll hear from a real person.
                </p>
              </motion.div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              {!submitted ? (
                <motion.form
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-[#2C1A0E] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] placeholder:text-[#2C1A0E]/30 px-5 py-4 text-sm font-medium outline-none focus:border-[#E8771A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2C1A0E] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] placeholder:text-[#2C1A0E]/30 px-5 py-4 text-sm font-medium outline-none focus:border-[#E8771A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2C1A0E] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us what's on your mind..."
                      className="w-full bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] placeholder:text-[#2C1A0E]/30 px-5 py-4 text-sm font-medium outline-none focus:border-[#E8771A] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2C1A0E] text-white text-sm font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#E8771A] transition-colors duration-300 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start justify-center h-full py-12"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E8771A] flex items-center justify-center text-white text-xl mb-6">
                    ✓
                  </div>
                  <h2
                    className="text-[#2C1A0E] text-3xl font-black uppercase mb-4"
                    style={{ fontFamily: "'Fredoka One', 'Space Grotesk', sans-serif" }}
                  >
                    Message sent.
                  </h2>
                  <p className="text-[#2C1A0E]/60 text-base font-light">
                    Thanks for getting in touch. We&apos;ll get back to you shortly.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
