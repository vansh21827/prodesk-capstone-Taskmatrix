# TaskMatrix – Agile Project Management Platform

> An enterprise-oriented full-stack project management platform designed to help teams plan projects, manage tasks, collaborate with members, monitor progress, and maintain a centralized workspace.

---

## Project Overview

**TaskMatrix** is a full-stack Agile Project Management application developed as an enterprise-level capstone project.

The platform provides a centralized workspace where project managers and team members can create and manage projects, organize tasks, monitor project progress, collaborate with team members, and analyze workspace activity.

The application follows a modular frontend architecture using React and Redux Toolkit and a RESTful backend architecture using Node.js, Express.js, MongoDB, and JWT-based authentication.

---

## RFP Selection

### Selected Application

**Option 3 – TaskMatrix**

### Application Category

**Agile Project Management Platform**

### Designated Track

**Full-Stack Web Development**

### Project Type

**Enterprise-Level Capstone Application**

---

# Product Requirements Document (PRD)

## Problem Statement

Modern teams often manage projects, tasks, team members, deadlines, and progress across multiple disconnected tools.

This creates problems such as:

- Lack of centralized project information
- Difficulty tracking task progress
- Poor visibility into project status
- Manual project and task management
- Difficulty monitoring team activity
- Limited workspace-level analytics
- Fragmented collaboration workflows

TaskMatrix addresses these challenges by providing a centralized project management workspace.

---

# Product Objective

The primary objective of TaskMatrix is to provide a scalable and user-friendly platform that enables teams to:

- Create and manage projects
- Create, assign, and track tasks
- Monitor project progress
- Manage team members
- Track deadlines
- View workspace activity
- Analyze project and task performance
- Secure user accounts and application data

---

# Target Users

TaskMatrix is designed for:

- Project Managers
- Team Leads
- Developers
- Designers
- Startup Teams
- Students and Academic Teams
- Small and Medium-Sized Organizations

---

# Core Features

Features are prioritized according to the sprint requirements.

## P0 – Mandatory Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected application routes
- Logout functionality
- Password management
- Authentication state management

### Dashboard

- Workspace overview
- Active project statistics
- Total task statistics
- Completed task statistics
- Pending task statistics
- Active project overview
- Project progress visualization
- Recent task activity
- Team activity section

### Project Management

- Create projects
- View projects
- Search projects
- Filter projects by status
- Edit projects
- Delete projects
- Track project progress
- Track project members
- Track project deadlines
- Track project task completion

### Task Management

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Assign tasks
- Task priority
- Task status
- Task due dates
- Project-based task organization
- Task search

---

# P1 – Priority Features

### Team Management

- View team members
- Add team members
- Manage member information
- Assign members to projects
- Display team participation

### Calendar

- Project deadlines
- Task deadlines
- Workspace schedule
- Date-based task visibility

### Search

Global workspace search for:

- Projects
- Tasks
- Team members

### User Settings

- Account information
- Profile management
- Security settings
- Password management
- Application preferences

---

# P2 – Stretch Goals

### Analytics

- Project performance
- Task completion statistics
- Team productivity
- Project progress analysis
- Workspace activity metrics

### Advanced Project Management

- Project-level task management
- Task progress calculation
- Automatic project progress calculation
- Project completion statistics

### Optimization

- API error handling
- Loading states
- Empty states
- Responsive design
- Performance optimization
- Secure API communication
- Reusable components
- Centralized state management

---

# Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend application |
| Vite | Development and build tool |
| Redux Toolkit | Global state management |
| React Redux | Redux integration |
| React Router | Client-side routing |
| Lucide React | UI icons |
| CSS3 | Styling and responsive UI |
| JavaScript ES6+ | Application logic |

---

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| dotenv | Environment configuration |
| CORS | Cross-origin communication |

---

## Development Tools

- Git
- GitHub
- Visual Studio Code
- Postman
- MongoDB / MongoDB Atlas
- Figma
- Draw.io
- Vercel
- npm

---

# System Architecture

TaskMatrix follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       + Vite        │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Redux Toolkit     │
                    │    Global State     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    REST API Layer   │
                    │      Express.js     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Authentication    │
                    │     JWT + bcrypt    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │     Database        │
                    └─────────────────────┘
