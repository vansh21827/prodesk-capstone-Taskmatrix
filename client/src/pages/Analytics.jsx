import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  ListTodo,
  TrendingUp,
} from "lucide-react";
import "./Analytics.css";

function Analytics() {
  const tasks = useSelector((state) => state.tasks?.items || []);
  const projects = useSelector(
    (state) => state.projects?.items || []
  );

  const analytics = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const review = tasks.filter(
      (task) => task.status === "Review"
    ).length;

    const todo = tasks.filter(
      (task) => task.status === "Todo"
    ).length;

    const high = tasks.filter(
      (task) => task.priority === "High"
    ).length;

    const medium = tasks.filter(
      (task) => task.priority === "Medium"
    ).length;

    const low = tasks.filter(
      (task) => task.priority === "Low"
    ).length;

    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    const projectStats = projects.map((project) => {
      const projectTasks = tasks.filter(
        (task) => task.project === project.name
      );

      const completedTasks = projectTasks.filter(
        (task) => task.status === "Completed"
      ).length;

      const progress =
        projectTasks.length > 0
          ? Math.round(
              (completedTasks / projectTasks.length) * 100
            )
          : 0;

      return {
        ...project,
        totalTasks: projectTasks.length,
        completedTasks,
        progress,
      };
    });

    return {
      total,
      completed,
      inProgress,
      review,
      todo,
      high,
      medium,
      low,
      completionRate,
      projectStats,
    };
  }, [tasks, projects]);

  const statusData = [
    {
      label: "Completed",
      value: analytics.completed,
      className: "completed",
    },
    {
      label: "In Progress",
      value: analytics.inProgress,
      className: "in-progress",
    },
    {
      label: "Review",
      value: analytics.review,
      className: "review",
    },
    {
      label: "Todo",
      value: analytics.todo,
      className: "todo",
    },
  ];

  const priorityData = [
    {
      label: "High",
      value: analytics.high,
      className: "high",
    },
    {
      label: "Medium",
      value: analytics.medium,
      className: "medium",
    },
    {
      label: "Low",
      value: analytics.low,
      className: "low",
    },
  ];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <span className="page-eyebrow">WORKSPACE</span>

          <h1>Analytics</h1>

          <p>
            Monitor productivity and project performance
            across your workspace.
          </p>
        </div>
      </div>

      <section className="analytics-stats">
        <div className="analytics-stat-card">
          <div className="analytics-stat-icon purple">
            <ListTodo size={20} />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{analytics.total}</strong>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon green">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{analytics.completed}</strong>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon blue">
            <TrendingUp size={20} />
          </div>

          <div>
            <span>Completion Rate</span>
            <strong>{analytics.completionRate}%</strong>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-icon orange">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Pending Tasks</span>
            <strong>
              {analytics.total - analytics.completed}
            </strong>
          </div>
        </div>
      </section>

      <div className="analytics-grid">
        <section className="analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Task Status</h2>
              <p>Distribution of tasks by current status.</p>
            </div>

            <BarChart3 size={20} />
          </div>

          <div className="status-chart">
            {statusData.map((item) => {
              const percentage =
                analytics.total > 0
                  ? Math.round(
                      (item.value / analytics.total) * 100
                    )
                  : 0;

              return (
                <div className="status-row" key={item.label}>
                  <div className="status-row-header">
                    <span>{item.label}</span>
                    <strong>
                      {item.value} ({percentage}%)
                    </strong>
                  </div>

                  <div className="analytics-progress">
                    <div
                      className={`analytics-progress-fill ${item.className}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Task Priority</h2>
              <p>Current priority distribution.</p>
            </div>

            <ListTodo size={20} />
          </div>

          <div className="priority-chart">
            {priorityData.map((item) => {
              const percentage =
                analytics.total > 0
                  ? Math.round(
                      (item.value / analytics.total) * 100
                    )
                  : 0;

              return (
                <div
                  className="priority-stat"
                  key={item.label}
                >
                  <div
                    className={`priority-circle ${item.className}`}
                  >
                    {percentage}%
                  </div>

                  <div>
                    <strong>{item.label} Priority</strong>
                    <span>
                      {item.value} tasks
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="analytics-panel project-performance">
        <div className="analytics-panel-header">
          <div>
            <h2>Project Performance</h2>
            <p>
              Completion progress calculated from project
              tasks.
            </p>
          </div>
        </div>

        {analytics.projectStats.length > 0 ? (
          <div className="project-performance-list">
            {analytics.projectStats.map((project) => (
              <div
                className="performance-row"
                key={project.name}
              >
                <div className="performance-info">
                  <div>
                    <strong>{project.name}</strong>
                    <span>
                      {project.completedTasks} of{" "}
                      {project.totalTasks} tasks completed
                    </span>
                  </div>

                  <strong>{project.progress}%</strong>
                </div>

                <div className="analytics-progress">
                  <div
                    className="analytics-progress-fill project"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="analytics-empty">
            <BarChart3 size={28} />

            <h3>No project data available</h3>

            <p>
              Create projects and assign tasks to view
              performance analytics.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Analytics;