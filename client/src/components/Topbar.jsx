import React, { useEffect, useRef, useState } from "react";
import { Bell, Search, ChevronDown, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

const searchItems = [
  {
    name: "Website Redesign",
    type: "Project",
    path: "/projects",
  },
  {
    name: "Mobile Application",
    type: "Project",
    path: "/projects",
  },
  {
    name: "Analytics Platform",
    type: "Project",
    path: "/projects",
  },
  {
    name: "Customer Portal",
    type: "Project",
    path: "/projects",
  },
  {
    name: "Finalize dashboard UI",
    type: "Task",
    path: "/tasks",
  },
  {
    name: "Create authentication API",
    type: "Task",
    path: "/tasks",
  },
  {
    name: "Setup analytics database",
    type: "Task",
    path: "/tasks",
  },
  {
    name: "Prepare design system",
    type: "Task",
    path: "/tasks",
  },
  {
    name: "Ankit Sharma",
    type: "Team Member",
    path: "/team",
  },
  {
    name: "Riya Kapoor",
    type: "Team Member",
    path: "/team",
  },
  {
    name: "Arjun Mehta",
    type: "Team Member",
    path: "/team",
  },
  {
    name: "Priya Singh",
    type: "Team Member",
    path: "/team",
  },
];

const notifications = [
  {
    id: 1,
    title: "Task completed",
    message: "Ankit Sharma completed a task.",
    time: "8 minutes ago",
  },
  {
    id: 2,
    title: "New project created",
    message: "Riya Kapoor created a new project.",
    time: "34 minutes ago",
  },
  {
    id: 3,
    title: "Task updated",
    message: "Arjun Mehta updated a task.",
    time: "1 hour ago",
  },
];

function Topbar() {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const filteredResults = searchItems.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        setSearchOpen(true);

        setTimeout(() => {
          searchRef.current?.focus();
        }, 50);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchOpen &&
        !event.target.closest(".topbar-search-wrapper")
      ) {
        setSearchOpen(false);
      }

      if (
        notificationsOpen &&
        !event.target.closest(".notification-wrapper")
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [searchOpen, notificationsOpen]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!searchValue.trim()) {
      return;
    }

    if (filteredResults.length > 0) {
      navigate(filteredResults[0].path);
      setSearchOpen(false);
      setSearchValue("");
    }
  };

  const handleSearchResult = (path) => {
    navigate(path);
    setSearchOpen(false);
    setSearchValue("");
  };

  const handleNotificationClick = () => {
    setNotificationsOpen((previous) => !previous);
    setHasNotifications(false);
  };

  return (
    <header className="topbar">
      <div className="topbar-search-wrapper">
        <form
          className={`topbar-search ${
            searchOpen ? "topbar-search-active" : ""
          }`}
          onSubmit={handleSearchSubmit}
          onClick={() => {
            setSearchOpen(true);

            setTimeout(() => {
              searchRef.current?.focus();
            }, 50);
          }}
        >
          <Search size={19} />

          <input
            ref={searchRef}
            type="text"
            placeholder="Search projects, tasks, members..."
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              setSearchOpen(true);
            }}
          />

          <button
            type="button"
            className="search-shortcut"
            onClick={(event) => {
              event.stopPropagation();
              setSearchOpen(true);

              setTimeout(() => {
                searchRef.current?.focus();
              }, 50);
            }}
          >
            ⌘ K
          </button>
        </form>

        {searchOpen && (
          <div className="search-results">
            {searchValue.trim() === "" ? (
              <div className="search-empty">
                <Search size={18} />
                <span>
                  Search projects, tasks, or team members
                </span>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="search-empty">
                <span>No results found.</span>
              </div>
            ) : (
              <>
                <div className="search-results-title">
                  Search Results
                </div>

                {filteredResults.slice(0, 6).map((item) => (
                  <button
                    key={`${item.type}-${item.name}`}
                    className="search-result-item"
                    onClick={() => handleSearchResult(item.path)}
                  >
                    <div className="search-result-icon">
                      <Search size={16} />
                    </div>

                    <div className="search-result-content">
                      <strong>{item.name}</strong>
                      <span>{item.type}</span>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <div className="topbar-actions">
        <div className="notification-wrapper">
          <button
            className="notification-button"
            aria-label="Notifications"
            onClick={handleNotificationClick}
          >
            <Bell size={19} />

            {hasNotifications && (
              <span className="notification-dot"></span>
            )}
          </button>

          {notificationsOpen && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <div>
                  <h3>Notifications</h3>
                  <span>Recent workspace activity</span>
                </div>

                <CheckCircle2 size={18} />
              </div>

              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    className="notification-item"
                    key={notification.id}
                  >
                    <div className="notification-icon">
                      <Bell size={15} />
                    </div>

                    <div className="notification-content">
                      <strong>{notification.title}</strong>

                      <p>{notification.message}</p>

                      <span>{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="view-notifications-button"
                onClick={() => {
                  setNotificationsOpen(false);
                  navigate("/analytics");
                }}
              >
                View activity
              </button>
            </div>
          )}
        </div>

        <div className="profile-wrapper">
  <button
    className={`user-profile ${
      profileOpen ? "user-profile-active" : ""
    }`}
    onClick={() => setProfileOpen((previous) => !previous)}
    aria-expanded={profileOpen}
  >
    <div className="user-avatar">VB</div>

    <div className="user-details">
      <strong>Vansh Bansal</strong>
      <span>Project Manager</span>
    </div>

    <ChevronDown
      size={16}
      className={profileOpen ? "chevron-open" : ""}
    />
  </button>

  {profileOpen && (
    <div className="profile-dropdown">
      <div className="profile-dropdown-header">
        <div className="profile-dropdown-avatar">VB</div>

        <div>
          <strong>Vansh Bansal</strong>
          <span>Project Manager</span>
        </div>
      </div>

      <div className="profile-divider"></div>

      <button
        className="profile-menu-item"
        onClick={() => {
          setProfileOpen(false);
          navigate("/settings");
        }}
      >
        <span>View Profile</span>
      </button>

      <button
        className="profile-menu-item"
        onClick={() => {
          setProfileOpen(false);
          navigate("/settings");
        }}
      >
        <span>Settings</span>
      </button>

      <div className="profile-divider"></div>

      <button
        className="profile-menu-item profile-logout"
        onClick={() => {
          setProfileOpen(false);
          // sign-out functionality remains handled separately
        }}
      >
        <span>Sign out</span>
      </button>
    </div>
  )}
</div>
      </div>
    </header>
  );
}

export default Topbar;