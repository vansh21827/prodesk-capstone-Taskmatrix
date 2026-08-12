import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  BarChart3,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Team",
    path: "/team",
    icon: Users,
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
];

const workspace = [
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove frontend authentication/session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    sessionStorage.clear();

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        

        <div>
          <h2>TaskMatrix</h2>
          <span>Workspace</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">MAIN MENU</p>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-section workspace-section">
        <p className="sidebar-section-title">WORKSPACE</p>

        <nav className="sidebar-nav">
          {workspace.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Sign out</span>
        </button>

        <div className="sidebar-version">
          <span>TaskMatrix</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;