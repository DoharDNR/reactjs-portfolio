// GitHub API service — automatic public-repository discovery.
import type { PortfolioRepository, RepositoryYearActivity, ProjectHistoryYear } from "~/data/projectHistory";

// GitHub API types
type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
  archived: boolean;
  private: boolean;
};

const GITHUB_API_BASE = "https://api.github.com";

// Fetch all repositories for a user
async function fetchUserRepositories(username: string, token: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 10;

  while (true) {
    const url = `${GITHUB_API_BASE}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`;
    console.log(`[GitHub API] GET ${url}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const batch: GitHubRepo[] = await response.json();
    if (batch.length === 0) break;

    repos.push(...batch);
    if (batch.length < perPage) break; // Last page
    page++;
  }

  return repos;
}

// Map GitHub language to icon type
function mapLanguageToIconType(language: string | null): PortfolioRepository["iconType"] {
  if (!language) return "task-management";

  const lang = language.toLowerCase();
  if (lang.includes("javascript") || lang.includes("typescript") || lang.includes("react")) {
    return "e-commerce";
  }
  if (lang.includes("python") || lang.includes("go")) {
    return "auth";
  }
  if (lang.includes("swift") || lang.includes("kotlin") || lang.includes("dart")) {
    return "mobile";
  }
  if (lang.includes("html") || lang.includes("css")) {
    return "blog";
  }
  return "task-management";
}

// Main function: Fetch and process GitHub data into ProjectYearActivity format
export async function fetchGitHubProjectHistory(
  username: string,
  token: string
): Promise<ProjectHistoryYear[]> {
  const repos = (await fetchUserRepositories(username, token)).filter((repo) => !repo.archived && !repo.private);
  const yearMap = new Map<number, GitHubRepo[]>();

  for (const repo of repos) {
    const year = new Date(repo.created_at).getUTCFullYear();
    if (!yearMap.has(year)) yearMap.set(year, []);
    yearMap.get(year)!.push(repo);
  }

  const historyYears: ProjectHistoryYear[] = [];

  for (const [year, reposInYear] of yearMap.entries()) {
    const repositories = reposInYear.map((repo, index) => {
      const firstCommitDate = repo.created_at.split("T")[0];
      const lastCommitDate = (repo.pushed_at || repo.updated_at).split("T")[0];

      const technologies = repo.language ? [repo.language] : ["Other"];

      const portfolioRepo: PortfolioRepository = {
        id: `repo-${repo.id}`,
        owner: username,
        name: repo.name,
        url: repo.html_url,
        title: repo.name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        description: repo.description || "No description available.",
        technologies,
        featured: repo.stargazers_count > 5,
        iconType: mapLanguageToIconType(repo.language),
        displayOrder: index + 1,
      };

      const activity: RepositoryYearActivity = {
        repositoryId: portfolioRepo.id,
        year,
        pushedDate: lastCommitDate,
        firstCommitDate,
        lastCommitDate,
      };

      return { repository: portfolioRepo, activity };
    });

    historyYears.push({ year, repositories });
  }

  // Sort years descending (newest first)
  return historyYears.sort((a, b) => b.year - a.year);
}
