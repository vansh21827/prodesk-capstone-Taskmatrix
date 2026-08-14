# prodesk-capstone-Taskmatrix

# TaskMatrix – Agile Project Management Platform

TaskMatrix is a full-stack Agile Project Management application designed to help teams manage projects, tasks, team members, schedules, and project analytics from a centralized workspace.

The application provides a modern dashboard-driven interface with secure authentication, project management, task management, team collaboration, calendar planning, analytics, and user settings.

---

## Project Information

| Category | Details |
|---|---|
| Project Name | TaskMatrix |
| Project Type | Enterprise Agile Project Management |
| Designated Track | Full-Stack / Frontend Engineering |
| Repository | `prodesk-capstone-TaskMatrix` |
| Frontend | React + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| State Management | Redux Toolkit |
| Authentication | JWT |
| Styling | CSS |
| Icons | Lucide React |
| Deployment | Vercel / Cloud Deployment |

---

# 1. Project Overview

Modern software teams require a centralized platform to manage projects, tasks, team members, deadlines, and productivity.

TaskMatrix addresses this requirement by providing a single workspace where users can:

- Authenticate securely
- Create and manage projects
- Track project progress
- Manage tasks
- Manage team members
- View calendar schedules
- Analyze project performance
- Configure account settings

The application follows a modular architecture so that additional enterprise features can be integrated in future development cycles.

---

# 2. Problem Statement

Teams often rely on multiple tools for project management, task tracking, communication, and reporting.

This can result in:

- Scattered project information
- Poor visibility into project progress
- Difficulty tracking deadlines
- Manual task management
- Limited team visibility
- Inefficient reporting

TaskMatrix aims to provide a unified project management workspace that improves project visibility, task organization, and team coordination.

---

# 3. Project Objectives

The primary objectives of TaskMatrix are:

1. Provide secure user authentication.
2. Provide centralized project management.
3. Provide task tracking and organization.
4. Provide team management capabilities.
5. Provide calendar-based project planning.
6. Provide analytics and progress visualization.
7. Provide centralized account and security settings.
8. Implement scalable frontend state management.
9. Implement REST-based backend APIs.
10. Persist application data using MongoDB.

---

# 4. Core Features

## Priority 0 – Base MVP

The following features form the core MVP:

### Authentication

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Protected API routes
- Authenticated user retrieval

### Dashboard

- Active project statistics
- Total task statistics
- Completed task statistics
- Pending task statistics
- Active project overview
- Team activity
- Recent tasks

### Project Management

- Create projects
- View projects
- Search projects
- Filter projects by status
- Edit projects
- Delete projects
- Track project progress
- Track team members
- Track project priority
- Track project status
- Track project due dates

### Task Management

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Task status management
- Task priority management
- Task due dates
- Project-based task organization

### Team Management

- View team members
- Add team members
- Manage team information
- View team participation

### Calendar

- View project and task schedules
- Track upcoming deadlines
- Organize project activities by date

### Analytics

- Project progress
- Task completion
- Team activity
- Productivity statistics

### Settings

- Account settings
- Security settings
- Password management

---

# 5. Technology Stack

## Frontend

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- Lucide React
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- dotenv
- CORS

## Development Tools

- Git
- GitHub
- VS Code
- Postman / cURL
- MongoDB Atlas
- Figma
- Draw.io

## Deployment

- Vercel for frontend deployment
- Cloud-hosted backend
- MongoDB Atlas for database hosting

---

# 6. System Architecture

TaskMatrix follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Redux Toolkit     │
                    │    Global State     │
                    └──────────┬──────────┘
                               │
                         REST API / JWT
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Express.js Server  │
                    │     Node.js         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │     Database        │
                    └─────────────────────┘
