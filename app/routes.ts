import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("projects/:slug", "routes/projects.$slug.tsx")] satisfies RouteConfig;
