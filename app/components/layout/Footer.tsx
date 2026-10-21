// ===== Footer: copyright left, version/status right =====
// Semantic HTML, Tailwind CSS v4 utilities only. Dark mode via dark: variants.
// Spec: footer-component-specification.md

export function Footer() {
  return (
    <footer className="border-t border-gray-200 px-4 py-4 dark:border-gray-800 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Copyright (left) */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; 2026 Dohar Siregar. All rights reserved.
        </p>

        {/* Version/status group (right) */}
        <div className="flex flex-col items-end gap-1">
          {/* Version row */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 line-through">v1.0.0</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">v1.3.1</span>
          </div>

          {/* Status row */}
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin"
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
  );
}
