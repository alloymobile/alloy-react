import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import Cell from "./pages/Cell/Cell.jsx";           // now acts as Cell layout (with <Outlet/>)
import Tissue from "./pages/Tissue.jsx";
import Organ from "./pages/Organ.jsx";
import IconPage from "./pages/cell/Icon.jsx";  // NEW

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<Navigate to="/cell" replace />} />

        {/* Cell routes */}
        <Route path="/cell" element={<Cell />}>
          <Route index element={<Navigate to="icon" replace />} />
          <Route path="icon" element={<IconPage />} />
        </Route>

        {/* Others (blank for now) */}
        <Route path="/tissue" element={<Tissue />} />
        <Route path="/organ" element={<Organ />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
