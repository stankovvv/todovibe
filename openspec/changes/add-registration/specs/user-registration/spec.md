## ADDED Requirements

### Requirement: User can register a new account
The system SHALL provide a registration page at `/register` where a user can create an account with a username and password.

#### Scenario: Successful registration
- **WHEN** user enters a new unique username, a password, confirms the password, and submits
- **THEN** the account is created and user is redirected to the login page with a success message

#### Scenario: Duplicate username
- **WHEN** user enters a username that already exists
- **THEN** an error message is displayed and the account is not created

#### Scenario: Password confirmation mismatch
- **WHEN** user enters non-matching passwords
- **THEN** an error message is displayed and the account is not created

#### Scenario: Empty fields
- **WHEN** user submits the form with empty username or password
- **THEN** an error message is displayed and the account is not created

### Requirement: User can select role during registration
The system SHALL provide an optional checkbox during registration to create the account as an admin.

#### Scenario: Register as admin
- **WHEN** user checks "Register as admin" and submits valid registration
- **THEN** the new account has `isAdmin: true`

#### Scenario: Register as regular user
- **WHEN** user leaves "Register as admin" unchecked and submits valid registration
- **THEN** the new account has `isAdmin: false`

### Requirement: Login page links to registration
The login page SHALL provide a link to the registration page for users who don't have an account.

#### Scenario: Navigate to registration from login
- **WHEN** user clicks "Create an account" link on the login page
- **THEN** they are navigated to `/register`

### Requirement: Registration shows success message on redirect
After successful registration, the login page SHALL display a success banner when redirected with a `registered` query parameter.

#### Scenario: Success message after registration
- **WHEN** user is redirected to `/login?registered=1` after successful registration
- **THEN** a success message is displayed on the login page
