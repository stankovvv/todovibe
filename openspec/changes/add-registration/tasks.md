## 1. Registration API

- [x] 1.1 Create `app/api/auth/register/route.ts` — POST endpoint that creates a new user, checks for duplicates, returns errors

## 2. Registration page

- [x] 2.1 Create `app/register/page.tsx` with username, password, confirm password fields, admin checkbox, and error display

## 3. Login page updates

- [x] 3.1 Add "Create an account" link below the login form
- [x] 3.2 Handle `?registered=1` query param to show success banner on login page

## 4. Verify

- [x] 4.1 Build check — no type or compilation errors
- [x] 4.2 Manual test: register a new user and log in
- [x] 4.3 Manual test: duplicate username shows error
- [x] 4.4 Manual test: password mismatch shows error
- [x] 4.5 Manual test: register as admin and verify admin access
