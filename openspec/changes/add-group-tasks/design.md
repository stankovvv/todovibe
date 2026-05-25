## Context

Currently auth is mock/client-only with hardcoded credentials, and todos exist in a single flat table with no user or group association. To support group tasks with an admin dashboard, we need to move user identities into the database, add group and membership models, and scope todos to groups. The existing mock auth becomes a DB-backed auth with a seed script.

## Goals / Non-Goals

**Goals:**
- DB-backed `User` model with username, password (hashed), and `isAdmin` flag
- `Group` model with name and admin ownership
- `GroupMember` join table linking users to groups
- `GroupTodo` model scoped to a group (replaces generic `Todo` for group context)
- Auth validates against DB; AuthContext returns user id + isAdmin
- Admin dashboard (`/admin`) — create groups, list users, add/remove members, view all group tasks
- Main page gains a tab switcher: "My Tasks" (original flat todos) / "Group Tasks" (group-scoped)
- Seed script with `admin`/`admin123` (isAdmin: true) and `user`/`password`

**Non-Goals:**
- No real password hashing (simple hash/seed for demo)
- No user registration UI (admin adds users manually)
- No invitation flow
- No role system beyond admin/regular

## Decisions

- **DB-backed auth over mock** — Necessary for group membership queries and admin checks. AuthContext updated to include `userId` and `isAdmin`. Validation queries the `User` table.
- **Separate `GroupTodo` model over adding `groupId` to `Todo`** — Keeps the original single-user todos intact and avoids migration complexity. Users see both "My Tasks" (Todo) and "Group Tasks" (GroupTodo).
- **Admin dashboard at `/admin`** — Separate route guarded by `isAdmin` flag. Contains group CRUD, user listing, member management.
- **Tab switcher on main page** — Simple `<select>` or button group to toggle between flat todos and group-scoped view.
- **Seed script** — `npx prisma db seed` with `ts-node` or equivalent.

## Risks / Trade-offs

- [Breaking change] Mock auth is removed — existing login page still works but validates against DB. Seed script must run before first login.
- [No real hashing] Passwords stored as plaintext in seed — acceptable for demo, should use bcrypt for production.
- [Migration needed] Existing `dev.db` needs new tables. Users must re-run `prisma migrate dev` and seed.
