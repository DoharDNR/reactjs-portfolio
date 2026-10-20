import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-10 bg-neutral-1 border-b border-neutral-7">
      <div className="max-w-360 mx-auto px-6 md:px-12.5 h-16 flex items-center justify-between">
        {/* Brand (left) */}
        <Link to="/" className="flex items-center gap-2">
          <span className="w-[22px] h-[22px] text-accent-9 flex items-center justify-center">◆</span>
          <span className="font-heading text-neutral-12 text-[20px] font-bold">Dohar.</span>
        </Link>

        {/* Nav links (center) — hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center gap-[36px]">
          <a
            href="/#about"
            onMouseEnter={() => setHoveredPath("/about")}
            onMouseLeave={() => setHoveredPath(null)}
            className={`text-[14px] transition-colors 200ms ease relative focus-visible:outline-none ${
              (location.pathname === "/" && (typeof window === "undefined" || window.location.hash !== "#contact") || hoveredPath === "/about") ? "text-accent-9" : "text-neutral-9 hover:text-accent-9"
            }`}
          >
            About
            {(location.pathname === "/" && (typeof window === "undefined" || window.location.hash !== "#contact") || hoveredPath === "/about") && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-9"
              />
            )}
          </a>
          <Link
            to="/projects"
            onMouseEnter={() => setHoveredPath("/projects")}
            onMouseLeave={() => setHoveredPath(null)}
            className={`text-[14px] transition-colors 200ms ease relative focus-visible:outline-none ${
              (isActive("/projects") || hoveredPath === "/projects") ? "text-accent-9" : "text-neutral-9 hover:text-accent-9"
            }`}
          >
            Projects
            {(isActive("/projects") || hoveredPath === "/projects") && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-9"
              />
            )}
          </Link>
          <a
            href="/#contact"
            onMouseEnter={() => setHoveredPath("/contact")}
            onMouseLeave={() => setHoveredPath(null)}
            className={`text-[14px] transition-colors 200ms ease relative focus-visible:outline-none ${
              (typeof window !== "undefined" && window.location.hash === "#contact") || hoveredPath === "/contact"
                ? "text-accent-9"
                : "text-neutral-9 hover:text-accent-9"
            }`}
          >
            Contact
            {((typeof window !== "undefined" && window.location.hash === "#contact") ||
              hoveredPath === "/contact") && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-9"
              />
            )}
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-neutral-7"
          >
            <div className="max-w-360 mx-auto px-6 md:px-12.5 py-4 flex flex-col gap-3">
              <a
                href="/#about"
                className="text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <Link
                to="/projects"
                className="text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <a
                href="/#contact"
                className="text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}