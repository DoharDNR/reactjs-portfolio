// ===== Example Repository Allowlist =====
// Copy this to app/services/github.server.ts and customize!
//
// This example shows how to manually define repositories that
// will appear on your GitHub History timeline.

import type { ConfigurableRepo } from "./github.server";

export const REPO_ALLOWLIST: ConfigurableRepo[] = [
  // Example 1: Your main portfolio (featured)
  {
    owner: "DoharDNR",
    name: "reactjs-portfolio",
    url: "https://github.com/DoharDNR/reactjs-portfolio",
    title: "React JS Portfolio",
    description:
      "A polished developer portfolio built with React, TypeScript, and Tailwind CSS. " +
      "Includes dark mode, responsive design, and performance optimizations.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "React Router"],
    featured: true,
    iconType: "e-commerce",
    displayOrder: 1,
    // Optional: specify exact email for filtering your commits
    commitAuthorEmail: "doharsiregar10@gmail.com",
  },

  // Example 2: A task management project
  {
    owner: "DoharDNR",
    name: "taskflow-app",
    url: "https://github.com/DoharDNR/taskflow-app",
    title: "TaskFlow App",
    description:
      "A collaborative task management application with real-time updates, team boards, " +
      "and project tracking capabilities.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.IO"],
    featured: false,
    iconType: "task-management",
    displayOrder: 2,
  },

  // Example 3: Your blog platform
  {
    owner: "DoharDNR",
    name: "developer-blog",
    url: "https://github.com/DoharDNR/developer-blog",
    title: "Developer Blog",
    description:
      "A technical blog platform for sharing coding tutorials, project walkthroughs, " +
      "and software engineering insights.",
    technologies: ["Astro", "Markdown", "Tailwind CSS", "Vercel"],
    featured: false,
    iconType: "blog",
    displayOrder: 3,
  },

  // Example 4: Add more repositories as needed
  // {
  //   owner: "DoharDNR",
  //   name: "my-other-project",
  //   url: "https://github.com/DoharDNR/my-other-project",
  //   title: "My Other Project",
  //   description: "Description of the project...",
  //   technologies: ["React", "Node.js", "MongoDB"],
  //   featured: false,
  //   iconType: "e-commerce",
  //   displayOrder: 4,
  // },
];
