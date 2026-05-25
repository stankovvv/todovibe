## 1. Auth infrastructure

- [x] 1.1 Create `lib/auth.ts` with hardcoded mock credentials and a `validateCredentials` function
- [x] 1.2 Create `context/AuthContext.tsx` with React Context provider for auth state (isAuthenticated, user, login, logout)

## 2. Login page

- [x] 2.1 Create `app/login/page.tsx` with username/password form, error display, and redirect on success

## 3. Route protection

- [x] 3.1 Wrap root layout with AuthProvider in `app/layout.tsx`
- [x] 3.2 Add auth guard to `app/page.tsx` that redirects to `/login` when unauthenticated
- [x] 3.3 Add logout button to the todo page UI

## 4. Verify

- [x] 4.1 Manual test: login with valid credentials
- [x] 4.2 Manual test: login with invalid credentials shows error
- [x] 4.3 Manual test: logout clears state and returns to login
- [x] 4.4 Manual test: refresh clears auth state
- [x] 4.5 Manual test: navigating to `/` without auth redirects to `/login`
