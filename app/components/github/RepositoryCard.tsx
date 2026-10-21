// ===== RepositoryCard =====
// A card displaying repository information with metadata

import { Calendar, ExternalLink } from "lucide-react";
import { ProjectIcon } from "./ProjectIcon";
import { TechBadge } from "./TechBadge";
import { FeaturedBadge } from "./FeaturedBadge";
import type { PortfolioRepository, RepositoryYearActivity } from "~/data/projectHistory";

type ThemeColors = {
  heading: string;
  body: string;
  card: { bg: string; border: string; borderHover: string };
  badge: { bg: string; border: string; text: string };
  tech: { bg: string; text: string };
  meta: { text: string; border: string; mutedText: string };
  link: { text: string; textHover: string };
};

type RepositoryCardProps = {
  repository: PortfolioRepository;
  activity: RepositoryYearActivity;
  theme: ThemeColors;
  isLight: boolean;
};

export function RepositoryCard({ repository, activity, theme, isLight }: RepositoryCardProps) {
  return (
    <article
      className={`rounded-2xl border p-5 transition sm:p-6 ${theme.card.bg} ${theme.card.border} ${theme.card.borderHover}`}
    >
      {/* Card internal layout (spec §10) */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        {/* ===== Left region: icon + info ===== */}
        <div className="flex min-w-0 gap-4">
          <ProjectIcon type={repository.iconType} isLight={isLight} />

          <div className="flex flex-col">
            {/* Title + featured badge */}
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-semibold ${theme.heading}`}>
                {repository.title}
              </h3>
              {repository.featured && (
                <FeaturedBadge
                  bgColor={theme.badge.bg}
                  borderColor={theme.badge.border}
                  textColor={theme.badge.text}
                />
              )}
            </div>

            {/* Description */}
            <p className={`mt-1 max-w-2xl text-sm leading-6 ${theme.body}`}>
              {repository.description}
            </p>

            {/* Technology badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              {repository.technologies.map((tech) => (
                <TechBadge
                  key={tech}
                  tech={tech}
                  bgColor={theme.tech.bg}
                  textColor={theme.tech.text}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===== Right region: metadata ===== */}
        <div
          className={`flex shrink-0 flex-col gap-3 border-t pt-4 text-sm lg:min-w-56 lg:border-0 lg:pt-1 ${theme.meta.border} ${theme.meta.text}`}
        >
          {/* Latest push date */}
          <div className="flex items-center gap-2">
            <Calendar size={14} aria-hidden="true" />
            <span>
              Pushed {new Date(activity.pushedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2">
            <Calendar size={14} aria-hidden="true" />
            <span>
              {new Date(activity.firstCommitDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {activity.firstCommitDate !== activity.lastCommitDate && (
                <>
                  {" → "}
                  <span className={theme.meta.mutedText}>
                    {new Date(activity.lastCommitDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </span>
          </div>

          {/* Repository link */}
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex w-fit items-center gap-1 text-xs font-medium transition ${theme.link.text} ${theme.link.textHover}`}
          >
            View repository <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
