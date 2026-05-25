## ADDED Requirements

### Requirement: User can log in with mock credentials
The system SHALL provide a login page where users authenticate using a predefined username and password. Credentials SHALL be validated against a hardcoded set in a constants file.

#### Scenario: Successful login with valid credentials
- **WHEN** user enters a valid username and matching password on the login page
- **THEN** user is redirected to the main todo page

#### Scenario: Failed login with invalid credentials
- **WHEN** user enters an incorrect username or password
- **THEN** an error message is displayed and the user remains on the login page

### Requirement: User can log out
The system SHALL provide a logout mechanism that clears the current auth state and returns the user to the login page.

#### Scenario: Logout from todo page
- **WHEN** user clicks the logout button on the todo page
- **THEN** auth state is cleared and user is redirected to the login page

### Requirement: Todo page is protected behind authentication
The main todo page SHALL redirect unauthenticated users to the login page.

#### Scenario: Unauthenticated user visits todo page
- **WHEN** an unauthenticated user navigates to `/`
- **THEN** they are redirected to `/login`

#### Scenario: Authenticated user visits todo page
- **WHEN** an authenticated user navigates to `/`
- **THEN** the todo page renders normally

### Requirement: Auth state is ephemeral
Auth state SHALL be held in React Context (in-memory) and SHALL NOT persist across page refreshes.

#### Scenario: Page refresh clears auth
- **WHEN** an authenticated user refreshes the browser
- **THEN** auth state is cleared and user must log in again
