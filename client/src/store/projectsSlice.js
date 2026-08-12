import { createSlice } from "@reduxjs/toolkit";

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Marketing website redesign and optimization",
    status: "In Progress",
    priority: "High",
    progress: 78,
    tasks: 18,
    totalTasks: 24,
    members: 6,
    dueDate: "Aug 18, 2026",
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "Cross-platform mobile application development",
    status: "In Progress",
    priority: "Medium",
    progress: 54,
    tasks: 13,
    totalTasks: 24,
    members: 8,
    dueDate: "Aug 24, 2026",
  },
  {
    id: 3,
    name: "Analytics Platform",
    description: "Business intelligence and analytics dashboard",
    status: "In Progress",
    priority: "Medium",
    progress: 32,
    tasks: 8,
    totalTasks: 25,
    members: 5,
    dueDate: "Sep 02, 2026",
  },
  {
    id: 4,
    name: "Customer Portal",
    description: "Self-service customer management portal",
    status: "Planning",
    priority: "Low",
    progress: 12,
    tasks: 3,
    totalTasks: 25,
    members: 4,
    dueDate: "Sep 15, 2026",
  },
];

const projectsSlice = createSlice({
  name: "projects",

  initialState: {
    items: initialProjects,
    status: "ready",
  },

  reducers: {
    addProject: (state, action) => {
      state.items.push({
        ...action.payload,
        id: Date.now(),
        progress: 0,
        tasks: 0,
        totalTasks: 0,
        members: Number(action.payload.members) || 0,
      });
    },

    deleteProject: (state, action) => {
      state.items = state.items.filter(
        (project) => project.id !== action.payload
      );
    },

    updateProject: (state, action) => {
      const index = state.items.findIndex(
        (project) => project.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
        };
      }
    },
  },
});

export const {
  addProject,
  deleteProject,
  updateProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;