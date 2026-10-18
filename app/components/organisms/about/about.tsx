// ===== About Me Section: Dark hero + interactive timeline + detail card =====
// Uses Tailwind utility classes. Colors via CSS design tokens for dark/light mode.
// Responsive: mobile stacks hero and history sections; tablet adjusts sizing.

import { useState } from "react";
import { Briefcase, GraduationCap, MapPin, Mail, Code, Calendar, Check, ChevronRight } from "lucide-react";
import { Navbar } from "~/components/molecules/navbar";
import { historyEntries, type HistoryEntry } from "~/data/history";
import Profil from "~/images/IMG_4745.webp";

// Parameterized identity — change here to rebrand the entire section
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
    <main className="min-h-screen">
      <Navbar />

      {/* ===== Profile Hero ===== */}
      <section className="bg-neutral-1 pt-12 pb-6">
        <div className="max-w-360 mx-auto px-6 md:px-12.5 min-h-[285px] grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] lg:grid-cols-[2fr_1fr_auto] gap-4 items-center">
          {/* Introductory text (left) */}
          <div className="flex flex-col items-start max-w-[520px]">
            <span className="inline-flex items-center gap-2 px-4 py-[3px] rounded-full bg-blue-900/20 text-blue-400 text-xs font-medium mb-6 align-start">
              About Me
            </span>
            <h1 className="font-display text-neutral-12 text-[28px] sm:text-[36px] md:text-[42px] lg:text-5xl font-800 leading-tight">
              Hi, I'm <span className="text-accent-9">{IDENTITY.name.split(" ")[0]}</span>
            </h1>
            <p className="mt-4 text-neutral-11 text-[15px] leading-[26px] max-w-[480px]">
              I'm a Frontend Developer with a passion for building beautiful, fast, and accessible web experiences. I
              love turning ideas into interactive products that make an impact.
            </p>
          </div>

          {/* Portrait (center) */}
          <div className="flex justify-end">
            <img
              src={Profil}
              alt={`Portrait of ${IDENTITY.name}`}
              className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] md:w-[192px] md:h-[192px] rounded-full object-cover object-center"
            />
          </div>

          {/* Profile facts (right) */}
          <div className="flex flex-col gap-[22px] ml-auto md:ml-0 lg:ml-0">
            <InfoItem icon={<UserIcon />} label="Name" value={IDENTITY.name} />
            <InfoItem icon={<MapPin />} label="Location" value={IDENTITY.location} />
            <InfoItem icon={<Mail />} label="Email" value={IDENTITY.email} />
            <InfoItem icon={<Code />} label="Role" value={IDENTITY.role} />
          </div>
        </div>
      </section>

      {/* ===== Journey Section ===== */}
      <section className="pt-16 pb-24 md:pb-0">
        <div className="max-w-360 mx-auto px-6 md:px-12.5 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 md:gap-10 lg:gap-12 items-start">
          {/* ===== Interactive Timeline (top on tablet/mobile, left on desktop lg+) ===== */}
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

            {/* ===== Detail Card (under timeline on tablet 768px, right on desktop lg+) ===== */}
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

// ===== Sub-components =====

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

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-[20px]">
      <span className="w-[24px] h-[24px] flex-shrink-0 text-accent-8 flex items-center justify-center">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-[11px] text-neutral-10">{label}</span>
        <span className="text-[13px] text-neutral-12 mt-1">{value}</span>
      </div>
    </div>
  );
}

function TimelineItem({ entry, isActive, onClick }: { entry: HistoryEntry; isActive: boolean; onClick: () => void }) {
  const Icon = entry.type === "work" ? Briefcase : entry.type === "internship" ? Code : GraduationCap;

  return (
    <button
      type="button"
      className={`relative flex items-center gap-4 px-4 py-[14px] rounded-[8px] border border-transparent cursor-pointer transition-all 200ms ease text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-9 ${
        isActive
          ? "bg-accent-3 border-accent-4"
          : "hover:bg-slate-200/80"
      }`}
      data-active={isActive}
      aria-selected={isActive}
      aria-pressed={isActive}
      onClick={onClick}
    >
      {/* Vertical line (desktop only) */}
      <span
        className="absolute left-38.75 top-0 -bottom-4.5 w-0.5 bg-neutral-6 z-0 md:block hidden"
        aria-hidden="true"
      />
      {/* Marker dot (desktop only) */}
      <span
        className={`absolute left-37 top-1.5 w-3.5 h-3.5 rounded-full z-1 transition-all duration-200 ease md:block hidden ${
          isActive ? "bg-accent-9" : "bg-neutral-8 border-2 border-neutral-6"
        }`}
        aria-hidden="true"
      />

      <span className="w-[145px] flex-shrink-0 text-[11px] text-neutral-9 md:table-cell">
        {entry.dateRange}
      </span>

      <span
        className={`w-[42px] h-[42px] rounded-[10px] flex items-center justify-center flex-shrink-0 z-1 transition-all 200ms ease ${
          isActive ? "bg-blue-900/15" : "bg-neutral-3"
        }`}
      >
        <Icon className={`w-[20px] h-[20px] transition-colors 200ms ease ${isActive ? "text-accent-9" : "text-neutral-8"}`} />
      </span>

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[14px] font-medium text-neutral-12 mb-1 line-clamp-2">
          {entry.title}
        </span>
        <span className="text-[12px] text-neutral-10">{entry.metadata}</span>
      </div>

      <span className={`w-[16px] h-[16px] flex-shrink-0 transition-colors 200ms ease ${isActive ? "text-accent-9" : "text-neutral-7"}`}>
        <ChevronRight />
      </span>
    </button>
  );
}

function DetailCard({ entry }: { entry: HistoryEntry }) {
  return (
    <>
      {/* Card header */}
      <header className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center px-[12px] py-1 rounded-full bg-accent-2 text-accent-11 text-[11px] font-medium">
          {entry.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="w-[28px] h-[28px] text-accent-9 flex items-center justify-center">◆</span>
          <span className="font-subheading text-neutral-12 text-[16px] font-bold">{entry.company}</span>
        </div>
      </header>

      <h3 className="font-heading text-neutral-12 text-[20px] font-bold mb-4 leading-[1.25]">
        {entry.title}
      </h3>

      {/* Metadata row */}
      <div className="flex flex-wrap gap-[20px] mb-7">
        <div className="flex items-center gap-1 text-[12px] text-neutral-10">
          <Briefcase className="w-[15px] h-[15px] text-accent-9" />
          <span>{entry.jobType}</span>
        </div>
        <div className="flex items-center gap-1 text-[12px] text-neutral-10">
          <MapPin className="w-[15px] h-[15px] text-accent-9" />
          <span>{entry.location}</span>
        </div>
        <div className="flex items-center gap-1 text-[12px] text-neutral-10">
          <Calendar className="w-[15px] h-[15px] text-accent-9" />
          <span>{entry.dateLabel}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[14px] leading-[23px] text-neutral-10 mb-7">
        {entry.description}
      </p>

      {/* Responsibilities / Achievements */}
      <div className="mb-7">
        <h4 className="text-[14px] font-medium text-neutral-12 mb-3">
          {entry.type === "education" ? "Achievements" : "Key Responsibilities"}
        </h4>
        <ul className="flex flex-col gap-2">
          {entry.responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-neutral-10">
              <Check className="w-[15px] h-[15px] text-accent-9 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies / Coursework */}
      <div className="mb-7">
        <h4 className="text-[14px] font-medium text-neutral-12 mb-3">
          {entry.type === "education" ? "Technologies or subjects" : "Technologies Used"}
        </h4>
        <div className="flex flex-wrap gap-[6px]">
          {entry.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center h-[26px] px-[12px] rounded-full bg-accent-2 text-accent-11 text-[11px] font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
