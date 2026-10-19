# GitHub Project History Page — UI/UX and Technical Specification

## 1. Objective

Build a single-page portfolio section that presents a developer's GitHub repository history grouped by calendar year.

The page must communicate:
- Which repositories the developer worked on during each year.
- Each repository's first and last commit dates within that year.
- The number of commits made within that year.
- A concise project description and technology stack.
- A direct link to the GitHub repository.

The visual direction is a polished, dark-themed developer portfolio with a chronological timeline and compact repository cards.

This is a planning-stage interface. Use realistic but explicitly fictional sample data. Do not imply that sample repository names, commit counts, or dates belong to a real GitHub account.

## 2. Page Structure

The page contains three primary regions:

1. Page introduction.
2. Chronological project timeline.
3. Minimal footer note.

Use a centered main container with a maximum width of `1152px`.

Desktop content order:

- Page eyebrow: `MY GITHUB JOURNEY`
- Main heading: `Projects & Contributions`
- Supporting paragraph
- Year groups, ordered newest to oldest
- Footer note

Do not add a navbar, sidebar, hero illustration, statistics dashboard, search field, filter controls, or unrelated sections. These are outside the scope of this design.

## 3. Global Visual Design

### Color palette

Use the following colors consistently.

| Purpose | Color |
|---|---|
| Page background | `#020617` |
| Card background | `#0f172a` at approximately 60% opacity |
| Primary text | `#f8fafc` |
| Secondary text | `#94a3b8` |
| Muted text | `#64748b` |
| Default border | `#1e293b` |
| Hover border | `#334155` |
| Primary accent | `#818cf8` |
| Primary accent text | `#a5b4fc` |
| Featured badge background | `rgba(129, 140, 248, 0.10)` |
| Featured badge border | `rgba(129, 140, 248, 0.20)` |

Use a dark background throughout. Avoid large gradients, bright neon effects, excessive shadows, and strong decorative backgrounds.

The page should feel restrained, technical, and readable.

### Tailwind CSS v4

Use standard Tailwind CSS v4 utility classes.

Do not add a custom CSS file for styling that can be expressed through standard utilities. Do not add a component library or icon dependency solely for this page.

Assume Tailwind CSS v4 is already configured in the application.

## 4. Main Container

Use a semantic `<main>` element with the following classes:

`mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-16`

Requirements:
- Center the container horizontally.
- Use a maximum content width of approximately `1152px`.
- Apply `20px` horizontal padding by default.
- Increase horizontal padding to `32px` at the `sm` breakpoint.
- Apply `48px` top and bottom padding by default.
- Increase vertical padding to `64px` at the `lg` breakpoint.
- Keep all content in normal document flow.

Do not use fixed positioning or sticky positioning.

## 5. Page Introduction

Place the introduction at the top of the main container.

Use a maximum text width of approximately `768px` and a bottom margin of `48px`.

### 5.1 Eyebrow

Text:

`MY GITHUB JOURNEY`

Classes:

`mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300`

Requirements:
- Use `12px` text.
- Use semibold font weight.
- Use uppercase text.
- Apply approximately `0.22em` letter spacing.
- Use the primary accent color.
- Place it above the main heading.
- Maintain `12px` spacing below it.

### 5.2 Main heading

Text:

`Projects & Contributions`

Classes:

`text-3xl font-semibold tracking-tight text-white sm:text-4xl`

Requirements:
- Use a `30px` heading size by default.
- Increase to `36px` at the `sm` breakpoint.
- Use semibold font weight.
- Use tight letter spacing.
- Keep the heading on one line when the available width allows.
- Highlight only the words `& Contributions` using `text-indigo-400`.
- Do not apply a gradient to the heading.

Example:

`Projects` in white, followed by `& Contributions` in indigo.

### 5.3 Supporting paragraph

Text:

`A year-by-year overview of repositories I've worked on, showing the first and last commit dates within each year.`

Classes:

`mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base`

Requirements:
- Place the paragraph `16px` below the heading.
- Limit its width to approximately `672px`.
- Use slate gray text.
- Use `14px` text by default and `16px` at the `sm` breakpoint.
- Use a line height of approximately `24px`.
- Do not add extra paragraphs.

## 6. Timeline Layout

The timeline is a vertical sequence of year groups ordered in descending order.

Example:

- 2025
  - Repository A
  - Repository B
  - Repository C
- 2024
  - Repository D
  - Repository E

Use a vertical gap of `48px` between year groups.

Recommended wrapper:

`space-y-12`

Each year group uses a two-column desktop layout:

`grid grid-cols-1 gap-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8`

Requirements:
- The first column is approximately `130px` wide on desktop.
- The second column occupies the remaining width.
- The year label belongs in the first column.
- Repository cards belong in the second column.
- On small screens, stack the year label above its repository cards.
- Do not place the year label inside a repository card.
- Do not use a separate grid for every individual repository.

## 7. Year Marker

Each year group begins with a year marker in the first column.

Example:

`2025`

Below it:

`3 repositories`

### Year heading

Classes:

`text-2xl font-semibold tracking-tight text-white`

Requirements:
- Use approximately `24px` text.
- Use semibold font weight.
- Use white text.
- Keep the year visually distinct from the repository titles.

### Repository count

Classes:

`mt-1 text-sm text-slate-400`

Requirements:
- Place the count directly below the year.
- Use muted slate text.
- Use the number of unique repositories with at least one qualifying commit during that year.
- Do not use the total number of commits as the repository count.

### Timeline dot

On desktop, place a small circular marker near the left edge of the year column.

Use a `12px` circular marker:
- Current or most recent year: `bg-indigo-400`.
- Older years: `bg-slate-500`.
- Add a subtle ring using `ring-4 ring-indigo-400/15` for the accent marker.
- For older markers, use `ring-4 ring-slate-500/15`.

Position the marker with absolute positioning relative to the year group. Keep it aligned near the top of the year heading.

A subtle vertical line may connect adjacent year markers. Use `bg-slate-800` and `w-px`. The line must remain behind the markers and must not overlap repository cards.

On mobile, hide the desktop connector line and position the year heading normally above the cards.

Do not add a separate timeline dot to every repository card.

## 8. Repository Cards

Every repository is displayed as an independent card inside its corresponding year group.

Use a vertical gap of `16px` between cards.

### Card container

Recommended classes:

`rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-slate-700 sm:p-6`

Requirements:
- Use a `16px` corner radius.
- Use a subtle slate border.
- Use a dark translucent background.
- Use `20px` padding by default.
- Increase padding to `24px` at the `sm` breakpoint.
- Change only the border color on hover.
- Do not add a strong shadow.
- Do not use a bright background gradient.
- Do not make the entire card clickable unless the application explicitly requires it.

The card must remain readable against the page background.

### Card internal layout

Use a horizontal flex layout on larger screens:

`flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between`

The card has two primary regions:

1. Left region: icon, repository title, description, and technology badges.
2. Right region: commit count, commit date range, and repository link.

At smaller widths, stack these regions vertically.

Do not let metadata force the description into an excessively narrow column.

## 9. Repository Icon

Place a compact icon tile before the project information.

Recommended classes:

`flex size-12 shrink-0 items-center justify-center rounded-xl`

Requirements:
- Use a fixed size of `48 × 48px`.
- Use a `12px` corner radius.
- Align the icon horizontally and vertically.
- Use a simple inline SVG icon.
- Keep the SVG approximately `24 × 24px`.
- Use `fill="none"` and `stroke="currentColor"` for line icons where appropriate.
- Add `aria-hidden="true"` when the icon is decorative.

The icon should be illustrative, not a substitute for a repository thumbnail.

Use restrained icon colors to distinguish project types. Suggested combinations:

| Project type | Tile background | Icon color |
|---|---|---|
| E-commerce | `bg-indigo-500/15` | `text-indigo-300` |
| Task management | `bg-emerald-500/15` | `text-emerald-300` |
| Blog or content platform | `bg-fuchsia-500/15` | `text-fuchsia-300` |
| Authentication service | `bg-sky-500/15` | `text-sky-300` |
| Mobile application | `bg-amber-500/15` | `text-amber-300` |

These colors are optional visual distinctions. Do not assign colors based on programming language or repository activity.

## 10. Repository Information

The repository information region should use:

`flex min-w-0 gap-4`

The icon tile must not shrink. The information column should be allowed to shrink without causing horizontal overflow.

### 10.1 Repository title

Example:

`E-commerce Platform`

Recommended classes:

`font-semibold text-white`

Requirements:
- Use approximately `16px` text.
- Use semibold font weight.
- Keep the title as a heading, such as an `<h3>`.
- Do not use excessively large text.
- Do not place the repository URL in the title unless that is a deliberate design change.

### 10.2 Featured badge

Only show this badge for explicitly selected featured projects.

Text:

`Featured`

Recommended classes:

`rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-300`

Requirements:
- Place the badge beside the repository title.
- Use a small horizontal gap of `8px`.
- Allow the title and badge to wrap naturally on narrow screens.
- Do not show a featured badge on every repository.
- Do not infer featured status from stars, forks, or commit count.

### 10.3 Description

Example:

`A full-stack storefront with product management, shopping cart, and checkout workflows.`

Recommended classes:

`mt-1 max-w-2xl text-sm leading-6 text-slate-400`

Requirements:
- Place the description directly below the title.
- Use muted text.
- Use approximately `14px` text and `24px` line height.
- Keep the description concise, preferably one or two lines.
- Use a curated portfolio description when available.
- Fall back to the GitHub repository description only when a curated description is unavailable.
- Do not invent features that cannot be verified.

### 10.4 Technology badges

Display technologies as compact pill-shaped labels beneath the description.

Example:

- Next.js
- TypeScript
- Prisma
- PostgreSQL

Recommended wrapper:

`mt-3 flex flex-wrap gap-2`

Recommended badge:

`rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300`

Requirements:
- Place badges `12px` below the description.
- Use an `8px` gap between badges.
- Allow badges to wrap onto multiple lines.
- Use a consistent neutral style.
- Do not assign a different bright color to every technology.
- Show only technologies that are known to be used by the project.
- Do not assume that the GitHub primary language represents the complete technology stack.

## 11. Repository Activity Metadata

The right region contains three items in this order:

1. Commit count for the selected year.
2. First-to-last commit date range for that year.
3. Repository link.

Recommended layout:

`flex shrink-0 flex-col gap-3 border-t border-slate-800 pt-4 text-sm text-slate-400 lg:min-w-56 lg:border-0 lg:pt-1`

Requirements:
- Use a vertical stack.
- Use a `12px` gap between metadata items.
- At smaller widths, separate the metadata from the main content using a subtle top border and `16px` top padding.
- At the `lg` breakpoint, remove the top border and top padding.
- Keep the metadata column at least approximately `224px` wide on desktop.
- Use a muted text color.
- Avoid large icons or decorative graphics.

### 11.1 Commit count

Example:

`12 commits in 2025`

Use a small decorative GitHub-style icon or simple inline SVG before the text.

Requirements:
- Count commits for the current repository within the displayed year only.
- Do not display the repository's lifetime commit count.
- Use singular wording when the count is one: `1 commit in 2025`.
- Do not display this row if commit history could not be retrieved. Use an explicit unavailable state instead of displaying a fabricated count.

### 11.2 First and last commit dates

Example:

`Mar 15, 2025 → Apr 28, 2025`

Place a small calendar icon before the date range.

Requirements:
- Display the earliest qualifying commit date first.
- Display the latest qualifying commit date second.
- Use the same calendar year as the parent year group.
- Format dates consistently as abbreviated month, day, and year.
- Separate the dates with a subtle arrow.
- Use a muted color for the arrow.
- Do not display timestamps or time zones in the portfolio card.
- Do not use repository `created_at` or `updated_at` as substitutes for commit dates.
- If the first and last commit occur on the same date, display the date once or show the same date on both sides consistently across the application. Prefer displaying it once.

### 11.3 Repository link

Text:

`View repository ↗`

Recommended classes:

`inline-flex w-fit items-center gap-1 text-xs font-medium text-indigo-300 transition hover:text-indigo-200`

Requirements:
- Place the link below the commit metadata.
- Use a small accent-colored label.
- Link directly to the actual repository URL.
- Open external links in a new tab only if the project's link policy requires it.
- If opening a new tab, use `target="_blank"` and `rel="noopener noreferrer"`.
- Do not use a placeholder URL in production.
- Do not show a demo link unless a real demo URL has been provided.

## 12. Year Group Ordering and Membership

Group repositories by calendar year of commit activity.

Sort year groups in descending order:
- Newest year first.
- Oldest year last.

Within each year, use an explicitly curated display order if available. Otherwise, sort by the latest qualifying commit date within that year, descending.

A repository may appear in multiple years if it has qualifying commits in each year.

For example, a repository with commits in 2023, 2024, and 2025 should be represented in all three year groups. Its commit count and first/last commit dates must be calculated independently for each year.

The repository count displayed next to a year must count unique repositories in that group, not individual commits.

Do not include a repository in a year group if it has no qualifying commit in that year.

## 13. GitHub Data Requirements

Use the GitHub API or a trusted server-side data retrieval process to obtain repository and commit metadata.

For each repository/year pair, calculate:

- `year`
- `commitCount`
- `firstCommitDate`
- `lastCommitDate`

The date range must be based on commit timestamps, not repository creation or update metadata.

### Commit date definition

Use one consistent timestamp convention throughout the application. Prefer the GitHub commit's author date for the activity display if the product intends to represent when the author created the commit. If the product instead intends to represent when the commit entered repository history, use the committer date. Do not silently mix these two definitions.

For reproducibility, document the selected timestamp field in the data layer.

Use a consistent time zone when assigning commits to calendar years. UTC is a straightforward default. Do not allow browser-local time-zone differences to move a commit into a different year.

### API considerations

- Handle pagination when listing repositories and commits.
- Respect GitHub API rate limits.
- Cache repository and commit metadata where practical.
- Handle deleted, private, archived, or inaccessible repositories without crashing the page.
- Do not expose personal access tokens in client-side code.
- If a private token is required, use a server-side environment variable.
- Do not assume one API response contains the full commit history.
- Define the commit scope clearly. For a personal portfolio, counting commits authored by the portfolio owner may be more appropriate than counting every commit in a shared repository. Apply the same rule to the count and date range.
- Do not treat commit history as proof of sole ownership or contribution. Display the scope accurately.

## 14. Data Model Recommendation

Use a normalized repository record plus a year-specific activity record.

Illustrative TypeScript structure:

```ts
type PortfolioRepository = {
  id: string;
  owner: string;
  name: string;
  url: string;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
  displayOrder?: number;
};

type RepositoryYearActivity = {
  repositoryId: string;
  year: number;
  commitCount: number;
  firstCommitDate: string;
  lastCommitDate: string;
};

type ProjectHistoryYear = {
  year: number;
  repositories: Array<{
    repository: PortfolioRepository;
    activity: RepositoryYearActivity;
  }>;
};
```

These are planning-level types, not a requirement to introduce a database. Static JSON is sufficient for an initial portfolio if the data is curated and refreshed manually.

Do not create a complex database schema, background job system, or separate microservice unless a real requirement justifies it.

## 15. Footer

Place a minimal footer after the timeline.

Recommended classes:

`mt-16 border-t border-slate-800 pt-6`

Text:

`Sample content only. Replace project details, commit dates, counts, technologies, and links with verified GitHub data.`

Recommended text classes:

`text-xs text-slate-500`

Requirements:
- Add a subtle top border.
- Use `24px` top padding after the border.
- Keep the text small and muted.
- Do not add a second navigation area.
- In production, replace the sample note with an appropriate copyright line or remove the note entirely.

## 16. Responsive Behavior

### Small screens

- Use a single-column year group.
- Place the year heading above its repository cards.
- Stack card metadata below repository information.
- Keep technology badges wrapping naturally.
- Prevent horizontal overflow.
- Preserve the order of title, description, technologies, commit metadata, and repository link.
- Keep cards full width.

### Medium screens and above

- Place the year marker in a dedicated left column.
- Place repository cards in the right column.
- Keep the year heading vertically aligned near the top of its first card.
- Use the timeline dot and optional connector line.
- Keep repository cards within the main container.

### Large screens

- Place repository information on the left side of each card.
- Place commit count, date range, and repository link on the right side.
- Keep the metadata column compact.
- Avoid stretching descriptions across the entire card.
- Preserve readable whitespace.

## 17. Accessibility

- Use semantic `<main>`, `<header>`, `<section>`, `<article>`, and heading elements.
- Use a proper heading hierarchy: one `<h1>`, an `<h2>` for each year, and an `<h3>` for each repository.
- Use real anchors for repository links.
- Provide visible keyboard focus styles for interactive elements.
- Mark purely decorative SVG icons with `aria-hidden="true"`.
- Do not rely on color alone to communicate featured status.
- Maintain sufficient contrast between text and background.
- Do not make static metadata appear interactive.
- Ensure responsive layouts do not hide essential commit information.

## 18. Sample Data Rules

Use fictional sample projects only for the initial visual implementation.

Suggested sample groups:
- 2025: E-commerce Platform, Task Management App, Blog Platform.
- 2024: Authentication Service, Personal Finance Mobile App.

Sample commit counts, dates, descriptions, and technologies must be labeled as mock data in development documentation.

Use `https://github.com/` only as a temporary placeholder during the mockup phase. Replace it with the exact repository URL before production.

Do not claim the sample projects belong to the actual user.

## 19. Out of Scope

Do not implement the following unless requested separately:

- Authentication or account management.
- Repository write operations.
- GitHub OAuth.
- Admin dashboard.
- Database-backed content management.
- Project search and filtering.
- Pagination UI.
- Infinite scrolling.
- Charts and contribution heatmaps.
- Repository statistics beyond the specified commit count and date range.
- Live polling.
- Background synchronization workers.
- AI-generated project descriptions.
- Complex animation systems.

## 20. Acceptance Criteria

The implementation is complete when:

- [ ] The page displays repository history grouped by calendar year.
- [ ] Year groups are ordered from newest to oldest.
- [ ] Each repository appears in every year in which it has qualifying commits.
- [ ] Each year group displays the number of unique repositories in that group.
- [ ] Each repository card displays its title and description.
- [ ] Each card displays the project's technology badges.
- [ ] Each card displays the commit count for the selected year.
- [ ] Each card displays the first and last qualifying commit dates for that year.
- [ ] Commit dates are not derived from repository `created_at` or `updated_at`.
- [ ] Commit-count and date-range calculations use a consistent commit scope and timestamp convention.
- [ ] Each card has a working link to its real repository.
- [ ] Featured badges appear only on explicitly selected projects.
- [ ] The page follows the specified dark color palette.
- [ ] The timeline uses a dedicated year column on desktop.
- [ ] The page becomes a single-column layout on small screens.
- [ ] Cards do not overflow horizontally.
- [ ] Loading, missing-data, and API-error states do not fabricate commit information.
- [ ] No unnecessary backend, database, or UI dependency is introduced.
- [ ] All fictional sample data is replaced or clearly identified before production.

## 21. Final Implementation Principle

Prioritize accurate commit history, clear chronology, readable repository cards, and maintainable data mapping.

The page is a curated development history, not a raw dump of GitHub API responses. GitHub provides verifiable repository and commit metadata; portfolio-specific descriptions, featured status, technology summaries, and display order should remain under explicit editorial control.
