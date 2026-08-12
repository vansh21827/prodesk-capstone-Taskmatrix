import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  ListTodo,
} from "lucide-react";

import "./Calendar.css";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar() {
  const tasks = useSelector((state) => state.tasks.items);

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    const days = [];

    // Previous month's visible days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(
          year,
          month - 1,
          previousMonthDays - i
        ),
        currentMonth: false,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    // Next month's visible days
    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(year, month + 1, nextDay),
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  }, [year, month]);

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(
      2,
      "0"
    )}`;
  };

  const getTaskDateKey = (dueDate) => {
    const parsedDate = new Date(dueDate);

    return formatDateKey(parsedDate);
  };

  const tasksForDate = (date) => {
    const key = formatDateKey(date);

    return tasks.filter(
      (task) => getTaskDateKey(task.dueDate) === key
    );
  };

  const selectedTasks = tasksForDate(selectedDate);

  const isToday = (date) => {
    return formatDateKey(date) === formatDateKey(today);
  };

  const isSelected = (date) => {
    return (
      formatDateKey(date) === formatDateKey(selectedDate)
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToToday = () => {
    const todayDate = new Date();

    setCurrentDate(
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
    );

    setSelectedDate(todayDate);
  };

  const selectDate = (date) => {
    setSelectedDate(date);

    if (
      date.getMonth() !== month ||
      date.getFullYear() !== year
    ) {
      setCurrentDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      );
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div>
          <span className="page-eyebrow">WORKSPACE</span>

          <h1>Calendar</h1>

          <p>
            Track deadlines and manage your team's schedule.
          </p>
        </div>

        <button
          className="today-button"
          onClick={goToToday}
        >
          Today
        </button>
      </div>

      <section className="calendar-summary">
        <div className="calendar-summary-card">
          <div className="calendar-summary-icon purple">
            <ListTodo size={19} />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>
        </div>

        <div className="calendar-summary-card">
          <div className="calendar-summary-icon orange">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>

        <div className="calendar-summary-card">
          <div className="calendar-summary-icon green">
            <ListTodo size={19} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>
      </section>

      <div className="calendar-layout">
        <section className="calendar-panel">
          <div className="calendar-toolbar">
            <div>
              <h2>
                {MONTHS[month]} {year}
              </h2>

              <span>
                {tasks.length} tasks across your workspace
              </span>
            </div>

            <div className="calendar-navigation">
              <button
                onClick={goToPreviousMonth}
                aria-label="Previous month"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={goToNextMonth}
                aria-label="Next month"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {WEEKDAYS.map((day) => (
              <div
                className="calendar-weekday"
                key={day}
              >
                {day.slice(0, 3)}
              </div>
            ))}

            {calendarDays.map(
              ({ date, currentMonth }, index) => {
                const dayTasks = tasksForDate(date);

                return (
                  <button
                    key={`${formatDateKey(date)}-${index}`}
                    className={`calendar-day ${
                      currentMonth ? "" : "outside-month"
                    } ${isToday(date) ? "today" : ""} ${
                      isSelected(date) ? "selected" : ""
                    }`}
                    onClick={() => selectDate(date)}
                  >
                    <span className="calendar-day-number">
                      {date.getDate()}
                    </span>

                    <div className="calendar-day-tasks">
                      {dayTasks.slice(0, 2).map((task) => (
                        <span
                          key={task.id}
                          className={`calendar-task ${
                            task.priority.toLowerCase()
                          }`}
                        >
                          {task.title}
                        </span>
                      ))}

                      {dayTasks.length > 2 && (
                        <span className="more-tasks">
                          +{dayTasks.length - 2} more
                        </span>
                      )}
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </section>

        <aside className="selected-day-panel">
          <div className="selected-day-header">
            <span className="page-eyebrow">
              SELECTED DAY
            </span>

            <h2>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </h2>

            <p>
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="selected-day-content">
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task) => (
                <div
                  className="calendar-detail-task"
                  key={task.id}
                >
                  <div className="detail-task-top">
                    <span
                      className={`priority-dot ${task.priority.toLowerCase()}`}
                    ></span>

                    <span
                      className={`detail-status ${task.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <h3>{task.title}</h3>

                  <p>{task.project}</p>

                  <div className="detail-task-footer">
                    <span>{task.assignee}</span>

                    <span>{task.priority}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-day-tasks">
                <Clock3 size={30} />

                <h3>No tasks scheduled</h3>

                <p>
                  There are no tasks due on this date.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Calendar;