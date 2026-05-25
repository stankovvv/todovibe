## ADDED Requirements

### Requirement: Admin dashboard is accessible at `/admin`
The system SHALL provide an admin dashboard page at `/admin` that is only accessible to users with `isAdmin: true`. Non-admin users SHALL be redirected away.

#### Scenario: Admin visits /admin
- **WHEN** an admin navigates to `/admin`
- **THEN** the admin dashboard renders

#### Scenario: Non-admin visits /admin
- **WHEN** a non-admin user navigates to `/admin`
- **THEN** they are redirected to `/`

### Requirement: Admin dashboard lists all users
The admin dashboard SHALL display all registered users with their username and admin status.

#### Scenario: View user list
- **WHEN** an admin visits the dashboard
- **THEN** they see a table of all users

### Requirement: Admin dashboard lists all groups
The admin dashboard SHALL display all groups with options to manage members.

#### Scenario: View group list
- **WHEN** an admin visits the dashboard
- **THEN** they see a list of all groups with member management actions
