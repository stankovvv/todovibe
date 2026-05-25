## Why

The app is single-user — everyone shares one todo list. Teams need to split into groups with their own tasks, managed by an admin. This adds multi-tenancy: admins create groups, manage users, and group members see only their group's tasks.

## What Changes

- **BREAKING**: Replace mock auth (`lib/auth.ts`) with DB-backed `User` model seeded with credentials
- Add `Group` and `GroupTodo` models to Prisma schema
- Admin dashboard at `/admin` — create groups, add/remove users, see all groups
- Group tab on the main page — users see their group's tasks, not all tasks
- API routes for groups, group membership, and group todos
- Seed script for initial users (`admin`/`admin123` and `user`/`password`)

## Capabilities

### New Capabilities
- `group-management`: Admin CRUD for groups and user-group membership
- `group-tasks`: Group-scoped todos visible only to group members
- `admin-dashboard`: Admin-only page for managing users, groups, and all group tasks

### Modified Capabilities
- `user-auth`: Auth now validates against DB `User` model (not hardcoded constants). Admin flag on User model gates admin routes.

## Impact

- Modified: `prisma/schema.prisma` — add `User`, `Group`, `GroupTodo`, `GroupMember` models
- Modified: `lib/auth.ts` — validate against DB via Prisma instead of hardcoded object
- Modified: `context/AuthContext.tsx` — include `isAdmin` and user id in auth state
- New: `app/admin/page.tsx` — admin dashboard
- New: `app/api/users/route.ts` — list users (admin only)
- New: `app/api/groups/route.ts` — CRUD groups
- New: `app/api/groups/[id]/tasks/route.ts` — group-scoped todos
- New: `app/api/groups/[id]/members/route.ts` — manage members
- Modified: `app/app/page.tsx` — show personal vs group todos with a tab switcher
- New: `prisma/seed.ts` — seed script for initial users
- No new external dependencies
