import React from "react";
import confetti from "canvas-confetti";

// Format datetime helper
function formatDatetime(task) {
  if (task.datetime) {
    const d = new Date(task.datetime);
    return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  }
  if (task.date) {
    return new Date(task.date).toLocaleDateString();
  }
  return "No date";
}

// Icons
const IconCheck = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const IconSquare = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
);

const IconEdit = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const IconTrash = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5 0V4a2 2 0 012-2h2a2 2 0 012 2v2" />
  </svg>
);

const IconPin = ({ size = 18, filled = false }) => (
  filled ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 3l4 4-8 8v6l-4-2v-4L3 7l4-4h10z" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 17v5" />
      <path d="M5 9h14l-4 8H9L5 9z" />
      <path d="M12 2v2" />
    </svg>
  )
);

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete, onTogglePin }) {
  const isOverdue = task.datetime ? new Date(task.datetime) < new Date() && !task.completed : false;

  const priorityClass = {
    low: "priority-low",
    medium: "priority-medium",
    high: "priority-high",
    critical: "priority-critical",
  }[task.priority || "low"];

  const handleToggleComplete = () => {
    if (!task.completed) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    onToggleComplete();
  };

  return (
    <li className={`task-card ${priorityClass} ${task.completed ? "completed" : ""}`}>
      <div className="task-left">
        <button className="complete-btn" onClick={handleToggleComplete} title="Toggle complete">
          {task.completed ? <IconCheck /> : <IconSquare />}
        </button>

        <div className="task-body">
          <div className="task-title">
            <strong>{task.title}</strong>
            {task.pinned && <span className="pinned"><IconPin filled /></span>}
          </div>

          {task.description && <div className="task-desc">{task.description}</div>}

          <div className="task-meta">
            <small className={`meta-date ${isOverdue ? "overdue" : ""}`}>{formatDatetime(task)}</small>
            <small className="meta-priority"> • {task.priority?.toUpperCase()}</small>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button className="btn edit" onClick={onEdit} title="Edit"><IconEdit /></button>
        <button className="btn pin" onClick={onTogglePin} title="Pin/Unpin">
          <IconPin filled={task.pinned} />
        </button>
        <button className="btn delete" onClick={onDelete} title="Delete"><IconTrash /></button>
      </div>
    </li>
  );
}
