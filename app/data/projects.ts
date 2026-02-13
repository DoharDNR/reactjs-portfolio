import videobelajar1 from "./../images/videobelajar1.webp";
import videobelajar2 from "./../images/videobelajar2.webp";
import videobelajar3 from "./../images/videobelajar3.webp";
import videobelajar4 from "./../images/videobelajar4.webp";
import videobelajar5 from "./../images/videobelajar5.webp";
import videobelajar6 from "./../images/videobelajar6.webp";
import videobelajar7 from "./../images/videobelajar7.webp";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  images: {
    thumbnail: string;
    gallery: string[];
  };
  challenges: string;
  outcomes: string;
  liveDemo?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "video-belajar-platform",
    title: "Video Belajar Platform",
    summary: "A full-stack e-commerce solution with real-time inventory management and seamless checkout experience.",
    description:
      "Developed a comprehensive online course platform designed to deliver an engaging and seamless learning experience. The platform features intuitive navigation, advanced course search and filtering capabilities, and a streamlined enrollment process. It efficiently manages thousands of learning materials across multiple categories, including video lessons, modules, and resources, while maintaining exceptional performance, scalability, and user experience.",
    category: "Web Development",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["React", "Node.js", "Express", "Mysql", "Firebase", "Tailwind CSS"],
    images: {
      thumbnail: videobelajar1,
      gallery: [videobelajar2, videobelajar3, videobelajar4, videobelajar5, videobelajar6, videobelajar7],
    },
    challenges:
      "The main challenge was optimizing database queries to support real-time access control, course progress tracking, and content delivery for a large number of concurrent users while ensuring data consistency. Additionally, implementing a scalable architecture capable of handling traffic spikes during course launches, live sessions, and promotional campaigns required careful system design, performance optimization, and load testing.",
    outcomes:
      "Successfully launched the platform with 99.9% uptime, processing over 100 transactions in the first month. The intuitive interface resulted in a 40% reduction in cart abandonment rates compared to the previous system.",
    liveDemo: "https://reactjs-videobelajar.vercel.app/",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
