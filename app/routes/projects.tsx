// ===== GitHub Project History — Complete redesign per github-project-history-spec.md =====
import type { Route } from "./+types/projects";
import { projectHistoryYears } from "~/data/projectHistory";
import { useState } from "react";
import { GitCommit, Calendar, ExternalLink, Palette } from "lucide-react";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";
import { useColorScheme } from "@dazl/color-scheme/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects & Contributions - Dohar Siregar" },
    {
      name: "description",
      content: "A year-by-year overview of repositories I've worked on, showing commit history and technologies.",
    },
  ];
}

// ─── Theme helper ────────────────────────────────────────────────────────────

type ThemeColors = {
  navbar: { bg: string; border: string; text: string };
  page: { bg: string };
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  card: { bg: string; border: string; borderHover: string };
  badge: { bg: string; border: string; text: string };
  tech: { bg: string; text: string };
  meta: { text: string; border: string; mutedText: string };
  link: { text: string; textHover: string };
  footer: { border: string; text: string };
  timeline: { dot: string; dotRing: string; line: string };
};

function getTheme(useSpecTheme: boolean, isLight: boolean): ThemeColors {
  if (useSpecTheme) {
    // Spec theme (light-dark adaptive)
    if (isLight) {
      return {
        navbar: { bg: "bg-white/95 backdrop-blur-sm", border: "border-slate-200", text: "text-slate-900" },
        page: { bg: "bg-slate-50" },
        eyebrow: "text-indigo-600",
        heading: "text-slate-900",
        headingAccent: "text-indigo-600",
        body: "text-slate-600",
        card: { bg: "bg-white", border: "border-slate-200", borderHover: "hover:border-slate-300" },
        badge: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" },
        tech: { bg: "bg-slate-100", text: "text-slate-700" },
        meta: { text: "text-slate-600", border: "border-slate-200", mutedText: "text-slate-500" },
        link: { text: "text-indigo-600", textHover: "hover:text-indigo-700" },
        footer: { border: "border-slate-200", text: "text-slate-500" },
        timeline: { dot: "bg-indigo-500", dotRing: "ring-indigo-500/20", line: "bg-slate-200" },
      };
    } else {
      return {
        navbar: { bg: "bg-slate-900/95 backdrop-blur-sm", border: "border-slate-800", text: "text-white" },
        page: { bg: "bg-[#020617]" },
        eyebrow: "text-indigo-300",
        heading: "text-white",
        headingAccent: "text-indigo-400",
        body: "text-slate-400",
        card: { bg: "bg-slate-900/60", border: "border-slate-800", borderHover: "hover:border-slate-700" },
        badge: { bg: "bg-indigo-400/10", border: "border-indigo-400/20", text: "text-indigo-300" },
        tech: { bg: "bg-slate-800", text: "text-slate-300" },
        meta: { text: "text-slate-400", border: "border-slate-800", mutedText: "text-slate-500" },
        link: { text: "text-indigo-300", textHover: "hover:text-indigo-200" },
        footer: { border: "border-slate-800", text: "text-slate-500" },
        timeline: { dot: "bg-indigo-400", dotRing: "ring-indigo-400/15", line: "bg-slate-800" },
      };
    }
  } else {
    // Project theme (uses CSS variables)
    return {
      navbar: { bg: "bg-neutral-1", border: "border-neutral-7", text: "text-neutral-12" },
      page: { bg: "bg-page" },
      eyebrow: "text-accent-11",
      heading: "text-neutral-12",
      headingAccent: "text-accent-9",
      body: "text-neutral-11",
      card: { bg: "bg-neutral-2", border: "border-neutral-5", borderHover: "hover:border-neutral-6" },
      badge: { bg: "bg-accent-3", border: "border-accent-6", text: "text-accent-11" },
      tech: { bg: "bg-neutral-4", text: "text-neutral-11" },
      meta: { text: "text-neutral-10", border: "border-neutral-5", mutedText: "text-neutral-9" },
      link: { text: "text-accent-11", textHover: "hover:text-accent-9" },
      footer: { border: "border-neutral-6", text: "text-neutral-9" },
      timeline: { dot: "bg-accent-9", dotRing: "ring-accent-9/15", line: "bg-neutral-6" },
    };
  }
}

// ─── Icon helper (spec §9) ───────────────────────────────────────────────────

function ProjectIcon({ type, isLight }: { type: string; isLight: boolean }) {
  const icon = (
    <svg
      className="size-6 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 6v6l4 2" />
    </svg>
  );

  const baseClass = "flex size-12 shrink-0 items-center justify-center rounded-xl";

  // Adjust colors for light/dark
  const lightDark = (light: string, dark: string) => (isLight ? light : dark);

  switch (type) {
    case "e-commerce":
      return <span className={`${baseClass} ${lightDark("bg-indigo-100 text-indigo-700", "bg-indigo-500/15 text-indigo-300")}`}>{icon}</span>;
    case "task-management":
      return <span className={`${baseClass} ${lightDark("bg-emerald-100 text-emerald-700", "bg-emerald-500/15 text-emerald-300")}`}>{icon}</span>;
    case "blog":
      return <span className={`${baseClass} ${lightDark("bg-fuchsia-100 text-fuchsia-700", "bg-fuchsia-500/15 text-fuchsia-300")}`}>{icon}</span>;
    case "auth":
      return <span className={`${baseClass} ${lightDark("bg-sky-100 text-sky-700", "bg-sky-500/15 text-sky-300")}`}>{icon}</span>;
    case "mobile":
      return <span className={`${baseClass} ${lightDark("bg-amber-100 text-amber-700", "bg-amber-500/15 text-amber-300")}`}>{icon}</span>;
    default:
      return <span className={`${baseClass} ${lightDark("bg-slate-100 text-slate-700", "bg-slate-500/15 text-slate-300")}`}>{icon}</span>;
  }
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Projects() {
  const [useSpecTheme, setUseSpecTheme] = useState(true);
  const { isLight } = useColorScheme();
  const theme = getTheme(useSpecTheme, isLight);

  return (
    <>
      {/* ===== Page-level navbar (theme toggles) ===== */}
      <nav className={`sticky top-0 z-10 border-b ${theme.navbar.bg} ${theme.navbar.border}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <h2 className={`text-sm font-semibold ${theme.navbar.text}`}>
              GitHub History
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme palette toggle */}
            <button
              type="button"
              onClick={() => setUseSpecTheme((v) => !v)}
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

      {/* ===== Main content (spec §4) ===== */}
      <main className={`mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-16 ${theme.page.bg}`}>
        {/* ===== Page introduction (spec §5) ===== */}
        <div className="mb-12 max-w-3xl">
          <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${theme.eyebrow}`}>
            MY GITHUB JOURNEY
          </p>
          <h1 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${theme.heading}`}>
            Projects & <span className={theme.headingAccent}>Contributions</span>
          </h1>
          <p className={`mt-4 max-w-2xl text-sm leading-6 sm:text-base ${theme.body}`}>
            A year-by-year overview of repositories I've worked on, showing the first and last
            commit dates within each year.
          </p>
        </div>

        {/* ===== Timeline (spec §6) ===== */}
        <div className="space-y-12">
          {[...projectHistoryYears].reverse().map((yearGroup, yearIndex) => {
            const repoCount = yearGroup.repositories.length;
            const isOldestYear = yearIndex === 0;
            const isLastYear = yearIndex === [...projectHistoryYears].length - 1;

            return (
              <section key={yearGroup.year} className="relative">
                {/* Two-column grid: year marker | cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                  {/* ===== Year marker column (spec §7) ===== */}
                  <div className="relative">
                    {/* Desktop: dot + connector */}
                    <div className="relative hidden md:block">
                      {/* Timeline dot */}
                      <div className="relative flex items-start">
                        <span
                          className={`flex size-3 shrink-0 rounded-full ring-4 ${
                            isOldestYear
                              ? `${theme.timeline.dot} ${theme.timeline.dotRing}`
                              : `${isLight ? "bg-slate-400" : "bg-slate-500"} ring-slate-500/15`
                          }`}
                        />
                        {/* Year heading beside dot */}
                        <div className="ml-5">
                          <h2 className={`text-2xl font-semibold tracking-tight ${theme.heading}`}>
                            {yearGroup.year}
                          </h2>
                          <p className={`mt-1 text-sm ${theme.body}`}>
                            {repoCount === 1 ? "1 repository" : `${repoCount} repositories`}
                          </p>
                        </div>
                      </div>

                      {/* Connector line (extends down from dot) - show on all years */}
                      <div
                        className={`absolute left-[5px] top-6 h-[calc(100%+35rem)] w-px ${theme.timeline.line}`}
                      />
                    </div>

                    {/* Mobile: year heading only */}
                    <div className="md:hidden">
                      <h2 className={`text-2xl font-semibold tracking-tight ${theme.heading}`}>
                        {yearGroup.year}
                      </h2>
                      <p className={`mt-1 text-sm ${theme.body}`}>
                        {repoCount === 1 ? "1 repository" : `${repoCount} repositories`}
                      </p>
                    </div>
                  </div>

                  {/* ===== Repository cards column ===== */}
                  <div className="space-y-4">
                    {yearGroup.repositories
                      .sort(
                        (a, b) =>
                          (a.repository.displayOrder ?? 99) - (b.repository.displayOrder ?? 99)
                      )
                      .map((entry) => (
                        <article
                          key={entry.repository.id}
                          className={`rounded-2xl border p-5 transition sm:p-6 ${theme.card.bg} ${theme.card.border} ${theme.card.borderHover}`}
                        >
                          {/* Card internal layout (spec §10) */}
                          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            {/* ===== Left region: icon + info ===== */}
                            <div className="flex min-w-0 gap-4">
                              <ProjectIcon type={entry.repository.iconType} isLight={isLight} />

                              <div className="flex flex-col">
                                {/* Title + featured badge (spec §10.1, §10.2) */}
                                <div className="flex items-center gap-2">
                                  <h3 className={`text-base font-semibold ${theme.heading}`}>
                                    {entry.repository.title}
                                  </h3>
                                  {entry.repository.featured && (
                                    <span
                                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${theme.badge.bg} ${theme.badge.border} ${theme.badge.text}`}
                                      aria-label="Featured project"
                                    >
                                      Featured
                                    </span>
                                  )}
                                </div>

                                {/* Description (spec §10.3) */}
                                <p className={`mt-1 max-w-2xl text-sm leading-6 ${theme.body}`}>
                                  {entry.repository.description}
                                </p>

                                {/* Technology badges (spec §10.4) */}
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {entry.repository.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className={`rounded-full px-2.5 py-1 text-xs ${theme.tech.bg} ${theme.tech.text}`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* ===== Right region: metadata (spec §11) ===== */}
                            <div
                              className={`flex shrink-0 flex-col gap-3 border-t pt-4 text-sm lg:min-w-56 lg:border-0 lg:pt-1 ${theme.meta.border} ${theme.meta.text}`}
                            >
                              {/* Commit count (spec §11.1) */}
                              <div className="flex items-center gap-2">
                                <GitCommit size={14} aria-hidden="true" />
                                <span>
                                  {entry.activity.commitCount === 1
                                    ? `1 commit in ${entry.activity.year}`
                                    : `${entry.activity.commitCount} commits in ${entry.activity.year}`}
                                </span>
                              </div>

                              {/* Date range (spec §11.2) */}
                              <div className="flex items-center gap-2">
                                <Calendar size={14} aria-hidden="true" />
                                <span>
                                  {new Date(entry.activity.firstCommitDate).toLocaleDateString(
                                    "en-US",
                                    { month: "short", day: "numeric", year: "numeric" }
                                  )}
                                  {entry.activity.firstCommitDate !==
                                    entry.activity.lastCommitDate && (
                                    <>
                                      {" → "}
                                      <span className={theme.meta.mutedText}>
                                        {new Date(entry.activity.lastCommitDate).toLocaleDateString(
                                          "en-US",
                                          { month: "short", day: "numeric", year: "numeric" }
                                        )}
                                      </span>
                                    </>
                                  )}
                                </span>
                              </div>

                              {/* Repository link (spec §11.3) */}
                              <a
                                href={entry.repository.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex w-fit items-center gap-1 text-xs font-medium transition ${theme.link.text} ${theme.link.textHover}`}
                              >
                                View repository <ExternalLink size={12} aria-hidden="true" />
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ===== Footer (spec §15) ===== */}
        <footer className={`mt-16 border-t pt-6 ${theme.footer.border}`}>
          <p className={`text-xs ${theme.footer.text}`}>
            Sample content only. Replace project details, commit dates, counts, technologies, and
            links with verified GitHub data.
          </p>
        </footer>
      </main>
    </>
  );
}
