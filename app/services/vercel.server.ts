type VercelProject = {
  id?: string;
  link?: { type?: string; repo?: string };
};

type VercelDeployment = {
  url?: string;
  target?: string | string[];
  state?: string;
};

const VERCEL_API_BASE = "https://api.vercel.com";

async function vercelFetch<T>(path: string, token: string): Promise<T> {
  const teamId = process.env.VERCEL_TEAM_ID;
  const separator = path.includes("?") ? "&" : "?";
  const url = `${VERCEL_API_BASE}${path}${teamId ? `${separator}teamId=${encodeURIComponent(teamId)}` : ""}`;
  console.log(`[Vercel API] GET ${path.split("?")[0]}`);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error(`Vercel API returned ${response.status}`);
  return response.json() as Promise<T>;
}

export async function fetchVercelDeploymentUrls(): Promise<Map<string, string>> {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    console.log("[Vercel] Skipped: VERCEL_TOKEN is not configured");
    return new Map();
  }

  try {
    console.log("[Vercel] Fetching linked projects...");
    const { projects = [] } = await vercelFetch<{ projects?: VercelProject[] }>("/v9/projects?limit=100", token);
    console.log(`[Vercel] Found ${projects.length} project(s)`);
    const deployments = new Map<string, string>();

    for (const project of projects) {
      const repository = project.link?.repo;
      console.log(`[Vercel] Project link: type=${project.link?.type ?? "unknown"} repo=${repository ?? "unknown"}`);
      if (project.link?.type !== "github" || !repository || !project.id) continue;

      const { deployments: productionDeployments = [] } = await vercelFetch<{ deployments?: VercelDeployment[] }>(
        `/v6/deployments?projectId=${encodeURIComponent(project.id)}&target=production&limit=1`,
        token,
      );
      const deployment = productionDeployments.find((item) => item.url && (!item.state || item.state === "READY"));
      if (deployment?.url) {
        const deploymentUrl = `https://${deployment.url}`;
        const repositoryKey = repository.toLowerCase();
        deployments.set(repositoryKey, deploymentUrl);
        deployments.set(repositoryKey.split("/").pop()!, deploymentUrl);
        console.log(`[Vercel] Production deployment found for ${repository}`);
      }
    }

    console.log(`[Vercel] Matched ${deployments.size} production deployment(s)`);
    return deployments;
  } catch (error) {
    console.error("Failed to load Vercel deployment metadata:", error instanceof Error ? error.message : "unknown error");
    return new Map();
  }
}
