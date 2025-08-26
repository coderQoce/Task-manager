import React from "react";

const IconStar = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 3l2.9 5.88 6.5.94-4.7 4.58 1.11 6.48L12 18.77l-5.81 3.11 1.11-6.48-4.7-4.58 6.5-.94L12 3z"
      fill="currentColor"
    />
  </svg>
);

const IconFlame = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 2s2 3 2 5-1 3-1 3 3-1 4 2-1 7-5 7-6-3-6-6 3-6 6-11z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

export default function StatsBar({ xp, level, streak }) {
  const xpToNextLevel = 100;
  const progress = ((xp % xpToNextLevel) / xpToNextLevel) * 100;

  return (
    <div className="stats-bar">
      <div className="level-info" style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <IconStar /> Level {level}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <IconFlame /> Streak: {streak} days
        </span>
      </div>
      <div className="xp-bar" style={{ marginTop: 4 }}>
        <div className="xp-progress" style={{ width: `${progress}%` }} />
      </div>
      <small>{xp % xpToNextLevel} / {xpToNextLevel} XP</small>
    </div>
  );
}
