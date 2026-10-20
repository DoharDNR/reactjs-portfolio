// ===== Atom: TechBadge =====
// A pill-shaped technology label

type TechBadgeProps = {
  tech: string;
  bgColor: string;
  textColor: string;
};

export function TechBadge({ tech, bgColor, textColor }: TechBadgeProps) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs ${bgColor} ${textColor}`}>
      {tech}
    </span>
  );
}
