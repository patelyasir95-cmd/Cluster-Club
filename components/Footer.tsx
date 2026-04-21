import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Products", href: "/#products" },
  { label: "Our Story", href: "/our-story" },
  { label: "Where To Find Us", href: "/#where-to-find-us" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1C0A00] py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-white/10">
          {/* Logo + tagline */}
          <div>
            <Image
              src="/logo.png"
              alt="Cluster Club"
              width={280}
              height={120}
              className="h-28 w-auto object-contain mb-6 brightness-0 invert"
            />
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
              Indulge with intention. Belgian chocolate. Premium nuts. Source of fibre.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/30 text-xs font-semibold tracking-[0.3em] uppercase mb-5">Navigate</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-[#E8771A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-white/30 text-xs font-semibold tracking-[0.3em] uppercase mb-5">Follow Us</p>
            <a
              href="https://www.instagram.com/theclusterclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white/60 text-sm hover:text-[#E8771A] transition-colors group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @theclusterclub
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Cluster Club. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Made with Belgian chocolate &amp; a lot of intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
