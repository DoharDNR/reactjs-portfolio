// ===== Atom: TimelineDot =====
// A circular timeline marker with configurable accent/muted state

type TimelineDotProps = {
  isAccent: boolean;
  isLight: boolean;
  accentDot: string;
  accentRing: string;
};

export function TimelineDot({ isAccent, isLight, accentDot, accentRing }: TimelineDotProps) {
  return (
    <span
      className={`flex size-3 shrink-0 rounded-full ring-4 ${
        isAccent
          ? `${accentDot} ${accentRing}`
          : `${isLight ? "bg-slate-400" : "bg-slate-500"} ring-slate-500/15`
      }`}
      aria-hidden="true"
    />
  );
}
