## Why

The app has no access control — anyone can view and modify todos. Adding a simple mock authentication layer gates the app behind a login, demonstrating auth patterns and preparing for future user-scoped data.

## What Changes

- Add a login page with username/password form
- Mock authentication using hardcoded credentials stored in a config/constants file
- Session state managed via a simple auth context (no JWT, no cookies — in-memory React context, reset on refresh)
- Protect the todo page behind authentication
- Toggle between login/logout states in the UI

## Capabilities

### New Capabilities
- `user-auth`: Login/logout flow with mock credentials, auth state management, and route gating

### Modified Capabilities
<!-- No existing capabilities to modify -->

## Impact

- New file: `app/context/AuthContext.tsx` — auth state provider
- New file: `app/app/login/page.tsx` — login page
- New file: `app/lib/auth.ts` — mock credentials store and validation
- Modified: `app/app/layout.tsx` — wrap with AuthProvider
- Modified: `app/app/page.tsx` — protect behind auth check
- No database changes (mock auth)
- No new dependencies
