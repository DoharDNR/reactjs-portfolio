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
  url: string;
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
  pushedDate: string;
  firstCommitDate: string;
  lastCommitDate: string;
};
