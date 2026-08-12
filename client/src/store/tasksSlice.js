import { createSlice } from "@reduxjs/toolkit";

const initialTasks = [
  {
    id: 1,
    title: "Finalize dashboard UI",
    project: "Website Redesign",
    assignee: "Vansh Bansal",
    status: "In Progress",
    priority: "High",
    dueDate: "Aug 12, 2026",
  },
  {
    id: 2,
    title: "Create authentication API",
    project: "Mobile Application",
    assignee: "Ankit Sharma",
    status: "Review",
    priority: "Medium",
    dueDate: "Aug 13, 2026",
  },
  {
    id: 3,
    title: "Setup analytics database",
    project: "Analytics Platform",
    assignee: "Riya Kapoor",
    status: "Completed",
    priority: "Low",
    dueDate: "Aug 10, 2026",
  },
  {
    id: 4,
    title: "Prepare design system",
    project: "Website Redesign",
    assignee: "Arjun Mehta",
    status: "In Progress",
    priority: "Medium",
    dueDate: "Aug 14, 2026",
  },
  {
    id: 5,
    title: "Build mobile navigation",
    project: "Mobile Application",
    assignee: "Priya Singh",
    status: "Todo",
    priority: "High",
    dueDate: "Aug 16, 2026",
  },
  {
    id: 6,
    title: "Create project analytics",
    project: "Analytics Platform",
    assignee: "Vansh Bansal",
    status: "Todo",
    priority: "Medium",
    dueDate: "Aug 18, 2026",
  },
];

const tasksSlice = createSlice({
  name: "tasks",

  initialState: {
    items: initialTasks,
    status: "ready",
  },

  reducers: {
    addTask: (state, action) => {
      state.items.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    updateTask: (state, action) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter(
        (task) => task.id !== action.payload
      );
    },

    updateTaskStatus: (state, action) => {
      const task = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;