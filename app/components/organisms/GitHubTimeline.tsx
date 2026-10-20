// ===== Organism: GitHubTimeline =====
// Year-based timeline displaying repository history

import { TimelineDot } from "~/components/atoms/TimelineDot";
import { YearMarker } from "~/components/molecules/YearMarker";
import { RepositoryCard } from "~/components/molecules/RepositoryCard";
import type { ProjectHistoryYear } from "~/data/projectHistory";

type ThemeColors = {
  heading: string;
  body: string;
  card: { bg: string; border: string; borderHover: string };
  badge: { bg: string; border: string; text: string };
  tech: { bg: string; text: string };
  meta: { text: string; border: string; mutedText: string };
  link: { text: string; textHover: string };
  timeline: { dot: string; dotRing: string; line: string };
  eyebrow: string;
  headingAccent: string;
  footer: { border: string; text: string };
};

type GitHubTimelineProps = {
  yearGroups: ProjectHistoryYear[];
  theme: ThemeColors;
  isLight: boolean;
};

export function GitHubTimeline({ yearGroups, theme, isLight }: GitHubTimelineProps) {
  return (
    <>
      {/* ===== Page introduction ===== */}
      <div className="mb-12 max-w-3xl">
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${theme.eyebrow}`}>
          MY GITHUB JOURNEY
        </p>
        <h1 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${theme.heading}`}>
          Projects & <span className={theme.headingAccent}>Contributions</span>
        </h1>
        <p className={`mt-4 max-w-2xl text-sm leading-6 sm:text-base ${theme.body}`}>
          A year-by-year overview of public repositories, showing creation dates and latest pushes.
        </p>
      </div>

      {/* ===== Timeline ===== */}
      <div className="space-y-12">
        {yearGroups.map((yearGroup, yearIndex) => {
          const repoCount = yearGroup.repositories.length;
          const isNewestYear = yearIndex === 0;
          const isLastYear = yearIndex === yearGroups.length - 1;

          return (
            <section key={yearGroup.year} className="relative">
              {/* Two-column grid: year marker | cards */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8">
                {/* ===== Year marker column ===== */}
                <div className="relative h-full">
                  {/* Desktop: dot + connector */}
                  <div className="relative hidden h-full md:block">
                    {/* Timeline dot + year heading */}
                    <div className="relative flex items-center">
                      <TimelineDot
                        isAccent={isNewestYear}
                        isLight={isLight}
                        accentDot={theme.timeline.dot}
                        accentRing={theme.timeline.dotRing}
                      />
                      <YearMarker
                        year={yearGroup.year}
                        repoCount={repoCount}
                        headingColor={theme.heading}
                        bodyColor={theme.body}
                      />
                    </div>

                    {/* Connector line */}
                    <div
                      className={`absolute left-[5px] top-7 bottom-0 w-px ${theme.timeline.line}`}
                      style={{ height: "calc(100% + 1rem)" }}
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
                      <RepositoryCard
                        key={entry.repository.id}
                        repository={entry.repository}
                        activity={entry.activity}
                        theme={theme}
                        isLight={isLight}
                      />
                    ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ===== Footer ===== */}
      <footer className={`mt-16 border-t pt-6 ${theme.footer.border}`}>
        <p className={`text-xs ${theme.footer.text}`}>
          Repository metadata is loaded from GitHub.
        </p>
      </footer>
    </>
  );
}
