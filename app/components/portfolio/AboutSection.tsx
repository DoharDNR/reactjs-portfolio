import { useState } from "react";
import { Briefcase, GraduationCap, MapPin, Mail, Code, Calendar, Check, ChevronRight } from "lucide-react";
import { Navbar } from "./Navbar";
import { historyEntries } from "~/data/history";
import Profil from "~/images/IMG_4745.webp";
import { InfoItem } from "~/components/portfolio/InfoItem";
import { TimelineItem } from "~/components/portfolio/TimelineItem";
import { DetailCard } from "~/components/portfolio/DetailCard";

const IDENTITY = {
  name: "Dohar Siregar",
  role: "Full-Stack Web Developer",
  email: "doharsiregar10@gmail.com",
  location: "Yogyakarta, Indonesia",
} as const;

export default function AboutSection() {
  const [selectedId, setSelectedId] = useState<string>(historyEntries[0]?.id ?? "");
  const selectedEntry = historyEntries.find((entry) => entry.id === selectedId) ?? historyEntries[0];

  return (
    <main id="about" className="min-h-screen">
      <Navbar />

      <section className="bg-neutral-1 pt-12 pb-6">
        <div className="max-w-360 mx-auto px-6 md:px-12.5 min-h-71.25 grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] lg:grid-cols-[2fr_1fr_auto] gap-4 items-center">
          {/* Introductory text (left) */}
          <div className="flex flex-col items-start max-w-130">
            <span className="inline-flex items-center gap-2 px-4 py-0.75 rounded-full bg-blue-900/20 text-blue-400 text-sm font-medium mb-6 align-start">
              About Me
            </span>
            <h1 className="font-display text-neutral-12 text-[28px] sm:text-[36px] md:text-[42px] lg:text-5xl font-800 leading-tight">
              Hi, I'm <span className="text-accent-9">{IDENTITY.name.split(" ")[0]}</span>
            </h1>
            <p className="mt-4 text-neutral-11 text-[15px] leading-6.5 max-w-120">
              I'm a Frontend Developer with a passion for building beautiful, fast, and accessible web experiences. I
              love turning ideas into interactive products that make an impact.
            </p>
          </div>

          {/* Portrait (center) */}
          <div className="flex justify-center">
            <img
              src={Profil}
              alt={`Portrait of ${IDENTITY.name}`}
              className="w-37.5 h-37.5 sm:w-42.5 sm:h-42.5 md:w-48 md:h-48 rounded-full object-cover object-center"
            />
          </div>

          {/* Profile facts (right) */}
          <div className="flex flex-col gap-5.5 items-start ml-20 md:ml-auto md:items-start lg:ml-0 lg:items-start">
            <InfoItem icon={<UserIcon />} label="Name" value={IDENTITY.name} />
            <InfoItem icon={<MapPin />} label="Location" value={IDENTITY.location} />
            <InfoItem icon={<Mail />} label="Email" value={IDENTITY.email} />
            <InfoItem icon={<Code />} label="Role" value={IDENTITY.role} />
          </div>
        </div>
      </section>

      <section className="pt-16 pb-24 md:pb-0">
        <div className="max-w-360 mx-auto px-6 md:px-12.5 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 md:gap-10 lg:gap-12 items-start">
            <div className="grid grid-rows-[auto_1fr] gap-3 min-h-125 md:min-h-150 md:h-150">
              <header>
                <span className="block text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-neutral-10 mb-2">
                  MY JOURNEY
                </span>
                <h2 className="font-heading text-neutral-12 text-[24px] sm:text-[28px] md:text-3xl font-bold mb-2">
                  Work & Education History
                </h2>
                <p className="text-neutral-10 text-[14px]">
                  A timeline of my journey, from learning to building real-world products.
                </p>
              </header>

              <nav className="flex flex-col gap-3.75" aria-label="History timeline">
                {historyEntries.map((entry) => (
                  <TimelineItem
                    key={entry.id}
                    entry={entry}
                    isActive={entry.id === selectedId}
                    onClick={() => setSelectedId(entry.id)}
                  />
                ))}
              </nav>
            </div>

            <article
              className="bg-neutral-2 border border-neutral-6 rounded-[10px] p-5 sm:p-6 md:p-6 shadow-1 h-full"
              aria-live="polite"
              aria-label="Selected history detail"
            >
              <DetailCard entry={selectedEntry} />
            </article>
        </div>
      </section>
    </main>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0 0c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
        fill="currentColor"
      />
    </svg>
  );
}
