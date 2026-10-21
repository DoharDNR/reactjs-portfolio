import { Briefcase, MapPin, Calendar, Check } from "lucide-react";
import type { HistoryEntry } from "~/data/history";

export function DetailCard({ entry }: { entry: HistoryEntry }) {
  return (
    <>
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
      <p className="text-[14px] leading-[23px] text-neutral-10 mb-7">
        {entry.description}
      </p>
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
