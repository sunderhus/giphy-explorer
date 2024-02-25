import React from "react";
import ReactDOM from "react-dom/client";
import "@/presentation/assets/main.css";
import { MakeHomeView } from "./main/factories/views/make-home-view";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MakeHomeView />
  </React.StrictMode>
);
