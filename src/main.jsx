import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import App2 from "./App2.jsx";
import { QueryProvider } from "@/lib/react-query/QueryProvider";

import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
);

// <React.StrictMode>
