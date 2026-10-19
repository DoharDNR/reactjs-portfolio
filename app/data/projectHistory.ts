// Mock/sample data for the GitHub Project History timeline.
// Per spec §18: fictional repositories; not real GitHub data.
// Per spec §13: commit history must be derived from commit timestamps, not created_at/updated_at.

export type ProjectHistoryYear = {
  year: number;
  repositories: Array<{
    repository: PortfolioRepository;
    activity: RepositoryYearActivity;
  }>;
};

export type PortfolioRepository = {
  id: string;
  owner: string;
  name: string;
  url: string; // GitHub URL (spec: placeholder https://github.com/ in mockup phase)
  title: string;
  description: string;
  technologies: string[];
  featured?: boolean;
  iconType: "e-commerce" | "task-management" | "blog" | "auth" | "mobile";
  displayOrder?: number;
};

export type RepositoryYearActivity = {
  repositoryId: string;
  year: number;
  commitCount: number; // commits authored by the portfolio owner within the selected year
  firstCommitDate: string; // ISO date string (spec §11.2 prefers author date convention)
  lastCommitDate: string;
};

// Fictional sample data per spec §18 example groups.
export const projectHistoryYears: ProjectHistoryYear[] = [
  {
    year: 2025,
    repositories: [
      {
        repository: {
          id: "repo-ecommerce-platform",
          owner: "example-user",
          name: "ecommerce-platform",
          url: "https://github.com/example-user/ecommerce-platform",
          title: "E-commerce Platform",
          description:
            "A full-stack storefront with product management, shopping cart, and checkout workflows.",
          technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
          featured: true,
          iconType: "e-commerce",
          displayOrder: 1,
        },
        activity: {
          repositoryId: "repo-ecommerce-platform",
          year: 2025,
          commitCount: 12,
          firstCommitDate: "2025-03-15",
          lastCommitDate: "2025-04-28",
        },
      },
      {
        repository: {
          id: "repo-task-management-app",
          owner: "example-user",
          name: "task-management-app",
          url: "https://github.com/example-user/task-management-app",
          title: "Task Management App",
          description:
            "A collaborative workspace for organizing tasks, deadlines, and team progress.",
          technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
          featured: false,
          iconType: "task-management",
          displayOrder: 2,
        },
        activity: {
          repositoryId: "repo-task-management-app",
          year: 2025,
          commitCount: 8,
          firstCommitDate: "2025-01-10",
          lastCommitDate: "2025-04-20",
        },
      },
      {
        repository: {
          id: "repo-blog-platform",
          owner: "example-user",
          name: "blog-platform",
          url: "https://github.com/example-user/blog-platform",
          title: "Blog Platform",
          description:
            "A content management system for publishing articles with Markdown support and tagging.",
          technologies: ["Astro", "TypeScript", "Tailwind CSS", "SQLite"],
          featured: false,
          iconType: "blog",
          displayOrder: 3,
        },
        activity: {
          repositoryId: "repo-blog-platform",
          year: 2025,
          commitCount: 1,
          firstCommitDate: "2025-05-02",
          lastCommitDate: "2025-05-02", // same date — spec §11.2: prefer displaying date once
        },
      },
    ],
  },
  {
    year: 2024,
    repositories: [
      {
        repository: {
          id: "repo-auth-service",
          owner: "example-user",
          name: "auth-service",
          url: "https://github.com/example-user/auth-service",
          title: "Authentication Service",
          description:
            "An OAuth 2.0-compatible identity provider with token rotation and session management.",
          technologies: ["Go", "PostgreSQL", "Redis", "Docker"],
          featured: true,
          iconType: "auth",
          displayOrder: 1,
        },
        activity: {
          repositoryId: "repo-auth-service",
          year: 2024,
          commitCount: 24,
          firstCommitDate: "2024-02-14",
          lastCommitDate: "2024-11-30",
        },
      },
      {
        repository: {
          id: "repo-finance-mobile-app",
          owner: "example-user",
          name: "finance-mobile-app",
          url: "https://github.com/example-user/finance-mobile-app",
          title: "Personal Finance Mobile App",
          description:
            "A cross-platform React Native app for budgeting, expense tracking, and financial insights.",
          technologies: ["React Native", "TypeScript", "Expo", "Supabase"],
          featured: false,
          iconType: "mobile",
          displayOrder: 2,
        },
        activity: {
          repositoryId: "repo-finance-mobile-app",
          year: 2024,
          commitCount: 5,
          firstCommitDate: "2024-06-01",
          lastCommitDate: "2024-06-15",
        },
      },
    ],
  },
];

// Helper: format ISO date string as "Mar 15, 2025" (spec §11.2)
export function formatCommitDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Helper: singular/plural wording (spec §11.1)
export function formatCommitCount(count: number): string {
  return count === 1 ? `1 commit in` : `${count} commits in`;
}
