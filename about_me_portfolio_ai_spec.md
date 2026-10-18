# About Me Portfolio Section — AI Agent Implementation Specification

## 1. Objective

Build a polished, responsive **About Me** page section for a personal frontend developer portfolio. Match the reference composition closely: a dark profile hero at the top, followed by a light “Work & Education History” section with a clickable vertical timeline on the left and a detail card on the right.

Use **HTML, Tailwind CSS v4, and vanilla JavaScript**. The page should be visually accurate, accessible, responsive, and functional. Use Tailwind CSS v4 conventions. A CDN-based setup is acceptable for a standalone prototype; for production, use the official Tailwind build workflow.

## 2. Overall Page Structure

At a desktop viewport of approximately **1536 × 1024 px**, use a centered content container with a maximum width of about **1280 px**. The main content starts around **128 px from the left edge** and ends around **128 px from the right edge**.

The page consists of three horizontal regions:

1. **Top navigation:** dark background, approximately 66 px tall.
2. **Profile hero:** dark background, approximately 285 px tall, directly below the navigation.
3. **Journey/history section:** light near-white background, beginning around y = 351 px and filling the remainder of the viewport.

Use a clean sans-serif typeface such as Inter. Keep corners moderately rounded, borders subtle, shadows restrained, and the blue accent consistent throughout.

## 3. Top Navigation

### Position and dimensions
- Full viewport width.
- Height: approximately **66 px**.
- Background: very dark blue-gray, such as `#171e28`.
- Add a subtle 1 px bottom border in a slightly lighter dark gray.
- Inner container: max-width approximately **1280 px**, centered horizontally.
- Align all navigation items vertically in the center.

### Left: Brand
- Position at the far left of the inner container.
- Display a small blue geometric/cube-like logo, approximately **22–24 px** square.
- Place the brand name **“Rizki.”** immediately to the right, with about **8 px** gap.
- Brand text: white, bold, approximately **21–22 px**.
- Treat the logo and brand name as one linked brand element.

### Center: Navigation links
- Place the navigation group around the horizontal center of the viewport.
- Links, in this exact order: **Home**, **About**, **Projects**, **Blog**, **Contact**.
- Use approximately **34–38 px** horizontal spacing between link labels.
- Font size: approximately **14 px**.
- Inactive links: muted blue-gray, around `#aab8cc`.
- Active link: **About**, in a brighter blue, around `#68a0ff`.
- Add a short blue underline beneath “About”, approximately **38 px** wide and **2 px** tall, with a little separation from the text.
- Keep the links on one horizontal line at desktop sizes.

### Right: Theme button
- Align a compact square button at the far right of the inner container.
- Size: approximately **36 × 36 px**.
- Transparent/dark background, subtle gray-blue border, and **9–10 px** corner radius.
- Center a small moon icon inside.
- Use a real button element with an accessible label such as “Toggle theme”. The button may be decorative if theme switching is outside the scope, but it must not look like an unclickable text glyph.

## 4. Profile Hero

### Position and background
- Full viewport width.
- Height: approximately **285 px** on desktop.
- Background matches the navigation region, around `#171e28`.
- Inner container: same centered max-width of approximately **1280 px**.
- Use a three-part horizontal composition:
  1. Introductory text on the left.
  2. Circular portrait in the middle-right.
  3. Profile facts on the far right.

Vertically center all three groups in the hero. Leave generous empty space between the text block and portrait.

### Left: Introductory text
- Width: approximately **500–540 px**.
- Place it at the left edge of the content container.
- Add a small pill above the main heading:
  - Text: **“About Me”**
  - Height: approximately **31 px**.
  - Horizontal padding: approximately **16 px**.
  - Rounded-pill shape.
  - Muted blue translucent background, such as `#243b60`.
  - Blue text, approximately **13–14 px**, medium weight.
- Place the main heading around **18–24 px** below the pill.
- Heading text: **“Hi, I’m Rizki”**
  - Font size: approximately **50–52 px** on desktop.
  - Line height: approximately **1.1**.
  - Font weight: bold, around 700–800.
  - “Hi, I’m” is near-white.
  - “Rizki” uses the blue accent, around `#4f83ff`.
  - Keep the entire heading on one line at desktop widths.
- Place the introductory paragraph approximately **12–16 px** below the heading.
- Paragraph text:
  > I’m a Frontend Developer with a passion for building beautiful, fast, and accessible web experiences. I love turning ideas into interactive products that make an impact.
- Set the paragraph width to approximately **470–500 px**.
- Font size: **16 px**.
- Line height: approximately **26 px**.
- Text color: muted light blue-gray, around `#c0cde0`.
- At the reference desktop width, wrap the paragraph into approximately three lines.

### Center-right: Profile photo
- Use a real portrait image, not an emoji or a generic icon.
- Position the photo to the right of the intro text and before the facts column.
- Approximate desktop size: **192 × 192 px**.
- Crop to a perfect circle using `border-radius: 9999px` / Tailwind `rounded-full`.
- Use `object-fit: cover` and center the crop on the face.
- The photo background should be neutral gray or a similarly unobtrusive tone.
- Keep the image vertically centered within the hero.
- Use a portrait showing a young male developer in a black hoodie, facing slightly toward the left. If no real portrait is supplied, use a clearly replaceable placeholder image and document where to swap it.
- Provide meaningful alt text, e.g. `Portrait of Rizki Ramadhan`.

### Far right: Profile facts
- Place a narrow facts column to the right of the portrait.
- Approximate width: **280–300 px**.
- Each fact is a horizontal row with an icon column and a text column.
- Use four rows, ordered as follows:
  1. Person icon — label **Name**, value **Rizki Ramadhan**
  2. Location-pin icon — label **Location**, value **Yogyakarta, Indonesia**
  3. Envelope icon — label **Email**, value **rizki@example.com**
  4. Code icon — label **Role**, value **Frontend Developer**
- Icon column: approximately **22 px** wide, with a gap of **24–28 px** before the text.
- Use thin-line icons in muted light blue, approximately **19–21 px**.
- Each row’s label should be small, around **12 px**, in muted blue-gray.
- Each row’s value should be around **13 px**, in near-white.
- Keep approximately **17–20 px** of vertical separation between rows.
- Ensure the facts column does not collide with the portrait or the hero’s right edge.

## 5. Journey / Work and Education History Section

### Section background and container
- Begins immediately after the dark hero, around **y = 351 px** at the reference viewport.
- Background: very light gray-white, around `#f8fafc` or `#f9fafb`.
- Content container: same max-width of approximately **1280 px**, centered.
- Top padding: approximately **40–44 px**.
- Bottom padding: approximately **38–40 px**.
- Use a two-column layout:
  - **Left timeline column:** approximately **660–690 px** wide.
  - **Right detail card column:** approximately **563 px** wide.
  - Gap between columns: approximately **32 px**.
- Align the top of the right detail card with the section heading area, with the card starting around **y = 395 px** at the reference viewport.

### Left column: Section heading
- Place a small uppercase eyebrow label first:
  - Text: **“MY JOURNEY”**
  - Font size: approximately **12 px**.
  - Font weight: semibold.
  - Letter spacing: approximately **0.08em**.
  - Color: muted slate-blue, around `#60728e`.
- Place the main section heading approximately **8–10 px** below the eyebrow:
  - Text: **“Work & Education History”**
  - Font size: approximately **28–30 px**.
  - Font weight: bold, around 700.
  - Color: deep navy, around `#111c2e`.
- Place a supporting sentence approximately **8 px** below the heading:
  > A timeline of my journey, from learning to building real-world products.
- Font size: approximately **14–15 px**.
- Color: muted slate-blue, around `#60728e`.
- Keep the heading and supporting text aligned to the left edge of the timeline column.

## 6. Interactive Timeline

### Layout and alignment
- Start the first timeline row approximately **34–38 px below** the supporting sentence.
- The timeline is a vertical list of five entries.
- Each entry has three visual zones:
  1. Date range on the left.
  2. A vertical line and circular marker near the center-left.
  3. A clickable event row to the right of the marker.
- Date column width: approximately **145 px**.
- Marker/line axis: approximately **155 px** from the left edge of the timeline column.
- Event row begins approximately **185 px** from the left edge of the timeline column.
- Event row width: approximately **506 px**.
- Keep the date text vertically aligned with the center of each corresponding event row.
- Each event row is approximately **71 px** tall, with about **15–16 px** of vertical space between rows.
- The full timeline extends down to approximately **y = 968 px** in the reference viewport.

### Vertical line and markers
- Draw a thin vertical line behind the markers, around **1–2 px** wide.
- Color: pale slate gray, around `#d9e1ec`.
- The line runs from the center of the first marker to the center of the last marker.
- Each marker is a circle approximately **13–14 px** in diameter.
- Inactive markers: white fill with a **2 px** pale slate border.
- Active marker: solid blue fill, around `#4f83ff`, with no visible pale border.
- Place markers directly on the vertical line and center them precisely.

### Timeline entries and exact content
Use these five entries in this exact order, newest first:

1. **Date:** `Sep 2021 – Present`  
   **Title:** `Frontend Developer at TechScale`  
   **Subtitle:** `Full-time · Yogyakarta, Indonesia`  
   **Icon:** briefcase  
   **Category:** Work Experience

2. **Date:** `Jun 2020 – Aug 2021`  
   **Title:** `Web Developer at Kreativa Studio`  
   **Subtitle:** `Full-time · Bandung, Indonesia`  
   **Icon:** briefcase  
   **Category:** Work Experience

3. **Date:** `Jan 2019 – May 2020`  
   **Title:** `Computer Science at Universitas Gadjah Mada`  
   **Subtitle:** `Bachelor’s Degree · Yogyakarta, Indonesia`  
   **Icon:** graduation cap  
   **Category:** Education

4. **Date:** `Aug 2018 – Dec 2018`  
   **Title:** `Frontend Intern at Digitalux`  
   **Subtitle:** `Internship · Jakarta, Indonesia`  
   **Icon:** code  
   **Category:** Internship

5. **Date:** `Jul 2016 – Jun 2018`  
   **Title:** `Senior High School`  
   **Subtitle:** `SMA Negeri 1 Yogyakarta`  
   **Icon:** school  
   **Category:** Education

### Event row styling
- Use a real button for each timeline entry so it is keyboard-accessible.
- Button dimensions: approximately **506 × 71 px** at desktop.
- Use a horizontal layout:
  - Icon tile at the left.
  - Title and subtitle in the middle.
  - Right-pointing chevron at the far right.
- Icon tile: approximately **44 × 44 px**, pale gray-blue background, rounded corners around **10–12 px**.
- Icon: approximately **20–22 px**, deep navy for inactive entries and blue for the active entry.
- Text group starts approximately **16 px** after the icon tile.
- Title font size: approximately **14 px**, semibold, deep navy.
- Subtitle font size: approximately **12–13 px**, muted slate-blue.
- Chevron: approximately **16 px**, placed about **18 px** from the right edge.
- Use a very light blue background and a thin blue-tinted border for the active row.
- Active row background: approximately `#eff4ff`.
- Active row border: approximately `#d9e5ff`.
- Inactive rows: transparent background with a transparent or absent border.
- Use a subtle hover background for inactive rows.
- Do not let long titles overflow; use a sensible line clamp or wrap behavior without increasing the row height unexpectedly.

### Interaction behavior
- The first entry is selected by default on initial page load.
- Clicking an entry updates:
  - The active marker.
  - The active row’s background and border.
  - The icon accent color.
  - The content shown in the detail card on the right.
- The content must update without a page reload.
- Use vanilla JavaScript and a single data structure as the source of truth for both timeline rows and detail-card content.
- Support keyboard activation via Enter and Space through native buttons.
- Add an accessible selected state, such as `aria-pressed="true"` on the active entry.
- Ensure focus styles are visible.

## 7. Right Column: Detail Card

### Position and dimensions
- Align the card near the top of the history section, beside the heading and timeline.
- Approximate desktop dimensions: **563 px wide × 591 px tall**, with height allowed to grow when content requires it.
- Background: white.
- Border: **1 px** pale gray-blue, around `#dfe5ed`.
- Corner radius: approximately **9–10 px**.
- Avoid heavy shadows; a subtle shadow is acceptable but should not dominate.
- Inner padding: approximately **24 px** on all sides.

### Card header
- At the top of the card, create a horizontal header row.
- Left side: a pill category label.
- Right side: company/school identity, consisting of a small logo mark and name.
- Category pill for the selected first item:
  - Text: **“Work Experience”**
  - Light blue background, around `#edf3ff`.
  - Blue text, around `#2867e8`.
  - Font size: approximately **11–12 px**.
  - Rounded-pill shape.
  - Padding: approximately **8 px vertical and 14 px horizontal**.
- Company identity on the right:
  - Small blue geometric logo, approximately **28–30 px**.
  - Company name **“TechScale”** in bold, approximately **16 px**.
  - Align logo and name vertically.
- Keep the header row aligned at both ends, with a flexible gap between the pill and company identity.

### Detail title
- Place the main role/degree title approximately **14–18 px** below the header.
- For the first item, use:
  **“Frontend Developer at TechScale”**
- Font size: approximately **20–21 px**.
- Font weight: bold.
- Color: deep navy, around `#101d32`.
- Line height: approximately **1.25**.

### Metadata row
- Place the metadata row approximately **16–18 px** below the title.
- Display three inline metadata groups:
  1. Briefcase icon + `Full-time`
  2. Location-pin icon + `Yogyakarta, Indonesia`
  3. Calendar icon + `Sep 2021 – Present`
- Use small muted slate-blue icons, around **15–16 px**.
- Text font size: approximately **12–13 px**.
- Gap between groups: approximately **18–22 px**.
- Allow metadata groups to wrap gracefully on narrow screens instead of overflowing the card.

### Description
- Place the paragraph approximately **24–28 px** below the metadata row.
- First item description:
  > I work as a Frontend Developer at TechScale, a growing tech company focused on building digital solutions for businesses. In this role, I’m responsible for developing and maintaining modern web applications using React, Next.js, and Tailwind CSS.
- Font size: approximately **14 px**.
- Line height: approximately **23 px**.
- Color: muted slate-blue, around `#60728e`.
- Use a comfortable line length; avoid text running edge-to-edge without breathing room.

### Key responsibilities
- Place the heading approximately **22–26 px** below the description.
- Heading text: **“Key Responsibilities”**
- Font size: approximately **14 px**.
- Font weight: semibold or bold.
- Color: deep navy.
- Under the heading, display four bullet rows with a small blue check icon:
  - `Developing responsive and accessible web interfaces`
  - `Collaborating with backend developers and designers`
  - `Optimizing performance and user experience`
  - `Maintaining and improving existing features`
- Each bullet row uses a horizontal icon-and-text layout.
- Check icon: approximately **14 px**, blue.
- Text font size: approximately **13 px**.
- Text color: muted slate-blue.
- Vertical gap between rows: approximately **8–10 px**.
- Align all bullet text to the same left edge.

### Technologies used
- Place this section approximately **24–28 px** below the last responsibility.
- Heading text: **“Technologies Used”**
- Font size: approximately **14 px**, semibold.
- Color: deep navy.
- Under the heading, display small pill tags:
  - `React`
  - `Next.js`
  - `Tailwind CSS`
  - `TypeScript`
  - `Git`
- Tags use a pale blue-gray background, rounded-pill shape, and small slate-blue text.
- Font size: approximately **11–12 px**.
- Horizontal padding: approximately **12 px**.
- Vertical padding: approximately **6 px**.
- Use approximately **7–9 px** gaps between tags.
- Allow tags to wrap to another line on smaller screens.

### Quote block
- Place the quote block approximately **24–26 px** below the technology tags.
- Width: full inner card width.
- Background: very light blue, around `#f1f5ff`.
- Corner radius: approximately **8 px**.
- Padding: approximately **16 px**.
- Display a blue quotation-mark icon at the left, with the quote text to its right.
- Quote text:
  > “Great products are built by great teams, and I’m grateful to be part of this journey.”
- Font size: approximately **12 px**.
- Italic text, muted slate-blue color.
- Line height: approximately **20 px**.
- Keep the icon and quote aligned to the top of the text.

## 8. Detail Content for Other Timeline Entries

The card must update meaningfully for every timeline item, not merely change its heading. Use the same card layout, but populate category, organization, title, metadata, description, responsibilities, technologies (where applicable), and quote from the selected entry.

Suggested content:

### Web Developer at Kreativa Studio
- Category: `Work Experience`
- Organization: `Kreativa Studio`
- Metadata: `Full-time` · `Bandung, Indonesia` · `Jun 2020 – Aug 2021`
- Description: Built and maintained responsive websites for client projects, working with designers to translate visual concepts into reliable user interfaces.
- Responsibilities:
  - Implementing responsive page layouts
  - Integrating frontend components with APIs
  - Improving page performance and accessibility
  - Reviewing and fixing UI defects
- Technologies: `HTML` · `CSS` · `JavaScript` · `Bootstrap` · `Git`

### Computer Science at Universitas Gadjah Mada
- Category: `Education`
- Organization: `Universitas Gadjah Mada`
- Metadata: `Bachelor’s Degree` · `Yogyakarta, Indonesia` · `Jan 2019 – May 2020`
- Description: Studied core computer science concepts, software development practices, data structures, and the foundations of web technologies.
- Responsibilities or highlights:
  - Studying programming fundamentals
  - Practicing algorithms and data structures
  - Building coursework projects
  - Collaborating on group assignments
- Technologies or subjects: `Programming` · `Algorithms` · `Databases` · `Web Development`

### Frontend Intern at Digitalux
- Category: `Internship`
- Organization: `Digitalux`
- Metadata: `Internship` · `Jakarta, Indonesia` · `Aug 2018 – Dec 2018`
- Description: Supported the frontend team in implementing website components and refining interfaces for internal and client-facing projects.
- Responsibilities:
  - Building reusable UI components
  - Fixing responsive layout issues
  - Testing pages across screen sizes
  - Learning team development workflows
- Technologies: `HTML` · `CSS` · `JavaScript` · `Git`

### Senior High School
- Category: `Education`
- Organization: `SMA Negeri 1 Yogyakarta`
- Metadata: `High School` · `Yogyakarta, Indonesia` · `Jul 2016 – Jun 2018`
- Description: Completed senior high school while developing an early interest in computers, technology, and problem-solving.
- Highlights:
  - Building foundational analytical skills
  - Exploring computer-related interests
  - Participating in school activities
- Technologies or focus areas: `Mathematics` · `Science` · `Computer Basics`

These are example portfolio details and should be easy to edit in one JavaScript data object. Do not imply that placeholder biographical details are verified facts.

## 9. Responsive Behavior

### Desktop: 1200 px and above
- Keep the navigation on one line.
- Keep the hero’s three-part layout: intro, portrait, facts.
- Keep the timeline and detail card side by side.
- Preserve the approximate desktop proportions and spacing described above.

### Tablet: 768–1199 px
- Reduce the outer container padding.
- Scale down the portrait to approximately **150–165 px**.
- Reduce the hero heading to approximately **40–44 px**.
- Keep profile facts legible; if needed, place facts below or beside the portrait rather than allowing collisions.
- History section may use a **55/45** or similar column split, with a smaller gap.
- Reduce timeline event-row width and allow long titles to wrap carefully.

### Mobile: below 768 px
- Navigation must remain usable. Keep the brand visible and either wrap, compact, or hide nonessential navigation links behind a clearly labeled menu button.
- Change the hero to a vertical layout:
  1. Intro text
  2. Portrait and/or profile facts
- Center the portrait only if it improves the layout; do not let it push the introduction too far down.
- Reduce heading size to approximately **34–38 px**.
- Make the paragraph full-width within the content padding.
- Stack the history section into one column.
- Place the detail card **below** the timeline list, or above it only if the implementation explicitly prioritizes the selected item. Default to timeline first, card second for a natural reading flow.
- Adapt each timeline row:
  - Date stays readable and does not overlap the marker.
  - Event button fills the available width.
  - Long titles may wrap.
- Reduce card padding to approximately **18–20 px**.
- Metadata and tags must wrap.
- Avoid horizontal scrolling at all viewport widths.

## 10. Visual Design Tokens

Use these approximate values consistently:

| Token | Value | Purpose |
|---|---|---|
| `--color-hero` | `#171e28` | Navigation and hero background |
| `--color-heading` | `#101d32` | Main headings on light backgrounds |
| `--color-accent` | `#4f83ff` | Active state and highlights |
| `--color-accent-text` | `#2867e8` | Blue text on pale backgrounds |
| `--color-body` | `#60728e` | Secondary body text |
| `--color-hero-body` | `#c0cde0` | Hero paragraph text |
| `--color-border` | `#dfe5ed` | Card and control borders |
| `--color-surface` | `#ffffff` | Detail card surface |
| `--color-page` | `#f8fafc` | History section background |
| `--color-active-row` | `#eff4ff` | Selected timeline item |
| `--color-quote` | `#f1f5ff` | Quote block background |

Use spacing and sizing close to an 8 px rhythm, but preserve the specific measurements above where the reference composition depends on them.

## 11. Accessibility and Implementation Requirements

- Use semantic landmarks: `header`, `nav`, `main`, `section`, and appropriate headings.
- Use a single `h1` for **“Hi, I’m Rizki”** and an `h2` for **“Work & Education History”**.
- Use actual buttons for timeline items and a real anchor for the brand.
- Provide visible keyboard focus states.
- Ensure active and inactive states differ through more than color alone, such as border/background plus `aria-pressed`.
- Provide useful alt text for the portrait.
- Keep text contrast readable on both dark and light backgrounds.
- Do not use clickable `div` elements when a button is appropriate.
- Use inline SVGs or a consistent icon library for icons. Do not mix unrelated icon styles.
- Store timeline data in one JavaScript array/object and render both the timeline list and detail card from that source.
- Do not duplicate separate hard-coded content for the selected card.
- Keep all example profile information, image URLs, and organization logos easy to replace.
- Add comments around major page regions so another developer can edit the layout quickly.
- Do not add unrelated sections, large decorative gradients, excessive animations, or oversized shadows. The goal is to reproduce the reference’s restrained, professional composition.

## 12. Acceptance Checklist

The implementation is complete when all of the following are true:

- [ ] Dark navigation and hero regions have the correct relative heights.
- [ ] Brand is left-aligned, navigation is centered, and theme control is right-aligned.
- [ ] The hero has the introduction on the left, circular portrait in the middle-right, and four profile facts on the far right.
- [ ] The main heading has white text with the name highlighted in blue.
- [ ] The history section uses a near-white background and a two-column desktop layout.
- [ ] The timeline contains all five entries in newest-first order.
- [ ] Dates, marker line, event buttons, icons, titles, subtitles, and chevrons are aligned as specified.
- [ ] The first entry is selected by default.
- [ ] Clicking each entry updates both the active timeline state and the detail card.
- [ ] The detail card includes the category pill, organization identity, title, metadata, description, responsibilities/highlights, tags, and quote block where relevant.
- [ ] The design responds cleanly to tablet and mobile widths.
- [ ] There is no unintended horizontal overflow.
- [ ] Keyboard interaction and visible focus states work.
- [ ] Placeholder assets and personal details are clearly replaceable.

**Final instruction to the AI agent:** Implement the page according to this specification with close attention to relative positioning, spacing, text hierarchy, proportions, and the timeline-to-card interaction. Favor a faithful, clean implementation over creative reinterpretation.
