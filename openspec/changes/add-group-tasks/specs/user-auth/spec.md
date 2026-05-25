## MODIFIED Requirements

### Requirement: User can log in with mock credentials
The system SHALL provide a login page where users authenticate using a username and password. Credentials SHALL be validated against the `User` table in the database (not a hardcoded constants file).

#### Scenario: Successful login with valid credentials
- **WHEN** user enters a valid username and matching password on the login page
- **THEN** user is redirected to the main todo page

#### Scenario: Failed login with invalid credentials
- **WHEN** user enters an incorrect username or password
- **THEN** an error message is displayed and the user remains on the login page

## ADDED Requirements

### Requirement: Auth state includes user id and admin flag
The AuthContext SHALL expose `userId` and `isAdmin` in addition to `isAuthenticated`, so that components and API routes can identify the current user and their role.

#### Scenario: Admin user logs in
- **WHEN** an admin user logs in successfully
- **THEN** `isAdmin` is `true` and `userId` contains the user's database ID

#### Scenario: Regular user logs in
- **WHEN** a regular (non-admin) user logs in successfully
- **THEN** `isAdmin` is `false` and `userId` contains the user's database ID
