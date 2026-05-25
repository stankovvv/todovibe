## ADDED Requirements

### Requirement: User can toggle between light and dark themes
The system SHALL provide a toggle button that switches the app between light and dark color schemes. The current theme SHALL be reflected visually across all UI elements.

#### Scenario: Toggle from light to dark
- **WHEN** user clicks the theme toggle button while in light mode
- **THEN** the app switches to dark mode and the toggle icon changes

#### Scenario: Toggle from dark to light
- **WHEN** user clicks the theme toggle button while in dark mode
- **THEN** the app switches to light mode and the toggle icon changes

### Requirement: Theme preference persists across page loads
The system SHALL save the user's theme preference to localStorage and restore it on subsequent visits.

#### Scenario: Theme persists after page refresh
- **WHEN** user switches to dark mode and refreshes the page
- **THEN** the app loads in dark mode

### Requirement: First visit respects system preference
The system SHALL detect the user's OS-level `prefers-color-scheme` on first visit (when no saved preference exists) and default to that theme.

#### Scenario: System prefers dark mode on first visit
- **WHEN** a user with OS dark mode enabled visits the app for the first time
- **THEN** the app loads in dark mode

#### Scenario: System prefers light mode on first visit
- **WHEN** a user with OS light mode enabled visits the app for the first time
- **THEN** the app loads in light mode

### Requirement: No flash of wrong theme on load
The theme SHALL be applied before React hydrates to prevent a visible flash of one theme before switching to another.

#### Scenario: Dark mode user sees dark theme immediately
- **WHEN** a user with dark mode preference loads the page
- **THEN** the page renders in dark mode without flashing light first
