## Context

The app's theming uses CSS custom properties in `globals.css` with a light-only palette in `:root`. The UI already has a header area in the todo page. Adding dark mode means duplicating the palette under `[data-theme="dark"]` and providing a toggle mechanism.

## Goals / Non-Goals

**Goals:**
- Toggle button in the header switches between light and dark
- Preference saved to localStorage and restored on next visit
- First-time visitors default to their OS-level `prefers-color-scheme` setting
- No flash of wrong theme on page load (critical for dark mode users)
- Smooth CSS transition between themes

**Non-Goals:**
- No custom theme colors (only light/dark)
- No server-side theme detection
- No theme-color meta tag changes

## Decisions

- **`data-theme` attribute on `<html>`** — Standard approach. CSS scopes dark vars under `[data-theme="dark"]`. No class name conflicts.
- **Inline `<script>` in layout head** — Prevents flash of light theme. Runs before React hydrates, reads localStorage or `prefers-color-scheme`, sets `data-theme` immediately.
- **React context for the toggle UI** — `ThemeContext` provides `theme` and `toggleTheme` to the toggle button. The context reads the initial value from `document.documentElement` after the inline script has run.
- **localStorage over cookie** — No server needs the value. Simpler, no HTTP overhead.
- **CSS `transition` on `background-color` and `color`** — Smooth but doesn't cause layout thrashing.

## Risks / Trade-offs

- [Flash of wrong theme] Mitigated by inline blocking script in `<head>` — but if script fails, light theme shows briefly
- [No sync across tabs] Theme change only applies to current tab — acceptable for a simple app
