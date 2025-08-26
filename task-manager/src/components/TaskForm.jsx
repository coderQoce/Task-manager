import React, { useEffect, useState } from "react";

// ============================
// Task Form
// ============================
export function TaskForm({ onClose, onSave, initial = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");
  const [pinned, setPinned] = useState(false);
  const [category, setCategory] = useState("work");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setDate(initial.date || "");
      setTime(initial.time || "");
      setPriority(initial.priority || "low");
      setPinned(initial.pinned || false);
      setCategory(initial.category || "work");
    }
  }, [initial]);

  function handleSave(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    onSave({
      id: initial?.id || Date.now(),
      title: title.trim(),
      description,
      date,
      time,
      priority,
      pinned,
      category,
      completed: initial?.completed || false,
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <h3>{initial ? "Edit Task" : "Create Task"}</h3>

        <form onSubmit={handleSave} className="task-form-modal">
          <label>
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task details..."
            />
          </label>

          <div className="row">
            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label>
              Time
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>

          <div className="row">
            <label>
              Priority
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </label>

            <label>
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="fitness">Fitness</option>
                <option value="study">Study</option>
                <option value="others">Others</option>
              </select>
            </label>
          </div>

          <label className="pin-label">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
            />
            Pin to top
          </label>

          {error && <div className="error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {/* Cancel Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 011 .708L5.707 6l2.647 2.646a.5.5 0 11-.708.708L5 6.707 2.354 9.354a.5.5 0 01-.708-.708L4.293 6 1.646 3.354a.5.5 0 01.708-.708L5 5.293l2.646-2.647a.5.5 0 11.708.708L5.707 6l2.647 2.646a.5.5 0 01-.708.708L5 6.707 2.354 9.354a.5.5 0 01-.708-.708L4.293 6 1.646 3.354a.5.5 0 01.708-.708z" />
              </svg>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {/* Save Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a7 7 0 107 7A7 7 0 008 1zm3.146 4.646a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-2-2a.5.5 0 11.708-.708L7.5 9.293z" />
              </svg>
              {initial ? "Save changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================
// Search Component
// ============================
export function Search({ tasks, onFilter }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      onFilter(tasks);
    } else {
      const filtered = tasks.filter((task) => {
        const q = query.toLowerCase();
        return (
          task.title.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q) ||
          task.category.toLowerCase().includes(q)
        );
      });
      onFilter(filtered);
    }
  }, [query, tasks, onFilter]);

  return (
    <div className="search-bar">
      <div className="search-icon">
        {/* Magnifying glass SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387a6.5 6.5 0 111.414-1.414zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search tasks by title, description, or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
