import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Analytics />
      <App />
  </StrictMode>
);
