# Footer Component Specification

## 1. Purpose

Implement a compact, responsive application footer using HTML and Tailwind CSS v4. The footer displays copyright information on the left and version information with an upgrade status on the right.

This specification defines the exact content, ordering, alignment, spacing, visual treatment, responsive behavior, and implementation constraints. Follow it as written. Do not add extra elements or redesign the component without an explicit requirement.

## 2. Component Layout

The footer contains two top-level regions arranged in one horizontal row:

1. **Copyright text** — aligned to the left.
2. **Version/status group** — aligned to the right.

The version/status group contains two vertically stacked rows:

- **Version row:** previous version `v1.0.0` followed by current version `v1.0.1`.
- **Status row:** a small animated refresh/sync icon followed by the text `Upgrading`.

Conceptual layout:

```text
┌──────────────────────────────────────────────────────────────────────┐
│ © 2026 YourApp. All rights reserved.                 v1.0.0  v1.0.1 │
│                                                            ↻ Upgrading│
└──────────────────────────────────────────────────────────────────────┘
```

The diagram is illustrative. The actual implementation must use the layout and utility classes specified below.

## 3. Exact Content and Order

### 3.1 Copyright

Render this exact text:

`© 2026 YourApp. All rights reserved.`

Implementation text may use the HTML entity `&copy;` instead of the literal copyright character.

- Place the copyright paragraph in the **left region** of the footer.
- Keep it on one line at normal desktop widths.
- Use small, muted text.
- Do not add a logo, link, separator, or additional legal text.
- `YourApp` is a placeholder and should be replaced only if the project has an established application name.

### 3.2 Version row

Render the versions in this exact order:

1. Previous version: `v1.0.0`
2. Current version: `v1.0.1`

Rules:

- Place both versions in the **right region**, on the first row of the version/status group.
- Align the row to the right edge of the footer content.
- Place a horizontal gap of `8px` between the version labels (`gap-2`).
- Display `v1.0.0` in muted gray with a line through the text (`line-through`). It must remain legible but visually secondary.
- Display `v1.0.1` without a strikethrough, using a slightly stronger text color and medium font weight.
- Do not use an arrow, slash, badge, or other separator between the versions.
- Do not reverse the order.

### 3.3 Upgrade status row

Render the status text exactly as:

`Upgrading`

Rules:

- Place the status row **directly below the version row**.
- Align the status row to the right, matching the right edge of `v1.0.1`.
- Place the icon immediately before the status text.
- Use a `4px` horizontal gap between the icon and the text (`gap-1`).
- Use small text (`text-xs`) and medium font weight (`font-medium`).
- Use amber text: `text-amber-600` in light mode and `dark:text-amber-400` in dark mode.
- Use a small refresh/synchronization icon, approximately `12 × 12px`.
- The icon may rotate using `animate-spin` to communicate an active operation. Only keep the animation if an upgrade is genuinely in progress. If the label is informational rather than a live operation, remove `animate-spin` to avoid implying that work is currently happening.
- Do not add a progress bar, percentage, tooltip, button, or click interaction.

## 4. Outer Footer Container

Use a semantic HTML `<footer>` element.

Required classes:

```html
border-t border-gray-200 px-4 py-4 dark:border-gray-800 sm:px-6
```

Requirements:

- `border-t`: render a thin top border; do not add borders to the other sides.
- `border-gray-200`: use a subtle border in light mode.
- `dark:border-gray-800`: use a subtle dark border in dark mode.
- `px-4`: apply `16px` horizontal padding on small screens by default.
- `sm:px-6`: increase horizontal padding to `24px` at the Tailwind `sm` breakpoint and above.
- `py-4`: apply `16px` vertical padding.
- Do not apply a background color unless required by the surrounding application layout. The footer should inherit the page background.

## 5. Inner Layout Container

Inside `<footer>`, use one wrapper `<div>` with these exact classes:

```html
mx-auto flex max-w-7xl items-center justify-between gap-4
```

Requirements:

- `max-w-7xl`: constrain the inner content to Tailwind's `max-w-7xl` maximum width.
- `mx-auto`: center the inner wrapper horizontally when the viewport is wider than the maximum width.
- `flex`: place copyright and version/status regions in one horizontal flex row.
- `items-center`: vertically center the copyright region against the full version/status group.
- `justify-between`: place copyright at the left edge and the version/status group at the right edge.
- `gap-4`: maintain a `16px` minimum gap between the two regions if space is constrained.
- Keep the footer content in normal document flow. Do not make it `fixed` or `sticky` unless the application explicitly requires that behavior.
- Do not add columns, a grid, or extra wrapper elements without a concrete implementation need.

## 6. Copyright Typography

Use a `<p>` element with these classes:

```html
text-sm text-gray-500 dark:text-gray-400
```

Requirements:

- `text-sm`: use Tailwind's small text size.
- `text-gray-500`: use muted gray in light mode.
- `dark:text-gray-400`: use muted gray in dark mode.
- Use normal font weight; do not bold the copyright.
- Do not center the copyright on desktop.
- Do not add decorative icons.

## 7. Version/Status Group

Use a `<div>` with these exact classes:

```html
flex flex-col items-end gap-1
```

Requirements:

- `flex flex-col`: stack the version row above the status row.
- `items-end`: align both rows to the right.
- `gap-1`: use a `4px` vertical gap between the two rows.
- Do not use `items-center`; both rows must share the same right alignment.

### 7.1 Version row container

Use a `<div>` with these classes:

```html
flex items-center gap-2
```

Requirements:

- Keep both version labels on the same row.
- Vertically center the labels relative to one another.
- Use an `8px` gap.
- Do not let either label wrap under normal conditions.

### 7.2 Previous version label

Use a `<span>` with these classes:

```html
text-xs text-gray-400 line-through
```

Requirements:

- Display `v1.0.0`.
- Apply a line-through.
- Keep the text smaller and less prominent than the current version.
- Do not hide the previous version from assistive technology.

### 7.3 Current version label

Use a `<span>` with these classes:

```html
text-sm font-medium text-gray-700 dark:text-gray-200
```

Requirements:

- Display `v1.0.1`.
- Do not apply a line-through.
- Use medium font weight.
- Use a stronger foreground color than the previous version.
- Do not style it as a button or link unless the product requirements explicitly change.

## 8. Upgrade Status Icon and Text

Use a `<span>` wrapper with these classes:

```html
inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400
```

Requirements:

- `inline-flex items-center`: align the icon and status text on the same baseline/center line.
- `gap-1`: use a `4px` gap between the icon and text.
- `text-xs`: keep the status compact.
- `font-medium`: give the status slightly stronger emphasis than normal body text.
- Use amber color in both light and dark themes as specified above.

The icon should be an inline SVG with the following attributes:

```html
width="12"
height="12"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
```

The SVG should depict a recognizable refresh/sync symbol. Keep the icon decorative because the adjacent text already communicates the status; use `aria-hidden="true"` on the SVG.

If animated, apply `animate-spin` to the SVG itself, not to the entire status wrapper. Do not animate the text.

## 9. Responsive Behavior

- Keep the footer's two top-level regions in a single horizontal row at all viewport widths, using the specified `flex` layout.
- Keep the copyright left-aligned and the version/status group right-aligned.
- The version/status group must remain right-aligned on mobile.
- Do not add a mobile-only centered layout or reverse the order.
- `gap-4` provides spacing between the two regions. If the application must support exceptionally narrow widths or long localized copyright text, a separate responsive change may be needed; do not invent that behavior in this implementation.
- Avoid adding `whitespace-nowrap` by default unless the project confirms that wrapping is a problem. Preserve the exact specified content and hierarchy.

## 10. Dark Mode

Use only the specified `dark:` variants:

- Footer border: `dark:border-gray-800`
- Copyright: `dark:text-gray-400`
- Previous version: `text-gray-400` (same class in both modes)
- Current version: `dark:text-gray-200`
- Upgrade status: `dark:text-amber-400`

Do not add a separate dark background to the footer. It should inherit the application's dark-mode surface.

## 11. Reference Implementation

Use the following HTML and Tailwind CSS classes as the baseline implementation:

```html
<footer class="border-t border-gray-200 px-4 py-4 dark:border-gray-800">
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 sm:px-2">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      &copy; 2026 YourApp. All rights reserved.
    </p>

    <div class="flex flex-col items-end gap-1">
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-400 line-through">v1.0.0</span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-200">v1.0.1</span>
      </div>

      <span class="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="animate-spin"
        >
          <path d="M20 7v5h-5" />
          <path d="M4 17v-5h5" />
          <path d="M5.6 9a7 7 0 0 1 11.5-2L20 12" />
          <path d="M4 12l2.9 5a7 7 0 0 0 11.5-2" />
        </svg>
        <span>Upgrading</span>
      </span>
    </div>
  </div>
</footer>
```

### Implementation note

The inner wrapper's required baseline classes are `mx-auto flex max-w-7xl items-center justify-between gap-4`. The `sm:px-2` class in the sample is optional and should be omitted if it conflicts with the surrounding layout's spacing. Prefer the exact container classes in Section 5 and retain horizontal padding on the outer footer.

For the strictest match to the layout specification, use this opening wrapper instead:

```html
<footer class="border-t border-gray-200 px-4 py-4 dark:border-gray-800 sm:px-6">
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
```

## 12. Tailwind CSS v4 Constraints

- Use standard Tailwind CSS utility classes compatible with Tailwind CSS v4.
- Do not add a Tailwind configuration file solely for this component.
- Do not use custom CSS when the required utility classes already provide the behavior.
- Do not add a UI library or icon dependency. The refresh icon is inline SVG.
- Assume the project has already configured Tailwind CSS v4.
- Do not include the Tailwind CDN in the production implementation.

## 13. Acceptance Criteria

The implementation is complete only when all of the following are true:

- [ ] The component uses a semantic `<footer>` element.
- [ ] The footer has only a top border.
- [ ] The copyright appears on the left and reads `© 2026 YourApp. All rights reserved.`
- [ ] The version/status group appears on the right.
- [ ] `v1.0.0` appears before `v1.0.1`.
- [ ] `v1.0.0` is muted and struck through.
- [ ] `v1.0.1` is more prominent and has no strikethrough.
- [ ] `Upgrading` appears directly below the version row.
- [ ] The refresh/sync icon appears immediately before `Upgrading`.
- [ ] The status icon is approximately `12 × 12px`.
- [ ] The status icon spins only when the upgrade is genuinely in progress.
- [ ] Light and dark mode utility classes match this specification.
- [ ] The footer remains a horizontal two-region layout, with copyright left-aligned and version/status right-aligned.
- [ ] No extra buttons, links, progress indicators, badges, or decorative elements are added.
- [ ] The component uses Tailwind CSS v4 utilities and requires no additional dependency.
