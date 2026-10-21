import { Briefcase, Code, GraduationCap, ChevronRight } from "lucide-react";
import type { HistoryEntry } from "~/data/history";

type TimelineItemProps = {
  entry: HistoryEntry;
  isActive: boolean;
  onClick: () => void;
};

export function TimelineItem({ entry, isActive, onClick }: TimelineItemProps) {
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
      <span
        className="absolute left-38.75 top-0 -bottom-4.5 w-0.5 bg-neutral-6 z-0 md:block hidden"
        aria-hidden="true"
      />
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
