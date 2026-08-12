import React, { useState } from "react";
import {
  User,
  Building2,
  Bell,
  Palette,
  ShieldCheck,
  Save,
  AlertTriangle,
} from "lucide-react";
import "./Settings.css";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Vansh Bansal",
    email: "vansh@example.com",
    role: "Project Manager",
  });

  const [workspace, setWorkspace] = useState({
    name: "TaskMatrix Workspace",
    description:
      "Central workspace for managing projects, tasks, and teams.",
  });

  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    projectUpdates: true,
    teamActivity: true,
    emailNotifications: false,
  });

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleWorkspaceChange = (event) => {
    const { name, value } = event.target;

    setWorkspace((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const toggleNotification = (key) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const sections = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "workspace",
      label: "Workspace",
      icon: Building2,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
    },
    {
      id: "security",
      label: "Security",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <span className="page-eyebrow">PREFERENCES</span>

          <h1>Settings</h1>

          <p>
            Manage your account, workspace, notifications,
            and application preferences.
          </p>
        </div>

        {saved && (
          <div className="settings-saved">
            <Save size={15} />
            Changes saved
          </div>
        )}
      </div>

      <div className="settings-layout">
        {/* SIDEBAR */}
        <aside className="settings-sidebar">
          <p className="settings-sidebar-title">
            SETTINGS
          </p>

          <nav>
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  key={section.id}
                  className={
                    activeSection === section.id
                      ? "settings-nav-item active"
                      : "settings-nav-item"
                  }
                  onClick={() =>
                    setActiveSection(section.id)
                  }
                >
                  <Icon size={17} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="settings-content">
          {/* PROFILE */}
          {activeSection === "profile" && (
            <section className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Profile</h2>

                  <p>
                    Manage your personal account information.
                  </p>
                </div>
              </div>

              <div className="profile-preview">
                <div className="profile-avatar">VB</div>

                <div>
                  <strong>{profile.name}</strong>
                  <span>{profile.role}</span>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="settings-form-group">
                  <label>Full Name</label>

                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-form-group">
                  <label>Role</label>

                  <input
                    name="role"
                    value={profile.role}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-form-group full">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <button
                className="settings-primary-button"
                onClick={handleSave}
              >
                <Save size={16} />
                Save Changes
              </button>
            </section>
          )}

          {/* WORKSPACE */}
          {activeSection === "workspace" && (
            <section className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Workspace</h2>

                  <p>
                    Configure your TaskMatrix workspace.
                  </p>
                </div>
              </div>

              <div className="settings-form-group">
                <label>Workspace Name</label>

                <input
                  name="name"
                  value={workspace.name}
                  onChange={handleWorkspaceChange}
                />
              </div>

              <div className="settings-form-group">
                <label>Workspace Description</label>

                <textarea
                  name="description"
                  rows="4"
                  value={workspace.description}
                  onChange={handleWorkspaceChange}
                />
              </div>

              <button
                className="settings-primary-button"
                onClick={handleSave}
              >
                <Save size={16} />
                Save Workspace
              </button>
            </section>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <section className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Notifications</h2>

                  <p>
                    Control which workspace activities you
                    want to be notified about.
                  </p>
                </div>
              </div>

              <div className="notification-settings">
                {[
                  {
                    key: "taskUpdates",
                    title: "Task Updates",
                    description:
                      "Receive notifications when tasks are created or updated.",
                  },
                  {
                    key: "projectUpdates",
                    title: "Project Updates",
                    description:
                      "Receive notifications about project progress and changes.",
                  },
                  {
                    key: "teamActivity",
                    title: "Team Activity",
                    description:
                      "Receive updates when team members join or perform activities.",
                  },
                  {
                    key: "emailNotifications",
                    title: "Email Notifications",
                    description:
                      "Receive important workspace notifications through email.",
                  },
                ].map((item) => (
                  <div
                    className="notification-setting"
                    key={item.key}
                  >
                    <div>
                      <strong>{item.title}</strong>

                      <p>{item.description}</p>
                    </div>

                    <button
                      className={
                        notifications[item.key]
                          ? "toggle active"
                          : "toggle"
                      }
                      onClick={() =>
                        toggleNotification(item.key)
                      }
                      aria-label={`Toggle ${item.title}`}
                    >
                      <span />
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="settings-primary-button"
                onClick={handleSave}
              >
                <Save size={16} />
                Save Preferences
              </button>
            </section>
          )}

          {/* APPEARANCE */}
          {activeSection === "appearance" && (
            <section className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Appearance</h2>

                  <p>
                    Customize how TaskMatrix looks and feels.
                  </p>
                </div>
              </div>

              <div className="appearance-options">
                <div className="appearance-option active">
                  <div className="appearance-preview light-preview">
                    <div />
                    <div />
                    <div />
                  </div>

                  <div>
                    <strong>Light</strong>

                    <span>
                      Clean and professional interface.
                    </span>
                  </div>
                </div>

                <div className="appearance-option disabled">
                  <div className="appearance-preview dark-preview">
                    <div />
                    <div />
                    <div />
                  </div>

                  <div>
                    <strong>Dark</strong>

                    <span>Coming soon.</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECURITY */}
          {activeSection === "security" && (
            <section className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Security</h2>

                  <p>
                    Manage your account security and access.
                  </p>
                </div>
              </div>

              <div className="security-card">
                <div>
                  <strong>Password</strong>

                  <p>
                    Keep your account secure with a strong
                    password.
                  </p>
                </div>

                <button className="secondary-button">
                  Change Password
                </button>
              </div>

              <div className="security-card">
                <div>
                  <strong>Active Session</strong>

                  <p>
                    Windows Desktop · Current session
                  </p>
                </div>

                <span className="session-active">
                  Active
                </span>
              </div>

              <div className="danger-zone">
                <div>
                  <h3>
                    <AlertTriangle size={17} />
                    Danger Zone
                  </h3>

                  <p>
                    Clearing workspace data will remove
                    locally stored application data.
                  </p>
                </div>

                <button
                  className="danger-button"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to clear local workspace data?"
                    );

                    if (confirmed) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                >
                  Clear Local Data
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;