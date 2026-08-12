import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowUpRight,
  CalendarDays,
  FolderKanban,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

import { addProject } from "../store/projectsSlice";
import "./Projects.css";

function Projects() {
  const dispatch = useDispatch();

  const projects = useSelector(
    (state) => state.projects.items
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    members: 1,
    dueDate: "",
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.description.trim()) {
      return;
    }

    const formattedDate = form.dueDate
      ? new Date(form.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "Not set";

    dispatch(
      addProject({
        ...form,
        name: form.name.trim(),
        description: form.description.trim(),
        dueDate: formattedDate,
      })
    );

    setForm({
      name: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      members: 1,
      dueDate: "",
    });

    setShowForm(false);
  };

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div>
          <span className="page-eyebrow">WORKSPACE</span>

          <h1>Projects</h1>

          <p>
            Manage projects, track progress, and keep your
            team aligned.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={17} />
          New Project
        </button>
      </div>

      {showForm && (
        <div className="project-form-overlay">
          <div className="project-form-modal">
            <div className="project-form-header">
              <div>
                <span className="page-eyebrow">
                  PROJECT MANAGEMENT
                </span>

                <h2>Create New Project</h2>

                <p>
                  Add a new project to your TaskMatrix
                  workspace.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Project Name</label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Website Redesign"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the project..."
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Planning</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Team Members</label>

                  <input
                    type="number"
                    name="members"
                    min="1"
                    value={form.members}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Due Date</label>

                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="project-form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  <Plus size={17} />
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="projects-toolbar">
        <div className="projects-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="project-filters">
          {[
            "All",
            "In Progress",
            "Planning",
            "Completed",
          ].map((status) => (
            <button
              key={status}
              className={
                statusFilter === status
                  ? "filter-active"
                  : ""
              }
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-summary">
        <div>
          <strong>{projects.length}</strong>
          <span>Total Projects</span>
        </div>

        <div>
          <strong>
            {
              projects.filter(
                (project) =>
                  project.status === "In Progress"
              ).length
            }
          </strong>
          <span>In Progress</span>
        </div>

        <div>
          <strong>
            {
              projects.filter(
                (project) => project.status === "Completed"
              ).length
            }
          </strong>
          <span>Completed</span>
        </div>

        <div>
          <strong>
            {projects.reduce(
              (total, project) =>
                total + Number(project.members || 0),
              0
            )}
          </strong>
          <span>Team Members</span>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-projects">
          <FolderKanban size={40} />

          <h2>No projects found</h2>

          <p>
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article
              className="project-card"
              key={project.id}
            >
              <div className="project-card-header">
                <div className="project-icon">
                  <FolderKanban size={20} />
                </div>

                <span
                  className={`project-status ${project.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="project-card-content">
                <h2>{project.name}</h2>

                <p>{project.description}</p>

                <div className="project-progress-heading">
                  <span>Progress</span>
                  <strong>{project.progress}%</strong>
                </div>

                <div className="project-progress">
                  <div
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>

                <div className="project-details">
                  <div>
                    <span>Tasks</span>

                    <strong>
                      {project.tasks}/{project.totalTasks}
                    </strong>
                  </div>

                  <div>
                    <span>Members</span>

                    <strong>
                      <Users size={14} />
                      {project.members}
                    </strong>
                  </div>

                  <div>
                    <span>Due date</span>

                    <strong>
                      <CalendarDays size={14} />
                      {project.dueDate}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="project-card-footer">
                <span>
                  Priority:{" "}
                  <strong
                    className={`priority-${project.priority.toLowerCase()}`}
                  >
                    {project.priority}
                  </strong>
                </span>

                <button
                  aria-label={`Open ${project.name}`}
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;