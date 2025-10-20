import React from "react";
import { Outlet } from "react-router-dom";

export default function Cell() {
  return (
    <div className="m-1">
      <Outlet />
    </div>
  );
}
