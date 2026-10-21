import { type ReactNode } from "react";

type InfoItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center gap-[20px]">
      <span className="w-5 h-5 shrink-0 text-accent-8 flex items-center justify-center">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-[11px] text-neutral-10">{label}</span>
        <span className="text-[13px] text-neutral-12 mt-1">{value}</span>
      </div>
    </div>
  );
}
