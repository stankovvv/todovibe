## 1. Dark mode CSS

- [x] 1.1 Add `[data-theme="dark"]` CSS custom property overrides in `globals.css`
- [x] 1.2 Add smooth transition on themed properties

## 2. Inline theme script

- [x] 2.1 Add inline `<script>` in `layout.tsx` `<head>` that sets `data-theme` from localStorage or `prefers-color-scheme` before React hydrates

## 3. Theme context

- [x] 3.1 Create `context/ThemeContext.tsx` with React Context providing `theme` and `toggleTheme` (reads initial state from `data-theme` attribute)

## 4. Toggle button

- [x] 4.1 Add a theme toggle button (sun/moon icons) to the header in `page.tsx`
- [x] 4.2 Wire toggle to `ThemeContext` to switch themes and persist to localStorage

## 5. Verify

- [x] 5.1 Build check — no type or compilation errors
- [x] 5.2 Manual test: toggle switches theme visually
- [x] 5.3 Manual test: preference persists on refresh
- [x] 5.4 Manual test: first visit respects system preference
- [x] 5.5 Manual test: no flash of wrong theme on load
