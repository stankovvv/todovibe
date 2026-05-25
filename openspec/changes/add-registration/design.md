## Context

The app already has DB-backed User model and login. Users are currently created only via the seed script (`admin` and `user`). There's no way for new users to sign up. Registration adds a self-service account creation page with role selection.

## Goals / Non-Goals

**Goals:**
- Registration page at `/register` with username, password, confirm password fields
- Optional checkbox to register as admin
- API endpoint `POST /api/auth/register` that creates the user or returns errors
- Duplicate username returns a clear error
- Link to registration from the login page
- After successful registration, redirect to `/login` with a success flash message
- No admin approval required — registration is instant

**Non-Goals:**
- No email verification
- No password strength requirements beyond non-empty
- No CAPTCHA
- No password reset flow

## Decisions

- **Instant registration** — No approval flow. User creates account and can log in immediately. For a demo this is appropriate; a production app might gate admin registration.
- **Admin registration checkbox** — Any user can mark themselves as admin. Simple for the demo. In production this would be restricted.
- **Success message via query param** — After registration, redirect to `/login?registered=1`. Login page checks the param and shows a success banner.
- **No password hashing** — Consistent with the existing seed approach (plaintext). In production, use bcrypt.

## Risks / Trade-offs

- [Anyone can become admin] The admin checkbox is open to all registrants — acceptable for a demo, but would need gating in production
- [Plaintext passwords] Consistent with existing pattern; should be hashed before production
- [No duplicate username check race] Two simultaneous requests with the same username could both pass the check — mitigated by the unique constraint in DB
