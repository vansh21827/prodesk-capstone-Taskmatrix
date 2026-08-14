import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/projects";

// Get JWT token
const getToken = () => {
  return localStorage.getItem("token");
};

// Fetch all projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("Authentication required");
      }

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch projects");
      }

      return data.projects;
    } catch (error) {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

// Create project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("Authentication required");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to create project");
      }

      return data.project;
    } catch (error) {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

// Update project
export const updateProjectAsync = createAsyncThunk(
  "projects/updateProjectAsync",
  async ({ id, ...projectData }, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("Authentication required");
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update project");
      }

      return data.project;
    } catch (error) {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

// Delete project
export const deleteProjectAsync = createAsyncThunk(
  "projects/deleteProjectAsync",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("Authentication required");
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete project");
      }

      return id;
    } catch (error) {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",

  initialState: {
    items: [],
    status: "idle",
    error: null,
  },

  reducers: {
    clearProjects: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH PROJECTS
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })

      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // CREATE PROJECT
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
        state.error = null;
      })

      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // UPDATE PROJECT
      .addCase(updateProjectAsync.pending, (state) => {
        state.error = null;
      })

      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (project) => project._id === action.payload._id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }

        state.error = null;
      })

      .addCase(updateProjectAsync.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE PROJECT
      .addCase(deleteProjectAsync.pending, (state) => {
        state.error = null;
      })

      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (project) => project._id !== action.payload
        );

        state.error = null;
      })

      .addCase(deleteProjectAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
