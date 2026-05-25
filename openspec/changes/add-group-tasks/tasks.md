## 1. Database models

- [x] 1.1 Add `User`, `Group`, `GroupMember`, and `GroupTodo` models to `prisma/schema.prisma`
- [x] 1.2 Run `prisma migrate dev` to apply schema changes
- [x] 1.3 Create `prisma/seed.ts` with initial users (admin/admin123, user/password)
- [x] 1.4 Configure seed script in prisma.config.ts

## 2. DB-backed auth

- [x] 2.1 Update `lib/auth.ts` to validate credentials against `User` table via Prisma
- [x] 2.2 Update `context/AuthContext.tsx` to include `userId` and `isAdmin` in auth state
- [x] 2.3 Update login page to work with async DB validation

## 3. Group management API

- [x] 3.1 Create `app/api/groups/route.ts` — GET (list) and POST (create) groups
- [x] 3.2 Create `app/api/groups/[id]/members/route.ts` — GET, POST, DELETE members
- [x] 3.3 Create `app/api/users/route.ts` — GET list of users

## 4. Group tasks API

- [x] 4.1 Create `app/api/groups/[id]/tasks/route.ts` — GET, POST, PUT, DELETE for group-scoped todos
- [x] 4.2 Wire group task API to Prisma `GroupTodo` model

## 5. Admin dashboard

- [x] 5.1 Create `app/admin/page.tsx` — admin-only page with user list and group management UI
- [x] 5.2 Add auth guard and admin check redirect on `/admin`

## 6. Tab switcher on main page

- [x] 6.1 Add tab switcher UI ("My Tasks" / "Group Tasks") to `page.tsx`
- [x] 6.2 Implement group tasks view that fetches and renders group-scoped todos
- [x] 6.3 Allow creating, editing, and deleting group tasks from the group view

## 7. Verify

- [x] 7.1 Run `prisma db seed` and verify users are created
- [x] 7.2 Build check — no type or compilation errors
- [x] 7.3 Manual test: login as admin, create group, add user
- [x] 7.4 Manual test: login as regular user, see group tasks
- [x] 7.5 Manual test: tab switch between personal and group tasks
