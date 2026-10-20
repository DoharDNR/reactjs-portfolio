// ===== Molecule: ProjectIcon =====
// A color-coded icon tile representing different project types

type ProjectIconProps = {
  type: "e-commerce" | "task-management" | "blog" | "auth" | "mobile";
  isLight: boolean;
};

export function ProjectIcon({ type, isLight }: ProjectIconProps) {
  const icon = (
    <svg
      className="size-6 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 6v6l4 2" />
    </svg>
  );

  const baseClass = "flex size-12 shrink-0 items-center justify-center rounded-xl";

  // Adjust colors for light/dark
  const lightDark = (light: string, dark: string) => (isLight ? light : dark);

  switch (type) {
    case "e-commerce":
      return (
        <span className={`${baseClass} ${lightDark("bg-indigo-100 text-indigo-700", "bg-indigo-500/15 text-indigo-300")}`}>
          {icon}
        </span>
      );
    case "task-management":
      return (
        <span className={`${baseClass} ${lightDark("bg-emerald-100 text-emerald-700", "bg-emerald-500/15 text-emerald-300")}`}>
          {icon}
        </span>
      );
    case "blog":
      return (
        <span className={`${baseClass} ${lightDark("bg-fuchsia-100 text-fuchsia-700", "bg-fuchsia-500/15 text-fuchsia-300")}`}>
          {icon}
        </span>
      );
    case "auth":
      return (
        <span className={`${baseClass} ${lightDark("bg-sky-100 text-sky-700", "bg-sky-500/15 text-sky-300")}`}>
          {icon}
        </span>
      );
    case "mobile":
      return (
        <span className={`${baseClass} ${lightDark("bg-amber-100 text-amber-700", "bg-amber-500/15 text-amber-300")}`}>
          {icon}
        </span>
      );
    default:
      return (
        <span className={`${baseClass} ${lightDark("bg-slate-100 text-slate-700", "bg-slate-500/15 text-slate-300")}`}>
          {icon}
        </span>
      );
  }
}
