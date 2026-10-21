# Developer Portfolio

A modern, full-stack developer portfolio built with **React Router v7**, **TypeScript**, and **Vite**. Features automatic GitHub repository discovery, an Atomic Design component architecture, and a sophisticated theming system.

## 🚀 Features

### GitHub Integration
- **Automatic repository discovery** via GitHub REST API (server-side)
- Maps languages to project types: e-commerce, task-management, blog, auth, mobile
- Groups repositories by creation year with activity metadata
- **In-memory caching** (1-hour TTL) to respect API rate limits
- Server-side data loading via React Router loaders

### Project History Timeline (`/projects`)
- Year-based visual timeline with connector lines
- Repository cards: icons, descriptions, tech badges, featured flags, push dates
- **Two theme palettes**: Spec (Tailwind) ↔ Project (CSS variables)
- Skeleton loading states with auto-revalidation polling

### About Section (`/`)
- Personal intro with portrait
- Interactive timeline for work/education/internship history
- Detail panel: responsibilities, technologies, achievements
- Active section highlighting via IntersectionObserver

### Contact Section
- Email, LinkedIn, GitHub links with icons

### Global UX
- **Light/Dark/System theme** with `@dazl/color-scheme` (persisted, no flash)
- Responsive navigation with mobile drawer (Framer Motion)
- Sticky navbars with active section detection
- Smooth scroll + scroll restoration

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Router v7 (SSR) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS v4, CSS Modules, Open Props design tokens |
| **State** | React hooks, `@dazl/color-scheme` |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Build** | Vite 7 |

---

## 📂 Project Structure

```
app/
├── components/
│   ├── atoms/           # TimelineDot, TechBadge, FeaturedBadge, NavLink
│   ├── molecules/       # ProjectIcon, YearMarker, RepositoryCard, InfoItem, TimelineItem, DetailCard, Navbar
│   ├── organisms/       # GitHubTimeline, ProjectHistoryNavbar, about/, contact/
│   └── ui/              # Button, Card, Skeleton, ColorSchemeToggle, DropdownMenu, Toast, Slider, Footer
├── routes/
│   ├── home.tsx         # About + Contact
│   └── projects.tsx     # GitHub timeline
├── services/
│   ├── github.server.ts # GitHub API + language→icon mapping
│   └── cache.server.ts  # In-memory cache + startup fetch
├── data/
│   ├── history.ts       # Work/education timeline data
│   └── projectHistory.ts # TypeScript types
├── styles/
│   ├── tailwind.css     # @theme config (spacing, radius, colors, shadows, easing)
│   ├── theme.css        # Semantic color aliases (neutral/accent/error/success)
│   ├── global.css       # Base styles
│   └── tokens/          # Open Props: typography, spacings, colors, decorations, animations, keyframes
├── hooks/
│   └── use-toast.ts
├── root.tsx             # Layout, providers, fonts, global styles
└── routes.ts            # Route config
```

---

## 🎨 Design System

### Atomic Design Architecture
| Level | Components |
|-------|------------|
| **Atoms** | `TimelineDot`, `TechBadge`, `FeaturedBadge`, `NavLink` |
| **Molecules** | `ProjectIcon`, `YearMarker`, `RepositoryCard`, `InfoItem`, `TimelineItem`, `DetailCard`, `Navbar` |
| **Organisms** | `GitHubTimeline`, `ProjectHistoryNavbar`, `AboutSection`, `ContactSection` |
| **UI Primitives** | `Button`, `Card`, `Skeleton`, `ColorSchemeToggle`, `DropdownMenu`, `Toast/Toaster`, `Slider`, `Footer` |

### Design Tokens (CSS Variables)
- **Typography**: Fluid sizing (`--font-size-fluid-*`), Inter font, semantic scales (`--font-heading`, `--font-body`, `--font-caption`, `--font-code`)
- **Colors**: 12-step scales per hue using `light-dark()` for auto dark mode
  - Neutral: **Sage** (professional, sophisticated)
  - Accent: **Indigo** (trustworthy brand)
  - Success: **Teal**
  - Error: **Red**
- **Spacing**: 9-step scale (`--space-1` to `--space-9` = 4px–64px)
- **Border Radius**: 6 steps + round (`--radius-1` to `--radius-6`, `--radius-round`)
- **Shadows**: 4 levels with configurable color/strength (`--shadow-1` to `--shadow-4`)
- **Easing**: Standard curves (`--ease`, `--ease-in`, `--ease-out`, `--ease-bounce-*`)
- **Animations**: Keyframes for fade, scale, spin, blink, bounce

### Dual Theming Strategy (in `projects.tsx`)
1. **Spec Theme** – Tailwind utility classes with slate/indigo palette
2. **Project Theme** – CSS design tokens (`var(--color-neutral-*)`, `var(--color-accent-*)`)

Switchable at runtime via the palette toggle in `ProjectHistoryNavbar`.

---

## 🏁 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Available at `http://localhost:5173`

### Environment Variables
Create `.env`:
```env
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-personal-access-token
```

### Building for Production
```bash
npm run build
npm run start
```

### Type Checking
```bash
npm run typecheck
```

---

## 📝 Notes

- **Server-only code** uses `.server.ts` suffix (excluded from client bundle)
- **Path aliases**: `~/*` → `./app/*`
- **Prettier**: 120 char print width, auto line endings
- **React Router typegen** runs automatically during typecheck

---

## 📄 License

Private project — portfolio of Dohar Siregar.