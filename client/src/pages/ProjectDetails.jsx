import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  MoreHorizontal,
  Users,
} from "lucide-react";

import { useSelector } from "react-redux";

import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useSelector((state) =>
    state.projects.items.find(
      (item) =>
        String(item._id || item.id) === String(id)
    )
  );

  if (!project) {
    return (
      <div className="project-details-page">
        <button
          className="secondary-button"
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft size={17} />
          Back to Projects
        </button>

        <div className="project-not-found">
          <FolderKanban size={42} />

          <h2>Project not found</h2>

          <p>
            The project you're looking for does not
            exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const progress = Number(project.progress || 0);
  const totalTasks = Number(project.totalTasks || 0);
  const completedTasks = Number(project.tasks || 0);

  return (
    <div className="project-details-page">

      {/* HEADER */}

      <div className="project-details-topbar">
        <button
          className="back-button"
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft size={18} />
          Projects
        </button>

        <button className="icon-button">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* PROJECT HEADER */}

      <section className="project-details-header">

        <div className="project-details-title">

          <div className="project-details-icon">
            <FolderKanban size={25} />
          </div>

          <div>
            <div className="project-details-eyebrow">
              PROJECT DETAILS
            </div>

            <h1>{project.name}</h1>

            <p>{project.description}</p>
          </div>

        </div>

        <div className="project-details-badges">

          <span
            className={`project-status ${project.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {project.status}
          </span>

          <span
            className={`project-priority priority-${(
              project.priority || "medium"
            ).toLowerCase()}`}
          >
            {project.priority}
          </span>

        </div>

      </section>

      {/* STATISTICS */}

      <section className="project-detail-stats">

        <div className="detail-stat-card">

          <div className="detail-stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>

        </div>

        <div className="detail-stat-card">

          <div className="detail-stat-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Tasks</span>
            <strong>
              {completedTasks}/{totalTasks}
            </strong>
          </div>

        </div>

        <div className="detail-stat-card">

          <div className="detail-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Members</span>
            <strong>{project.members || 0}</strong>
          </div>

        </div>

        <div className="detail-stat-card">

          <div className="detail-stat-icon">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Due Date</span>
            <strong>{project.dueDate || "Not set"}</strong>
          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <div className="project-details-grid">

        {/* PROGRESS */}

        <section className="project-detail-panel">

          <div className="detail-panel-heading">

            <div>
              <h2>Project Progress</h2>

              <p>
                Track the current completion status
                of this project.
              </p>
            </div>

            <strong>{progress}%</strong>

          </div>

          <div className="large-progress-track">

            <div
              className="large-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </section>

        {/* TASKS */}

        <section className="project-detail-panel">

          <div className="detail-panel-heading">

            <div>
              <h2>Tasks</h2>

              <p>
                Tasks associated with this project.
              </p>
            </div>

            <span className="task-count">
              {completedTasks}/{totalTasks}
            </span>

          </div>

          <div className="task-summary">

            <div>
              <CheckCircle2 size={18} />

              <span>
                Completed tasks
              </span>

              <strong>
                {completedTasks}
              </strong>
            </div>

            <div>
              <Clock3 size={18} />

              <span>
                Remaining tasks
              </span>

              <strong>
                {Math.max(
                  totalTasks - completedTasks,
                  0
                )}
              </strong>
            </div>

          </div>

        </section>

        {/* TEAM */}

        <section className="project-detail-panel">

          <div className="detail-panel-heading">

            <div>
              <h2>Team</h2>

              <p>
                People assigned to this project.
              </p>
            </div>

          </div>

          <div className="team-preview">

            <div className="team-avatar">
              VB
            </div>

            <div className="team-avatar">
              AS
            </div>

            <div className="team-avatar">
              RK
            </div>

            <div className="team-more">
              +{Math.max(
                Number(project.members || 0) - 3,
                0
              )}
            </div>

          </div>

          <p className="team-count">
            {project.members || 0} team members
          </p>

        </section>

        {/* PROJECT INFORMATION */}

        <section className="project-detail-panel">

          <div className="detail-panel-heading">

            <div>
              <h2>Project Information</h2>

              <p>
                Current project configuration.
              </p>
            </div>

          </div>

          <div className="project-information">

            <div>
              <span>Status</span>
              <strong>{project.status}</strong>
            </div>

            <div>
              <span>Priority</span>
              <strong>{project.priority}</strong>
            </div>

            <div>
              <span>Due Date</span>
              <strong>
                {project.dueDate || "Not set"}
              </strong>
            </div>

            <div>
              <span>Team Members</span>
              <strong>
                {project.members || 0}
              </strong>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
};

export default ProjectDetails;
