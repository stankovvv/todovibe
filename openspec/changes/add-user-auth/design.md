## Context

The todo app currently has zero auth — anyone who loads the page sees all todos. Adding a mock authentication layer gates access behind a simple login form with hardcoded credentials. This is intentionally simple: no persistent sessions, no database-backed users, no JWT. Auth state lives in React context and resets on page refresh.

## Goals / Non-Goals

**Goals:**
- Users must enter a valid username/password to access the todo page
- Mock credentials defined in a single constants file (easy to change)
- Auth state managed via React Context (in-memory, resets on refresh)
- Login page at `/login`, redirect to `/` after successful login
- Logout button clears state and returns to login page

**Non-Goals:**
- No persistent sessions (cookies, localStorage, etc.)
- No user registration or account management
- No role-based access control
- No API-level auth (no token validation on API routes — API is unprotected by design since this is mock auth)
- No user-scoped data (all users share the same todos)

## Decisions

- **React Context over cookies/localStorage** — Simplest possible approach for a demo/mock scenario. No persistence means security concerns are minimized (refresh = logged out).
- **Hardcoded credentials in a constants file** — Deliberately simple. Credentials live in `lib/auth.ts` as a plain object. No env vars, no database table. Swapping to real auth later means replacing the validation function.
- **Client-side route gating** — The todo page checks auth state on mount and redirects to `/login` if not authenticated. No middleware or server-side checks, consistent with the mock nature.
- **Separate login page at `/login`** — Clean separation from the main app. Uses the same layout shell.

## Risks / Trade-offs

- [No persistence] Refresh loses auth state — intentional for mock, but user must re-login every page load
- [No API auth] A user could hit `/api/todos` directly without logging in — acceptable for a demo, but would need addressing in a real auth system
- [Client-only protection] Auth check runs on the client, so there's a flash of unprotected content before the redirect renders
