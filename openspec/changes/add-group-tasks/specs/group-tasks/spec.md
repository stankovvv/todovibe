## ADDED Requirements

### Requirement: User can view their group's tasks
The system SHALL display group-scoped todos to members of the group. A user sees only tasks belonging to groups they are a member of.

#### Scenario: User views group tasks tab
- **WHEN** a group member navigates to the group tasks tab
- **THEN** they see all todos belonging to their groups

#### Scenario: Non-member cannot see group tasks
- **WHEN** a user who is not a member of any group navigates to the group tasks tab
- **THEN** they see an empty state or "no groups" message

### Requirement: Member can add group tasks
The system SHALL allow group members to create new tasks within their group.

#### Scenario: Member adds a group task
- **WHEN** a group member submits a new task in the group tasks view
- **THEN** the task is added to the group and visible to all members

### Requirement: Member can edit and delete group tasks
The system SHALL allow group members to edit the title of or delete tasks within their group.

#### Scenario: Member edits a group task
- **WHEN** a group member edits a group task's title
- **THEN** the title is updated for all members

#### Scenario: Member deletes a group task
- **WHEN** a group member deletes a group task
- **THEN** the task is removed from the group's task list

### Requirement: Main page has a tab switcher
The main todo page SHALL provide a tab switcher to toggle between "My Tasks" (personal flat todos) and "Group Tasks" (group-scoped todos).

#### Scenario: Switch between task views
- **WHEN** user clicks the "Group Tasks" tab
- **THEN** the view switches to show group tasks
- **WHEN** user clicks the "My Tasks" tab
- **THEN** the view switches back to personal tasks
