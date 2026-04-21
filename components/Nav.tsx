"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Products", href: "/#products" },
    { label: "Our Story", href: "/our-story" },
    { label: "Where To Find Us", href: "/#where-to-find-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#2C1A0E]/10 ${
        scrolled ? "bg-[#F5F2E8]/95 backdrop-blur-sm shadow-sm" : "bg-[#F5F2E8]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-28 lg:h-32">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Cluster Club"
            width={340}
            height={148}
            className="h-24 lg:h-28 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#2C1A0E] font-medium text-sm tracking-wide hover:text-[#E8771A] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#2C1A0E] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#2C1A0E] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#2C1A0E] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5F2E8] border-t border-[#2C1A0E]/10 px-6 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[#2C1A0E] font-medium text-base border-b border-[#2C1A0E]/10 last:border-0 hover:text-[#E8771A] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
