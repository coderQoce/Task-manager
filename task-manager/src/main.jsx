import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/app.css"; // ✅ make sure this file exists

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
