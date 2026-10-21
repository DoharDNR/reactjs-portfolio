import { Link } from "react-router";

type NavLinkProps = {
  to?: string;
  href?: string;
  children: React.ReactNode;
  isActive: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function NavLink({
  to,
  href,
  children,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: NavLinkProps) {
  const active = isActive || isHovered;
  const className = `text-[14px] transition-colors 200ms ease relative focus-visible:outline-none ${
    active ? "text-accent-9" : "text-neutral-9 hover:text-accent-9"
  }`;

  return to ? (
    <Link to={to} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
      {children}
    </a>
  );
}
