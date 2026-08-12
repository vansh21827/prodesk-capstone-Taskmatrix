import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  members: [
    {
      id: "member-1",
      name: "Ankit Sharma",
      email: "ankit@taskmatrix.com",
      role: "Frontend Developer",
      department: "Engineering",
      status: "Active",
      projects: 4,
      tasks: 12,
      initials: "AS",
    },
    {
      id: "member-2",
      name: "Riya Kapoor",
      email: "riya@taskmatrix.com",
      role: "UI/UX Designer",
      department: "Design",
      status: "Active",
      projects: 3,
      tasks: 8,
      initials: "RK",
    },
    {
      id: "member-3",
      name: "Arjun Mehta",
      email: "arjun@taskmatrix.com",
      role: "Backend Developer",
      department: "Engineering",
      status: "Active",
      projects: 5,
      tasks: 15,
      initials: "AM",
    },
    {
      id: "member-4",
      name: "Priya Singh",
      email: "priya@taskmatrix.com",
      role: "Project Coordinator",
      department: "Management",
      status: "Away",
      projects: 6,
      tasks: 10,
      initials: "PS",
    },
    {
      id: "member-5",
      name: "Rahul Verma",
      email: "rahul@taskmatrix.com",
      role: "QA Engineer",
      department: "Engineering",
      status: "Active",
      projects: 3,
      tasks: 9,
      initials: "RV",
    },
  ],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addMember: {
      reducer(state, action) {
        state.members.push(action.payload);
      },

      prepare(member) {
        return {
          payload: {
            id: nanoid(),
            name: member.name,
            email: member.email,
            role: member.role,
            department: member.department,
            status: member.status || "Active",
            projects: 0,
            tasks: 0,
            initials: member.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
          },
        };
      },
    },

    deleteMember(state, action) {
      state.members = state.members.filter(
        (member) => member.id !== action.payload
      );
    },

    updateMemberStatus(state, action) {
      const member = state.members.find(
        (item) => item.id === action.payload.id
      );

      if (member) {
        member.status = action.payload.status;
      }
    },
  },
});

export const {
  addMember,
  deleteMember,
  updateMemberStatus,
} = teamSlice.actions;

export default teamSlice.reducer;