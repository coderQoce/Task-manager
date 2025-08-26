import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete, onTogglePin }) {
  if (!tasks.length) {
    return <div className="empty-state">No tasks yet — click "Add Task" to create one.</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onToggleComplete={() => onToggleComplete(task.id)}
          onTogglePin={() => onTogglePin(task.id)}
        />
      ))}
    </ul>
  );
}
