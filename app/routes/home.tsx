// ===== Home Route: About section + Contact =====
// Uses Tailwind utility classes. Colors via CSS design tokens for dark/light mode.

import type { Route } from "./+types/home";
import AboutSection from "~/components/organisms/about/about";
import { ContactSection } from "~/components/organisms/contact/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dohar Siregar - Full-Stack Web Developer & Designer" },
    {
      name: "description",
      content:
        "Portfolio of Dohar Siregar, a passionate full-stack web developer and designer creating elegant digital experiences.",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <AboutSection />
      <ContactSection />
    </div>
  );
}
