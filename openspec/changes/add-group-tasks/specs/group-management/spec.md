## ADDED Requirements

### Requirement: Admin can create a group
The system SHALL allow an admin user to create a named group. The admin becomes the group owner.

#### Scenario: Admin creates a group
- **WHEN** an admin fills in a group name and submits the create form
- **THEN** the group is created and appears in the group list

### Requirement: Admin can add users to a group
The system SHALL allow an admin to add registered users to a group as members.

#### Scenario: Admin adds a user to a group
- **WHEN** an admin selects a group and adds a user by username
- **THEN** the user becomes a member of that group

#### Scenario: Duplicate member is rejected
- **WHEN** an admin tries to add a user who is already a group member
- **THEN** an error is displayed and the user is not added

### Requirement: Admin can remove users from a group
The system SHALL allow an admin to remove a user from a group.

#### Scenario: Admin removes a user from a group
- **WHEN** an admin removes a user from a group
- **THEN** the user is no longer a member and cannot see the group's tasks

### Requirement: Group list is visible to admin
The system SHALL display all groups and their member counts to the admin.

#### Scenario: Admin views group list
- **WHEN** an admin navigates to the admin dashboard
- **THEN** they see a list of all groups with member counts
