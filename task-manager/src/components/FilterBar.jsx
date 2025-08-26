import React from "react";

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="filterbar">
      <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
      <button className={`filter-btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
      <button className={`filter-btn ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>Pending</button>
      <button className={`filter-btn ${filter === "overdue" ? "active" : ""}`} onClick={() => setFilter("overdue")}>Overdue</button>
    </div>
  );
}
