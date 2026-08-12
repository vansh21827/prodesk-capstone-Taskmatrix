import { configureStore, createSlice } from "@reduxjs/toolkit";

import projectsReducer from "./projectsSlice";
import tasksReducer from "./tasksSlice";
import teamReducer from "./teamSlice";

const appSlice = createSlice({
  name: "app",

  initialState: {
    status: "ready",
  },

  reducers: {},
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    team: teamReducer,
  },
});