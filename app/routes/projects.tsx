// ===== GitHub Project History — Refactored with Atomic Design =====
import type { Route } from "./+types/projects";
import { useRevalidator } from "react-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "@dazl/color-scheme/react";
import { ProjectHistoryNavbar } from "~/components/layout/ProjectHistoryNavbar";
import { GitHubTimeline } from "~/components/github/GitHubTimeline";
import { cache } from "~/services/cache.server";
import type { ProjectHistoryYear } from "~/data/projectHistory";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects & Contributions - Dohar Siregar" },
    {
      name: "description",
      content: "A year-by-year overview of public repositories, showing project activity and technologies.",
    },
  ];
}

// ─── Server-side data loader ─────────────────────────────────────────────────

export async function loader({}: Route.LoaderArgs) {
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

  if (!GITHUB_USERNAME) {
    return { projectHistory: [], source: "loading" as const };
  }

  // Return cached repository metadata (fetched once when the server starts)
  const cacheKey = `github-history-${GITHUB_USERNAME}`;
  const cachedData = cache.get<ProjectHistoryYear[]>(cacheKey);

  if (cachedData) {
    console.log("Returning cached GitHub data");
    return { projectHistory: cachedData, source: "cache" as const };
  }

  return { projectHistory: [], source: "loading" as const };
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

// ─── Main component ──────────────────────────────────────────────────────────

export default function Projects({ loaderData }: Route.ComponentProps) {
  const [useSpecTheme, setUseSpecTheme] = useState(true);
  const { isLight } = useColorScheme();
  const theme = getTheme(useSpecTheme, isLight);
  const revalidator = useRevalidator();
  const isLoading = loaderData?.source === "loading";

  useEffect(() => {
    if (!isLoading) return;
    const interval = window.setInterval(() => revalidator.revalidate(), 2000);
    return () => window.clearInterval(interval);
  }, [isLoading, revalidator]);

  const projectHistory = loaderData?.projectHistory ?? [];

  if (isLoading) {
    return (
      <main className={`mx-auto min-h-screen w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-16 ${theme.page.bg}`}>
        <div className="animate-pulse space-y-8">
          <div className="space-y-4">
            <div className="h-3 w-32 rounded bg-neutral-6" />
            <div className="h-10 w-80 rounded bg-neutral-6" />
            <div className="h-5 w-full max-w-2xl rounded bg-neutral-4" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-32 rounded-lg bg-neutral-3" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <ProjectHistoryNavbar
        useSpecTheme={useSpecTheme}
        onThemeToggle={() => setUseSpecTheme((v) => !v)}
        theme={theme}
        isLight={isLight}
      />

      <main className={`mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-16 ${theme.page.bg}`}>
        <GitHubTimeline yearGroups={projectHistory} theme={theme} isLight={isLight} />
      </main>
    </>
  );
}
