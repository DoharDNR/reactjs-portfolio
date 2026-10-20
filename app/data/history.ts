export interface HistoryEntry {
  id: string;
  type: "work" | "education" | "internship";
  dateRange: string;
  dateStart: string;
  title: string;
  metadata: string;
  category: string;
  company: string;
  jobType: string;
  location: string;
  dateLabel: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  quote?: string;
}

export const historyEntries: HistoryEntry[] = [
  {
    id: "6",
    type: "internship",
    dateRange: "Nov 2025 – Dec 2025",
    dateStart: "2025-11",
    title: "Fullstack Developer Intern",
    metadata: "Internship · Online · Tangerang, Indonesia",
    category: "Work Experience",
    company: "PT. Solvera Global Technology",
    jobType: "Internship",
    location: "Online",
    dateLabel: "Nov 2025 – Dec 2025",
    description:
      "Worked as a Fullstack Developer Intern on the SuperJob website project. Focused on building scalable web features and improving user experience through precise filtering and search capabilities.",
    responsibilities: [
      "Developing and implementing advanced search filters based on project requirements",
      "Building responsive user interfaces using Next.js, TypeScript, and Tailwind CSS",
      "Utilizing Material-UI to create standardized and accessible UI components",
      "Collaborating with a development team using Git and GitLab for version control",
      "Participating in team meetings to align on feature implementation and tasks",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Material-UI", "Git", "GitLab"],
  },
  {
    id: "5",
    type: "education",
    dateRange: "Sep 2025 – Dec 2025",
    dateStart: "2025-09",
    title: "Full-stack Web Development Bootcamp",
    metadata: "Certificate · Online · Jakarta, Indonesia",
    category: "Education",
    company: "Harisenin.com",
    jobType: "Bootcamp",
    location: "Online",
    dateLabel: "Sep 2025 – Dec 2025",
    description:
      "Completed an intensive full-stack web development program. Developed the VideoBelajar website project, implementing a comprehensive learning platform with a modern frontend and a robust relational database backend.",
    responsibilities: [
      "Building the VideoBelajar frontend using React, TypeScript, and Tailwind CSS",
      "Developing the backend API using Express and MySQL",
      "Managing database queries and schema design using DBeaver and MySQL",
      "Testing and documenting APIs with Postman",
      "Integrating Firebase for authentication and cloud services",
      "Working independently to deliver end-to-end project features",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Express", "MySQL", "Postman", "DBeaver", "Firebase", "Bootstrap", "HTML", "CSS"],
  },
  {
    id: "4",
    type: "internship",
    dateRange: "Apr 2024 – Dec 2024",
    dateStart: "2024-04",
    title: "Software Engineer Intern",
    metadata: "Internship · Onsite · Yogyakarta, Indonesia",
    category: "Work Experience",
    company: "Refactory Software House",
    jobType: "Internship",
    location: "Yogyakarta, Indonesia",
    dateLabel: "Apr 2024 – Dec 2024",
    description:
      "Worked as a Software Engineer Intern developing a doctor reservation application. Built a full-stack solution spanning web, mobile, and backend systems to streamline healthcare appointment scheduling.",
    responsibilities: [
      "Developing the web frontend using React, TypeScript, and Tailwind CSS",
      "Building the mobile application version using Flutter",
      "Implementing the backend services using Golang and the Raiden framework with Supabase",
      "Integrating frontend and mobile clients with the backend API",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Flutter", "Golang", "Supabase", "Raiden"],
  },
  {
    id: "3",
    type: "education",
    dateRange: "Sep 2017 – Apr 2022",
    dateStart: "2017-09",
    title: "Information Technology — Animation and Games",
    metadata: "Bachelor's Degree · Yogyakarta, Indonesia · Graduated",
    category: "Education",
    company: "Amikom University Yogyakarta",
    jobType: "Bachelor's Degree",
    location: "Yogyakarta, Indonesia",
    dateLabel: "Sep 2017 – Apr 2022",
    description:
      "Developed 3D games using Unity3D and the C# programming language while studying information technology, animation, and game development.",
    responsibilities: [
      "Studying programming and information technology",
      "Developing animation and game projects",
      "Studying 3D modeling and game development",
      "Completing academic projects",
    ],
    technologies: ["Unity3D", "Blender", "Adobe Premiere Pro", "After Effects", "C#"],
  },
];

export function getHistoryById(id: string): HistoryEntry | undefined {
  return historyEntries.find((entry) => entry.id === id);
}
