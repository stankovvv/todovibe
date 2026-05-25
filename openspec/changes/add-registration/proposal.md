## Why

Users can only log in with pre-seeded accounts. There's no way for new users to create an account. Adding self-registration allows anyone to sign up and immediately start using the app.

## What Changes

- Registration page at `/register` with username, password, confirm password, and optional "Register as admin" toggle
- API route `POST /api/auth/register` to create new users
- Link to registration from the login page
- After successful registration, redirect to login page with a success message
- Duplicate username check with inline validation

## Capabilities

### New Capabilities
- `user-registration`: Self-registration page and API, with admin role selection

### Modified Capabilities
<!-- No existing capabilities modified -->

## Impact

- New: `app/app/register/page.tsx` — registration form
- New: `app/app/api/auth/register/route.ts` — user creation API
- Modified: `app/app/login/page.tsx` — add "Create an account" link
- No database changes (User model already exists)
- No new dependencies
