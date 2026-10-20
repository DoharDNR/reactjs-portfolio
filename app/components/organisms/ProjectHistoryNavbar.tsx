// ===== Organism: ProjectHistoryNavbar =====
// Page-level navigation bar with back link and theme toggles

import { Link } from "react-router";
import { ArrowLeft, Palette } from "lucide-react";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";

type ProjectHistoryNavbarProps = {
  useSpecTheme: boolean;
  onThemeToggle: () => void;
  theme: {
    navbar: { bg: string; border: string; text: string };
  };
  isLight: boolean;
};

export function ProjectHistoryNavbar({
  useSpecTheme,
  onThemeToggle,
  theme,
  isLight,
}: ProjectHistoryNavbarProps) {
  return (
    <nav className={`sticky top-0 z-10 border-b ${theme.navbar.bg} ${theme.navbar.border}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className={`inline-flex items-center gap-1 text-xs font-medium transition ${
              useSpecTheme
                ? "text-slate-500 hover:text-slate-300"
                : "text-neutral-9 hover:text-neutral-12"
            }`}
            aria-label="Back to home"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Home
          </Link>
          <h2 className={`text-sm font-semibold ${theme.navbar.text}`}>
            GitHub History
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme palette toggle */}
          <button
            type="button"
            onClick={onThemeToggle}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              isLight
                ? "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                : useSpecTheme
                ? "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800"
                : "border-neutral-5 bg-neutral-2 text-neutral-11 hover:bg-neutral-3"
            }`}
            aria-label="Toggle theme palette"
          >
            <Palette size={14} aria-hidden="true" />
            {useSpecTheme ? "Spec" : "Project"}
          </button>

          {/* System light/dark toggle */}
          <ColorSchemeToggle />
        </div>
      </div>
    </nav>
  );
}
