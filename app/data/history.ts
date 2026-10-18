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
    id: "1",
    type: "work",
    dateRange: "Sep 2021 – Present",
    dateStart: "2021-09",
    title: "Frontend Developer at TechScale",
    metadata: "Full-time · Yogyakarta, Indonesia",
    category: "Work Experience",
    company: "TechScale",
    jobType: "Full-time",
    location: "Yogyakarta, Indonesia",
    dateLabel: "Sep 2021 – Present",
    description:
      "I work as a Frontend Developer at TechScale, a growing tech company focused on building digital solutions for businesses. In this role, I'm responsible for developing and maintaining modern web applications using React, Next.js, and Tailwind CSS.",
    responsibilities: [
      "Developing responsive and accessible web interfaces",
      "Collaborating with backend developers and designers",
      "Optimizing performance and user experience",
      "Maintaining and improving existing features",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Git"],
    quote: "Great products are built by great teams, and I'm grateful to be part of this journey.",
  },
  {
    id: "2",
    type: "work",
    dateRange: "Jun 2020 – Aug 2021",
    dateStart: "2020-06",
    title: "Web Developer at Kreativa Studio",
    metadata: "Full-time · Bandung, Indonesia",
    category: "Work Experience",
    company: "Kreativa Studio",
    jobType: "Full-time",
    location: "Bandung, Indonesia",
    dateLabel: "Jun 2020 – Aug 2021",
    description:
      "Built and maintained responsive websites for client projects, working with designers to translate visual concepts into reliable user interfaces.",
    responsibilities: [
      "Implementing responsive page layouts",
      "Integrating frontend components with APIs",
      "Improving page performance and accessibility",
      "Reviewing and fixing UI defects",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
  },
  {
    id: "3",
    type: "education",
    dateRange: "Jan 2019 – May 2020",
    dateStart: "2019-01",
    title: "Computer Science at Universitas Gadjah Mada",
    metadata: "Bachelor's Degree · Yogyakarta, Indonesia",
    category: "Education",
    company: "Universitas Gadjah Mada",
    jobType: "Bachelor's Degree",
    location: "Yogyakarta, Indonesia",
    dateLabel: "Jan 2019 – May 2020",
    description:
      "Studied core computer science concepts, software development practices, data structures, and the foundations of web technologies.",
    responsibilities: [
      "Studying programming fundamentals",
      "Practicing algorithms and data structures",
      "Building coursework projects",
      "Collaborating on group assignments",
    ],
    technologies: ["Programming", "Algorithms", "Databases", "Web Development"],
  },
  {
    id: "4",
    type: "internship",
    dateRange: "Aug 2018 – Dec 2018",
    dateStart: "2018-08",
    title: "Frontend Intern at Digitalux",
    metadata: "Internship · Jakarta, Indonesia",
    category: "Internship",
    company: "Digitalux",
    jobType: "Internship",
    location: "Jakarta, Indonesia",
    dateLabel: "Aug 2018 – Dec 2018",
    description:
      "Supported the frontend team in implementing website components and refining interfaces for internal and client-facing projects.",
    responsibilities: [
      "Building reusable UI components",
      "Fixing responsive layout issues",
      "Testing pages across screen sizes",
      "Learning team development workflows",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Git"],
  },
  {
    id: "5",
    type: "education",
    dateRange: "Jul 2016 – Jun 2018",
    dateStart: "2016-07",
    title: "Senior High School",
    metadata: "High School · Yogyakarta, Indonesia",
    category: "Education",
    company: "SMA Negeri 1 Yogyakarta",
    jobType: "High School",
    location: "Yogyakarta, Indonesia",
    dateLabel: "Jul 2016 – Jun 2018",
    description:
      "Completed senior high school while developing an early interest in computers, technology, and problem-solving.",
    responsibilities: [
      "Building foundational analytical skills",
      "Exploring computer-related interests",
      "Participating in school activities",
    ],
    technologies: ["Mathematics", "Science", "Computer Basics"],
  },
];

export function getHistoryById(id: string): HistoryEntry | undefined {
  return historyEntries.find((entry) => entry.id === id);
}
