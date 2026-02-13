import { projects } from "~/data/projects";

interface SuggestedRoute {
  title: string;
  uri: string;
}

interface RouteDescription {
  suggestedRoutes: SuggestedRoute[];
  itemTitle: string;
}

export function getRouteDescription(): RouteDescription {
  return {
    suggestedRoutes: projects.map((project) => ({
      title: project.title,
      uri: `/projects/${project.slug}`,
    })),
    itemTitle: "Project",
  };
}
