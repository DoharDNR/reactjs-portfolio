import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";
import { NavLink } from "~/components/ui/NavLink";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [hash, setHash] = useState("");
  const location = useLocation();

  useEffect(() => {
    setHash(window.location.hash);
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHash(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: "About", path: "/about", href: "/#about", id: "about", type: "anchor" },
    { label: "Projects", path: "/projects", to: "/projects", type: "route" },
    { label: "Contact", path: "/contact", href: "/#contact", id: "contact", type: "anchor" },
  ];

  const activeItem = navItems.find(item => {
    if (item.type === "anchor" && hash === `#${item.id}`) return true;
    if (item.type === "anchor" && (typeof window !== "undefined" && window.location.hash === `#${item.id}`)) return true;
    if (item.path === "/projects" && isActive("/projects")) return true;
    if (item.path === "/about" && location.pathname === "/" && hash !== "#contact") return true;
    return false;
  });

  const currentActivePath = hoveredPath || activeItem?.path || null;

  return (
    <nav className="sticky top-0 z-10 bg-neutral-1 border-b border-neutral-7">
      <div className="max-w-360 mx-auto px-6 md:px-12.5 h-16 flex items-center justify-between">
        {/* Brand (left) */}
        <Link to="/" className="flex items-center gap-2">
          <span className="w-5.5 h-5.5 text-accent-9 flex items-center justify-center">◆</span>
          <span className="font-heading text-neutral-12 text-[20px] font-bold">Dohar.</span>
        </Link>

        {/* Nav links (center) — hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center gap-[36px] relative">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              {...(item.type === "route" ? { to: item.to } : { href: item.href })}
              isActive={currentActivePath === item.path}
              isHovered={hoveredPath === item.path}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {item.label}
            </NavLink>
          ))}
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
              {navItems.map((item) => (
                <a
                  key={item.label}
                  {...(item.type === "route" ? { to: item.to } : { href: item.href })}
                  className="text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
