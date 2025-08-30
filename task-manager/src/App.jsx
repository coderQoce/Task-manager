import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import { TaskForm } from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./styles/app.css";

/* ==== Tiny, accessible SVG icon components ==== */
const IconPlus = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconSearch = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconChevronUp = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const IconChevronDown = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const IconClock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconStar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 3l2.9 5.88 6.5.94-4.7 4.58 1.11 6.48L12 18.77l-5.81 3.11 1.11-6.48-4.7-4.58 6.5-.94L12 3z"
      fill="currentColor"
    />
  </svg>
);

const IconFlame = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 2s2 3 2 5-1 3-1 3 3-1 4 2-1 7-5 7-6-3-6-6 3-6 6-11z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("hn_tasks_v2");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("datetime");
  const [sortDir, setSortDir] = useState("asc");

  const [xp, setXp] = useState(() => Number(localStorage.getItem("hn_xp_v2")) || 0);
  const [level, setLevel] = useState(() => Math.floor(xp / 100) + 1);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("hn_streak_v2")) || 0);
  const [lastCompletedDate, setLastCompletedDate] = useState(
    () => localStorage.getItem("hn_last_completed_v2") || null
  );

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("hn_tasks_v2", JSON.stringify(tasks));
    localStorage.setItem("hn_xp_v2", xp);
    localStorage.setItem("hn_streak_v2", streak);
    localStorage.setItem("hn_last_completed_v2", lastCompletedDate);
  }, [tasks, xp, streak, lastCompletedDate]);

  useEffect(() => {
    document.body.classList.toggle("light", !darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const isTaskOverdue = (task) =>
    task.datetime && !task.completed && new Date(task.datetime) < new Date();

  const updateXp = (change) => {
    setXp((prevXp) => {
      const newXp = Math.max(prevXp + change, 0);
      setLevel(Math.floor(newXp / 100) + 1);
      return newXp;
    });
  };

  const openNewTask = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };
  const openEditTask = (task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const addTask = (payload) => {
    const createdAt = Date.now();
    const datetime = payload.date
      ? payload.time
        ? new Date(`${payload.date}T${payload.time}`)
        : new Date(`${payload.date}T00:00`)
      : null;

    const task = {
      id: Date.now() + Math.floor(Math.random() * 999),
      title: payload.title,
      description: payload.description || "",
      date: payload.date || null,
      time: payload.time || null,
      datetime: datetime ? datetime.toISOString() : null,
      priority: payload.priority || "low",
      category: payload.category || "General",
      pinned: payload.pinned || false,
      completed: false,
      createdAt,
    };
    setTasks((s) => [task, ...s]);
    setIsFormOpen(false);
  };

  const updateTask = (id, payload) => {
    const datetime = payload.date
      ? payload.time
        ? new Date(`${payload.date}T${payload.time}`)
        : new Date(`${payload.date}T00:00`)
      : null;

    setTasks((s) =>
      s.map((t) =>
        t.id === id
          ? {
              ...t,
              title: payload.title,
              description: payload.description || "",
              date: payload.date || null,
              time: payload.time || null,
              datetime: datetime ? datetime.toISOString() : null,
              priority: payload.priority || t.priority,
              category: payload.category ?? t.category,
            }
          : t
      )
    );
    setTaskToEdit(null);
    setIsFormOpen(false);
  };

  const deleteTask = (id) => {
    setTasks((s) => s.filter((t) => t.id !== id));
    updateXp(-2);
  };

  const toggleComplete = (id) => {
    setTasks((s) =>
      s.map((t) => {
        if (t.id === id) {
          const newCompleted = !t.completed;

          if (newCompleted) {
            updateXp(10);

            const taskTime = new Date(t.datetime || t.createdAt);
            if (taskTime <= now) {
              const today = now.toDateString();
              const yesterday = new Date(now);
              yesterday.setDate(yesterday.getDate() - 1);
              const lastDate = lastCompletedDate ? new Date(lastCompletedDate) : null;

              if (!lastDate) {
                setStreak(1);
              } else if (lastDate.toDateString() === yesterday.toDateString()) {
                setStreak((prev) => prev + 1);
              } else if (lastDate.toDateString() === today) {
                // same-day completion doesn't break streak
              } else {
                setStreak(1);
              }
              setLastCompletedDate(today);
            }
          } else {
            updateXp(-10);
          }

          return { ...t, completed: newCompleted };
        }
        return t;
      })
    );
  };

  const togglePin = (id) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t)));
  };

  const categories = useMemo(() => {
    const unique = new Set(tasks.map((t) => t.category || "General"));
    return ["all", ...Array.from(unique)];
  }, [tasks]);

  const displayedTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let out = tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      if (filter === "overdue") return isTaskOverdue(task);
      return true;
    });

    if (categoryFilter !== "all") {
      out = out.filter((t) => (t.category || "General") === categoryFilter);
    }

    if (q) {
      out = out.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.category || "").toLowerCase().includes(q)
      );
    }

    const priorityOrder = { critical: 1, high: 2, medium: 3, low: 4, none: 5 };

    out.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      const dir = sortDir === "asc" ? 1 : -1;

      switch (sortBy) {
        case "datetime":
          return (
            ((a.datetime ? new Date(a.datetime).getTime() : a.createdAt) -
              (b.datetime ? new Date(b.datetime).getTime() : b.createdAt)) * dir
          );
        case "priority":
          return (priorityOrder[a.priority] - priorityOrder[b.priority]) * dir;
        case "title":
          return a.title.localeCompare(b.title) * dir;
        case "createdAt":
          return (a.createdAt - b.createdAt) * dir;
        case "category":
          return ((a.category || "").localeCompare(b.category || "")) * dir;
        default:
          return 0;
      }
    });

    return out;
  }, [tasks, filter, categoryFilter, searchQuery, sortBy, sortDir]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.filter((t) => !t.completed).length;
    const overdue = tasks.filter((t) => isTaskOverdue(t)).length;
    return { total, completed, pending, overdue };
  }, [tasks]);

  return (
    <div className="app-wrapper">
      <div className="app-card">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Top Controls */}
        <div className="top-controls">
          <div className="left-controls">
            <button className="btn btn-primary" onClick={openNewTask} aria-label="Add task">
              <span className="btn-content">
                <IconPlus />
                <span>Add Task</span>
              </span>
            </button>

            <div className="controls-group">
              {/* ✅ Search input fixed */}
              <div className="search-wrapper">
                <IconSearch size={16} className="search-icon" />
                <input
                  className="quick-search"
                  type="search"
                  aria-label="Search tasks"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="select-control"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort by"
              >
                <option value="datetime">Sort: Date / Due</option>
                <option value="priority">Sort: Priority</option>
                <option value="title">Sort: Title</option>
                <option value="createdAt">Sort: Created</option>
                <option value="category">Sort: Category</option>
              </select>

              <button
                className="btn btn-ghost"
                aria-label={`Sort direction ${sortDir === "asc" ? "ascending" : "descending"}`}
                onClick={() => setSortDir((s) => (s === "asc" ? "desc" : "asc"))}
                title={sortDir === "asc" ? "Ascending" : "Descending"}
              >
                {sortDir === "asc" ? <IconChevronUp /> : <IconChevronDown />}
              </button>
            </div>
          </div>

          <div className="right-controls">
            <FilterBar filter={filter} setFilter={setFilter} />
            <select
              className="select-control"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="stats-inline">
          <div className="stat">Total: <strong>{stats.total}</strong></div>
          <div className="stat">Completed: <strong>{stats.completed}</strong></div>
          <div className="stat">Pending: <strong>{stats.pending}</strong></div>
          <div className="stat">
            Overdue: <strong className={stats.overdue > 0 ? "danger" : ""}>{stats.overdue}</strong>
          </div>
          <div className="stat time">
            <IconClock /> {now.toLocaleString()}
          </div>
        </div>

        <div className="stats-bar">
          <div className="stats-top">
            <span><IconStar /> Level {level}</span>
            <span><IconFlame /> Streak: {streak} days</span>
          </div>
          <div className="xp-progress" aria-label="XP progress">
            <div style={{ width: `${xp % 100}%` }} />
          </div>
          <small>{xp % 100} / 100 XP</small>
        </div>

        <TaskList
          tasks={displayedTasks}
          onEdit={openEditTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onTogglePin={togglePin}
        />
      </div>

      {isFormOpen && (
        <TaskForm
          onClose={() => {
            setIsFormOpen(false);
            setTaskToEdit(null);
          }}
          onSave={(payload) => {
            if (taskToEdit) updateTask(taskToEdit.id, payload);
            else addTask(payload);
          }}
          initial={taskToEdit}
        />
      )}
    </div>
  );
}
