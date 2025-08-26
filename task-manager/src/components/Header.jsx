import React from "react";
const IconLeaf = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 21c3-9 9-15 18-18-3 9-9 15-18 18z"
      fill="currentColor"
    />
  </svg>
);

const IconMoon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
      fill="currentColor"
    />
  </svg>
);

const IconSun = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="5" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </g>
  </svg>
);

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="hn-header">
      <div className="brand">
        <div className="logo">
          <IconLeaf size={28} />
        </div>
        <div>
          <div className="brand-title">Harvest Nexus</div>
          <div className="brand-sub">Task Manager</div>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="btn theme-toggle"
          onClick={() => setDarkMode((d) => !d)}
          title="Toggle theme"
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          {darkMode ? <><IconMoon /> Dark</> : <><IconSun /> Light</>}
        </button>
      </div>
    </header>
  );
}
