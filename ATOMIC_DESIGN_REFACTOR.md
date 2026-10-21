# Reusable Component Structure

The project groups components by feature and purpose rather than by Atomic Design levels. This keeps related components together and makes reuse easier to discover.

## Structure

### `app/components/github/`
Reusable GitHub project history components:

- `GitHubTimeline.tsx` — year-based repository timeline
- `RepositoryCard.tsx` — repository details and activity metadata
- `ProjectIcon.tsx` — project type icon tile
- `YearMarker.tsx` — year and repository count
- `TimelineDot.tsx` — timeline marker
- `TechBadge.tsx` — technology label
- `FeaturedBadge.tsx` — featured project label

### `app/components/portfolio/`
Reusable portfolio content components:

- `AboutSection.tsx` — introduction, profile facts, and history
- `ContactSection.tsx` — contact links
- `Navbar.tsx` — portfolio navigation
- `TimelineItem.tsx` — work and education history item
- `DetailCard.tsx` — selected history details
- `InfoItem.tsx` — profile fact row

### `app/components/layout/`
Page-level layout components:

- `ProjectHistoryNavbar.tsx` — project history navigation and theme palette control
- `Footer.tsx` — global footer

### `app/components/ui/`
Generic reusable UI primitives and controls:

- Buttons, cards, skeletons, dropdown menus, sliders
- Color scheme toggle
- Toast and toaster components
- `NavLink.tsx` — reusable navigation link

## Principles

- Group by domain or purpose, not component size.
- Keep components focused and reusable through typed props.
- Keep generic controls in `ui/`.
- Keep feature-specific components close to the feature they support.
- Prefer direct imports over deep Atomic Design hierarchy.
