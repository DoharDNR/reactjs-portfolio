// ===== Atom: FeaturedBadge =====
// A small badge indicating a featured project

type FeaturedBadgeProps = {
  bgColor: string;
  borderColor: string;
  textColor: string;
};

export function FeaturedBadge({ bgColor, borderColor, textColor }: FeaturedBadgeProps) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${bgColor} ${borderColor} ${textColor}`}
      aria-label="Featured project"
    >
      Featured
    </span>
  );
}
