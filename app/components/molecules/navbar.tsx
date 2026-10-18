// ===== Top Navigation: dark bar with brand, centered links, theme toggle =====
// Uses Tailwind utility classes. Colors via CSS design tokens for dark/light mode.
// Responsive: nav links collapse into hamburger menu below 768px.

import { useState } from "react";
import { Menu } from "lucide-react";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-neutral-1 border-b border-neutral-7">
      <div className="max-w-360 mx-auto px-6 md:px-12.5 h-16 flex items-center justify-between">
        {/* Brand (left) */}
        <a href="#" className="flex items-center gap-2">
          <span className="w-[22px] h-[22px] text-accent-9 flex items-center justify-center">◆</span>
          <span className="font-heading text-neutral-12 text-[20px] font-bold">Dohar.</span>
        </a>

        {/* Nav links (center) — hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center gap-[36px]">
          <a href="#" className="text-[14px] text-neutral-9 transition-colors 200ms ease relative focus-visible:text-accent-9 focus-visible:outline-none">
            Home
          </a>
          <a
            href="#about"
            className="text-[14px] text-accent-9 transition-colors 200ms ease relative focus-visible:outline-none"
          >
            About
            <span className="absolute bottom-[-8px] left-0 w-[38px] h-0.5 bg-accent-9" />
          </a>
          <a href="/projects" className="text-[14px] text-neutral-9 transition-colors 200ms ease relative focus-visible:text-accent-9 focus-visible:outline-none">
            Projects
          </a>
          <a href="#contact" className="text-[14px] text-neutral-9 transition-colors 200ms ease relative focus-visible:text-accent-9 focus-visible:outline-none">
            Contact
          </a>
        </div>

        {/* Hamburger menu (mobile only) */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-[6px] text-neutral-11 hover:bg-neutral-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-9 transition-colors 200ms ease"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Theme toggle (right) */}
        <div className="flex items-center">
          <ColorSchemeToggle />
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden transition-all duration-200 ease overflow-hidden border-t border-neutral-7 ${
          isMobileMenuOpen ? "max-h-[300px] py-4" : "max-h-0"
        }`}
      >
        <div className="max-w-360 mx-auto px-6 md:px-12.5 flex flex-col gap-3">
          <a href="#" className="text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2">
            Home
          </a>
          <a
            href="#about"
            className="text-[14px] text-accent-9 transition-colors 200ms ease py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="/projects"
            className="text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
