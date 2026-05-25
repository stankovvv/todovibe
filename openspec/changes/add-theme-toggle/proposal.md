## Why

The todo app only has a light theme. Users who work in low-light environments or prefer dark interfaces have no way to switch. Adding a theme toggle improves comfort and accessibility.

## What Changes

- Add a toggle button (sun/moon icon) in the header area
- Toggle switches CSS custom properties between light and dark palettes
- Preference persisted in localStorage
- Default respects `prefers-color-scheme` media query on first visit
- Smooth transition between themes

## Capabilities

### New Capabilities
- `theme-toggle`: Light/dark mode toggle with persistence and system preference detection

### Modified Capabilities
<!-- No existing capabilities to modify -->

## Impact

- Modified: `app/app/globals.css` — add `[data-theme="dark"]` CSS custom property overrides
- Modified: `app/app/layout.tsx` — inject theme script to prevent flash
- Modified: `app/app/page.tsx` — add toggle button to header (or new component)
- New file: `app/context/ThemeContext.tsx` or toggle component
- No new dependencies
