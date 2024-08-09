import React from "react";
import ReactDOM from "react-dom/client";
import { configure } from "mobx";

import App from "./App.tsx";

import "./index.css";

configure({
  enforceActions: "never",
  useProxies: "never",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
