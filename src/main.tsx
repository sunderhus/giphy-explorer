import React from "react";
import ReactDOM from "react-dom/client";
import { HomeView } from "@/presentation/views/home-view";
import "@/presentation/assets/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HomeView />
  </React.StrictMode>
);
