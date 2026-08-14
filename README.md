# TaskMatrix — Agile Project Management Platform

> **ProDesk IT Capstone Project**  
> Enterprise-style Agile Project Management application for planning projects, managing tasks, coordinating teams, and monitoring workspace performance.

---

## 1. Project Overview

**TaskMatrix** is a full-stack Agile Project Management platform designed to centralize project planning, task management, team collaboration, scheduling, analytics, and account management in a single workspace.

The application follows a modern full-stack architecture with a React/Vite frontend, Redux Toolkit for global state management, an Express.js REST API, JWT authentication, and MongoDB for persistent data storage.

The project is being developed as an enterprise-oriented capstone application with emphasis on:

- Scalable architecture
- Reusable UI components
- Centralized state management
- Secure authentication
- RESTful API integration
- CRUD-based project management
- Responsive user experience
- Maintainable code organization
- Clear technical documentation

---

# 2. Project Selection

| Item | Details |
|---|---|
| Project | TaskMatrix |
| Category | Agile Project Management |
| Project Type | Full-Stack Web Application |
| Designated Track | Frontend / Full-Stack Development |
| Architecture | React + Redux + Express + MongoDB |
| Authentication | JWT |
| Frontend Build Tool | Vite |
| Database | MongoDB |

---

# 3. Sprint Scope

The project follows the ProDesk IT internal RFP selection requirements.

### Selected Application

**Option 3 — TaskMatrix (Agile Project Management)**

### Sprint Phases

| Phase | Priority | Objective | Status |
|---|---|---|---|
| Phase 1 | P0 | Base MVP | Completed |
| Phase 2 | P1 | UI/UX Wireframes | Completed / In Progress |
| Phase 3 | P2 | Architecture & Optimization | In Progress |

---

# 4. Phase 1 — Base MVP

## 4.1 Repository

Required repository naming convention:

```text
prodesk-capstone-TaskMatrix
```

The repository contains the frontend, backend, documentation, and supporting architecture assets.

---

## 4.2 Core MVP Features

### Authentication

- User registration
- User login
- JWT authentication
- Protected API requests
- Authenticated user retrieval
- Logout/session handling

### Dashboard

- Active project statistics
- Total task statistics
- Completed task statistics
- Pending task statistics
- Project progress overview
- Team activity
- Recent tasks
- Quick project creation

### Project Management

- View projects
- Create projects
- Update projects
- Delete projects
- Search projects
- Filter projects by status
- Track project progress
- Track project members
- Track project deadlines
- Track project priority
- Display task completion ratio

### Task Management

- View tasks
- Create tasks
- Update tasks
- Delete tasks
- Task status management
- Task priority management
- Task due dates
- Project association
- Task assignment

### Team Management

- View team members
- Add members
- Manage member information
- Project/member association

### Calendar

- Project deadlines
- Task deadlines
- Date-based workspace visibility

### Analytics

- Project progress
- Task completion
- Pending work
- Workspace-level performance indicators

### Settings

- Account information
- Security settings
- Password management
- Application preferences

---

# 5. Technology Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- React Redux
- React Router
- Lucide React
- CSS

## Backend

- Node.js
- Express.js
- REST API
- JWT
- bcryptjs

## Database

- MongoDB
- Mongoose

## Development & Delivery

- Git
- GitHub
- Vercel / production deployment platform
- Figma
- Draw.io

---

# 6. System Architecture

```text
                         TASKMATRIX
                             |
             +---------------+---------------+
             |                               |
             v                               v
       React Frontend                  Express Backend
             |                               |
             v                               v
       Redux Toolkit                    Controllers
             |                               |
             v                               v
        REST / Fetch                    Mongoose
             |                               |
             +---------------+---------------+
                             |
                             v
                          MongoDB
```

---

# 7. Frontend Architecture

The frontend follows a modular component-driven architecture.

```text
client/
|
+-- public/
|
+-- src/
    |
    +-- assets/
    |
    +-- components/
    |   +-- Navbar
    |   +-- Sidebar
    |   +-- Modal
    |   +-- Reusable UI
    |
    +-- pages/
    |   +-- Login
    |   +-- Register
    |   +-- Dashboard
    |   +-- Projects
    |   +-- Tasks
    |   +-- Team
    |   +-- Calendar
    |   +-- Analytics
    |   +-- Settings
    |
    +-- store/
    |   +-- store.js
    |   +-- authSlice.js
    |   +-- projectsSlice.js
    |   +-- tasksSlice.js
    |   +-- teamSlice.js
    |
    +-- services/
    |
    +-- routes/
    |
    +-- App.jsx
    +-- main.jsx
    +-- index.css
```

---

# 8. Redux State Architecture

Redux Toolkit provides centralized global state.

```text
Redux Store
|
+-- auth
|   +-- user
|   +-- token
|   +-- status
|   +-- error
|
+-- projects
|   +-- items
|   +-- status
|   +-- error
|
+-- tasks
|   +-- items
|   +-- status
|   +-- error
|
+-- team
    +-- members
    +-- status
    +-- error
```

### State Management Principles

Redux is used for shared application data.

React local state is used for temporary UI state such as:

- Modal visibility
- Form values
- Search input
- Filter selection
- Selected records
- Temporary UI interactions

Derived values such as active projects, completed tasks, filtered projects, and pending tasks are calculated from existing state instead of being unnecessarily duplicated.

---

# 9. Authentication Architecture

TaskMatrix uses JWT-based authentication.

```text
Register / Login
      |
      v
Express Auth API
      |
      v
MongoDB User
      |
      v
JWT Token
      |
      v
Frontend
      |
      v
localStorage
      |
      v
Authorization Header
      |
      v
Protected API
```

Authenticated requests use:

```text
Authorization: Bearer <JWT_TOKEN>
```

The backend validates the token before allowing protected operations.

---

# 10. Authentication API

## Register

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Test User",
  "email": "testuser@taskmatrix.com",
  "password": "TestPassword123!"
}
```

Response contains:

- Registration message
- JWT token
- User ID
- User name
- Email
- Role
- Avatar

---

## Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "testuser@taskmatrix.com",
  "password": "TestPassword123!"
}
```

Response contains:

- Login message
- JWT token
- Authenticated user information

---

## Current User

```http
GET /api/auth/me
```

Required header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 11. Project API

Base endpoint:

```text
/api/projects
```

## Get Projects

```http
GET /api/projects
```

Authentication required.

---

## Create Project

```http
POST /api/projects
```

Example:

```json
{
  "name": "Website Redesign",
  "description": "Marketing website redesign and optimization",
  "status": "In Progress",
  "priority": "High",
  "progress": 78,
  "tasks": 18,
  "totalTasks": 24,
  "members": 6,
  "dueDate": "Aug 18, 2026"
}
```

---

## Update Project

```http
PUT /api/projects/:id
```

Authentication required.

---

## Delete Project

```http
DELETE /api/projects/:id
```

Authentication required.

---

# 12. Project CRUD Data Flow

```text
Projects Page
     |
     +---- Create
     |       |
     |       v
     |   createProject()
     |
     +---- Read
     |       |
     |       v
     |   fetchProjects()
     |
     +---- Update
     |       |
     |       v
     |   updateProjectAsync()
     |
     +---- Delete
             |
             v
       deleteProjectAsync()
             |
             v
         REST API
             |
             v
          MongoDB
             |
             v
        Redux Store
             |
             v
        Updated UI
```

---

# 13. Project Data Model

Example project structure:

```json
{
  "_id": "project_id",
  "name": "Website Redesign",
  "description": "Marketing website redesign and optimization",
  "status": "In Progress",
  "priority": "High",
  "progress": 78,
  "tasks": 18,
  "totalTasks": 24,
  "members": 6,
  "dueDate": "Aug 18, 2026",
  "owner": "user_id",
  "createdAt": "2026-08-12T16:40:26.938Z",
  "updatedAt": "2026-08-12T16:40:26.938Z"
}
```

---

# 14. Project Progress Model

Project progress should represent actual task completion.

```text
Completed Tasks
-------------------- × 100
Total Tasks
```

Example:

```text
18 / 24 = 75%
```

New projects should not remain permanently at `0/0`.

When tasks are created or completed, the project statistics should be recalculated so that:

```text
tasks
totalTasks
progress
```

remain synchronized with task data.

---

# 15. Database Architecture

MongoDB is used as the persistent data layer.

Core collections:

```text
MongoDB
|
+-- users
|
+-- projects
|
+-- tasks
|
+-- team_members
```

---

# 16. User Schema

```text
User
|
+-- name
+-- email
+-- password
+-- role
+-- avatar
+-- createdAt
+-- updatedAt
```

Security considerations:

- Passwords are hashed with bcrypt
- Passwords are never returned as plain text
- Email is unique
- JWT is used for authentication

---

# 17. Project Schema

```text
Project
|
+-- name
+-- description
+-- status
+-- priority
+-- progress
+-- tasks
+-- totalTasks
+-- members
+-- dueDate
+-- owner
+-- createdAt
+-- updatedAt
```

---

# 18. Entity Relationship Diagram

The intended relationship model is:

```text
                  +----------------+
                  |     USER       |
                  +----------------+
                  | _id            |
                  | name           |
                  | email          |
                  | password       |
                  | role           |
                  +-------+--------+
                          |
                          | owns
                          |
                          v
                  +----------------+
                  |    PROJECT     |
                  +----------------+
                  | _id            |
                  | name           |
                  | description    |
                  | status         |
                  | priority       |
                  | progress       |
                  | owner          |
                  +-------+--------+
                          |
                          | contains
                          |
                          v
                  +----------------+
                  |      TASK      |
                  +----------------+
                  | _id            |
                  | title          |
                  | status         |
                  | priority       |
                  | dueDate        |
                  | project        |
                  | assignee       |
                  +----------------+
                          |
                          |
                          v
                  +----------------+
                  | TEAM MEMBER    |
                  +----------------+
                  | _id            |
                  | name           |
                  | email          |
                  | role           |
                  +----------------+
```

The final exported Draw.io ERD should be stored under:

```text
docs/architecture/erd.png
```

Embed it in the README:

```markdown
![TaskMatrix ERD](docs/architecture/erd.png)
```

---

# 19. Frontend State Tree Diagram

The final exported state tree should be stored under:

```text
docs/architecture/frontend-state-tree.png
```

Recommended structure:

```text
Store
|
+-- auth
|   +-- user
|   +-- token
|   +-- status
|   +-- error
|
+-- projects
|   +-- items
|   +-- status
|   +-- error
|
+-- tasks
|   +-- items
|   +-- status
|   +-- error
|
+-- team
    +-- members
    +-- status
    +-- error
```

Embed:

```markdown
![TaskMatrix Frontend State Tree](docs/architecture/frontend-state-tree.png)
```

---

# 20. Routing Architecture

```text
/
|
+-- /login
|
+-- /register
|
+-- /dashboard
|
+-- /projects
|
+-- /tasks
|
+-- /team
|
+-- /calendar
|
+-- /analytics
|
+-- /settings
```

Authentication routes are publicly accessible.

Workspace routes should be protected and require an authenticated user.

---

# 21. Phase 2 — UI/UX Wireframes

Phase 2 requires a minimum of three core viewports designed in Figma before or alongside implementation.

Required viewports:

### 1. Authentication Screen

Includes:

- Login
- Register
- Email
- Password
- Primary authentication action
- Validation/error area
- TaskMatrix branding

### 2. Main Dashboard

Includes:

- Sidebar
- Navigation
- Dashboard header
- Statistics cards
- Active projects
- Team activity
- Recent tasks
- New Project action

### 3. Data Details View

For TaskMatrix, the primary data details viewport is the **Projects / Project Management view**.

Includes:

- Project list
- Search
- Status filters
- Project cards
- Progress
- Tasks
- Members
- Due date
- Priority
- Create project
- Edit project
- Delete project

Additional recommended Figma screens:

- Tasks
- Team
- Calendar
- Analytics
- Settings

---

# 22. Figma Deliverable

Public Figma file:

```text
[ADD YOUR PUBLIC FIGMA LINK HERE]
```

README requirement:

```markdown
[Figma UI/UX Wireframes](YOUR_PUBLIC_FIGMA_LINK)
```

The Figma file should contain at minimum:

```text
01 - Login
02 - Register
03 - Dashboard
04 - Projects
```

Recommended:

```text
05 - Tasks
06 - Team
07 - Calendar
08 - Analytics
09 - Settings
```

---

# 23. Design System

The TaskMatrix UI follows a consistent design system.

Core design principles:

- Clean enterprise interface
- Clear information hierarchy
- Consistent spacing
- Reusable components
- Responsive layouts
- Accessible controls
- Consistent status indicators
- Clear visual feedback

Reusable UI elements include:

- Buttons
- Cards
- Inputs
- Selects
- Modals
- Tables
- Progress bars
- Status badges
- Priority labels
- Navigation elements

---

# 24. Responsive Design

The frontend is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive behavior includes:

- Adaptive grids
- Responsive project cards
- Mobile-friendly forms
- Flexible navigation
- Table overflow handling
- Responsive typography
- Touch-friendly controls

---

# 25. Error & Loading States

The application handles asynchronous states using:

```text
idle
loading
succeeded
failed
```

UI states include:

```text
Loading...
No projects found
No tasks available
Authentication required
Unable to connect to server
Invalid or expired token
Failed to create project
Failed to update project
Failed to delete project
```

This provides clear feedback during API operations.

---

# 26. Security

Security practices implemented or planned:

- JWT authentication
- bcrypt password hashing
- Protected backend routes
- Authorization headers
- Environment variables
- No secrets committed to Git
- Server-side authentication checks
- Input validation
- MongoDB schema validation

Example environment configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

Production secrets must be configured through the deployment environment.

---

# 27. Git & GitHub Standards

The repository should not contain:

```text
.env
node_modules/
dist/
build/
```

Recommended `.gitignore`:

```gitignore
node_modules/
.env
.env.local
.env.production
dist/
build/
coverage/
*.log
.DS_Store
```

Commit messages should be descriptive.

Examples:

```text
feat: add project CRUD integration
fix: resolve project loading state
feat: connect login with JWT authentication
docs: update frontend architecture
fix: prevent blank projects page
```

---

# 28. Testing & Validation

Before sprint submission, validate:

### Authentication

- [ ] Register works
- [ ] Login works
- [ ] JWT token is generated
- [ ] JWT token is stored
- [ ] `/api/auth/me` works with valid token
- [ ] Invalid token is rejected
- [ ] Logout clears authentication state

### Projects

- [ ] Fetch projects works
- [ ] Create project works
- [ ] Update project works
- [ ] Delete project works
- [ ] Search works
- [ ] Filters work
- [ ] Project data persists after refresh
- [ ] API errors are displayed
- [ ] Loading state is displayed

### Tasks

- [ ] Create task
- [ ] Update task
- [ ] Delete task
- [ ] Task status changes
- [ ] Task priority works
- [ ] Task/project relationship works
- [ ] Project task count updates

### UI

- [ ] Login works
- [ ] Register works
- [ ] Dashboard renders
- [ ] Projects renders
- [ ] Tasks renders
- [ ] Team renders
- [ ] Calendar renders
- [ ] Analytics renders
- [ ] Settings renders
- [ ] Navigation works
- [ ] Responsive layout works
- [ ] No critical console errors

---

# 29. Definition of Done (DOD)

A feature is considered complete only when:

- [ ] Requirement has been implemented
- [ ] UI is complete
- [ ] Backend integration is complete where required
- [ ] Database persistence works
- [ ] Authentication/authorization is handled
- [ ] Loading state is handled
- [ ] Error state is handled
- [ ] Empty state is handled
- [ ] Responsive behavior is verified
- [ ] Existing features remain functional
- [ ] No critical console errors exist
- [ ] Code is committed to Git
- [ ] README/documentation is updated
- [ ] Feature has been manually tested

---

# 30. Technical Requirements Document (TRD)

## Objective

Build a scalable full-stack Agile Project Management platform that enables authenticated users to manage projects, tasks, teams, schedules, analytics, and account settings.

## Functional Requirements

### FR-01 Authentication

The system shall allow users to register and authenticate using email and password.

### FR-02 Authorization

The system shall validate JWT tokens before allowing protected API operations.

### FR-03 Project Management

The system shall support project creation, retrieval, modification, and deletion.

### FR-04 Task Management

The system shall support task lifecycle management and project association.

### FR-05 Dashboard

The system shall display workspace-level project and task statistics.

### FR-06 Search and Filtering

The system shall allow users to search and filter projects and tasks.

### FR-07 Team Management

The system shall allow users to manage workspace members.

### FR-08 Scheduling

The system shall provide project and task deadline visibility.

### FR-09 Analytics

The system shall provide project/task performance indicators.

### FR-10 Settings

The system shall provide account and security management.

---

# 31. Non-Functional Requirements

## Performance

- Efficient Redux state updates
- Minimized unnecessary API requests
- Responsive UI interactions
- Optimized production build

## Security

- Password hashing
- JWT authentication
- Protected API routes
- Environment-based secrets

## Scalability

The architecture should support:

- Additional project fields
- Additional task types
- Role-based access
- Real-time collaboration
- Notifications
- Activity logs
- Advanced analytics

## Maintainability

The application should maintain:

- Modular components
- Separate Redux slices
- Separate controllers
- Separate models
- Reusable UI
- Documented API behavior

---

# 32. API Endpoint Reference

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/projects` | Get projects | Yes |
| POST | `/api/projects` | Create project | Yes |
| PUT | `/api/projects/:id` | Update project | Yes |
| DELETE | `/api/projects/:id` | Delete project | Yes |
| GET | `/api/tasks` | Get tasks | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

Additional endpoints may be introduced as Team, Calendar, Analytics, and Settings backend functionality is expanded.

---

# 33. Folder Documentation

Recommended repository structure:

```text
prodesk-capstone-TaskMatrix/
|
+-- client/
|   +-- src/
|   +-- package.json
|   +-- vite.config.js
|
+-- server/
|   +-- src/
|       +-- controllers/
|       +-- middleware/
|       +-- models/
|       +-- routes/
|       +-- server.js
|   +-- package.json
|
+-- docs/
|   +-- architecture/
|       +-- erd.png
|       +-- frontend-state-tree.png
|   +-- wireframes/
|
+-- README.md
+-- .gitignore
```

---

# 34. Local Development

## Prerequisites

Install:

- Node.js
- npm
- MongoDB
- Git

---

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/prodesk-capstone-TaskMatrix.git
cd prodesk-capstone-TaskMatrix
```

---

## Start Backend

```bash
cd server
npm install
npm run dev
```

Expected server:

```text
http://localhost:5000
```

---

## Start Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# 35. Environment Setup

## Backend

Create:

```text
server/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## Frontend

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit real secrets to GitHub.

---

# 36. Verification Commands

## Check Authentication

```bash
curl -X POST http://localhost:5000/api/auth/register ^
-H "Content-Type: application/json" ^
-d "{\"name\":\"Test User\",\"email\":\"testuser@taskmatrix.com\",\"password\":\"TestPassword123!\"}"
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login ^
-H "Content-Type: application/json" ^
-d "{\"email\":\"testuser@taskmatrix.com\",\"password\":\"TestPassword123!\"}"
```

Current user:

```bash
curl http://localhost:5000/api/auth/me ^
-H "Authorization: Bearer YOUR_TOKEN"
```

Projects:

```bash
curl http://localhost:5000/api/projects ^
-H "Authorization: Bearer YOUR_TOKEN"
```

---

# 37. Deployment

## Frontend

The React/Vite frontend can be deployed to a platform such as Vercel.

Production configuration:

```env
VITE_API_URL=https://your-api-domain/api
```

## Backend

The Express server can be deployed to a Node-compatible hosting platform.

Production environment variables must be configured securely on the hosting platform.

## Database

MongoDB should be configured through a production MongoDB deployment.

---

# 38. Phase 1 Deliverable Checklist

| Requirement | Status |
|---|---|
| Project selected | Completed |
| Repository initialized | Completed |
| Public GitHub repository | Verify |
| Comprehensive README | Completed |
| Project Name documented | Completed |
| Designated Track documented | Completed |
| Tech Stack documented | Completed |
| Prioritized Core Features | Completed |
| Base authentication | Completed |
| Project CRUD | Completed |
| Frontend/backend integration | Completed |
| MongoDB persistence | Completed |

---

# 39. Phase 2 Deliverable Checklist

| Requirement | Status |
|---|---|
| Figma workspace created | Completed |
| Authentication screen | Completed |
| Register screen | Completed |
| Dashboard viewport | Completed |
| Project/Data Details viewport | Completed |
| Consistent design system | Completed |
| Public Figma link | Add to README |
| Figma link added to GitHub README | Pending |
| Wireframes aligned with implementation | Verify |

### Figma

Add the final public link here:

```text
https://www.figma.com/...
```

---

# 40. Phase 3 Deliverable Checklist

| Requirement | Status |
|---|---|
| Full-stack architecture | Completed |
| MongoDB data model | Completed |
| ERD | Prepare/export |
| Frontend state tree | Documented |
| Frontend architecture | Completed |
| API endpoint documentation | Completed |
| Architecture images | Add to docs/architecture |
| README architecture embedding | Pending image upload |
| Performance optimization | In Progress |

---

# 41. Documentation Assets

Recommended documentation structure:

```text
docs/
|
+-- architecture/
|   +-- erd.png
|   +-- frontend-state-tree.png
|   +-- system-architecture.png
|
+-- wireframes/
|   +-- login.png
|   +-- register.png
|   +-- dashboard.png
|   +-- projects.png
|
+-- screenshots/
    +-- dashboard.png
    +-- projects.png
    +-- tasks.png
```

---

# 42. Project Screenshots

Add final production screenshots here.

## Login

```markdown
![TaskMatrix Login](docs/screenshots/login.png)
```

## Dashboard

```markdown
![TaskMatrix Dashboard](docs/screenshots/dashboard.png)
```

## Projects

```markdown
![TaskMatrix Projects](docs/screenshots/projects.png)
```

## Tasks

```markdown
![TaskMatrix Tasks](docs/screenshots/tasks.png)
```

---

# 43. Architecture & Documentation Standards

All major architectural decisions should be documented in the repository.

Documentation should cover:

- Product requirements
- Technical requirements
- Frontend architecture
- Backend architecture
- Database architecture
- API endpoints
- Authentication
- State management
- UI/UX wireframes
- ERD
- Definition of Done
- Sprint deliverables

---

# 44. Sprint Completion Summary

TaskMatrix has progressed from a frontend prototype into a full-stack application with:

- React frontend
- Redux Toolkit state management
- Express backend
- MongoDB persistence
- JWT authentication
- Project CRUD
- API integration
- Project search/filtering
- Project editing
- Project deletion
- Dashboard integration
- UI/UX wireframes
- Frontend architecture documentation
- Technical requirements documentation
- Definition of Done
- Architecture planning

The remaining submission-focused work consists primarily of finalizing and committing documentation assets, public links, architecture exports, screenshots, and production verification.

---

# 45. Final Sprint Submission Checklist

Before submitting the capstone, verify all items below:

### Repository

- [ ] Repository is public
- [ ] Repository name follows `prodesk-capstone-TaskMatrix`
- [ ] No `.env` files committed
- [ ] No secrets committed
- [ ] README is complete
- [ ] Meaningful Git history exists

### Phase 1

- [x] TaskMatrix selected
- [x] Base MVP implemented
- [x] Authentication implemented
- [x] Project CRUD implemented
- [x] Backend API connected
- [x] MongoDB connected
- [x] PRD documented

### Phase 2

- [x] Figma created
- [x] Login wireframe
- [x] Register wireframe
- [x] Dashboard wireframe
- [x] Project/Data Details wireframe
- [ ] Public Figma link added
- [ ] Figma link verified

### Phase 3

- [x] Frontend architecture documented
- [x] Redux state tree documented
- [x] API endpoints documented
- [ ] ERD exported
- [ ] ERD added to repository
- [ ] State tree exported
- [ ] State tree added to repository
- [ ] Architecture images embedded in README

### Final QA

- [ ] Frontend builds successfully
- [ ] Backend starts successfully
- [ ] MongoDB connection verified
- [ ] Register tested
- [ ] Login tested
- [ ] `/api/auth/me` tested
- [ ] Project GET tested
- [ ] Project POST tested
- [ ] Project PUT tested
- [ ] Project DELETE tested
- [ ] Task functionality tested
- [ ] No critical console errors
- [ ] Responsive layout verified
- [ ] Production deployment verified

---

# 46. License

This project is developed as an educational and capstone project for the ProDesk IT program.

---

# 47. Author

**Vansh Bansal**

TaskMatrix — Agile Project Management Platform

---

# 48. Acknowledgement

Developed as part of the **ProDesk IT Capstone Project** with emphasis on full-stack engineering, frontend architecture, API integration, database design, UI/UX implementation, and software development best practices.

---

## TaskMatrix

**Plan. Track. Collaborate. Deliver.**
