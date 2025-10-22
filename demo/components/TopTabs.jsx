import React from "react";
import { Link } from "react-router-dom";

export default function TopTabs({ active }) {
  const tabBtn = (key, label) => (
    <Link
      to={`/${key}`}
      className={`nav-link ${active === key ? "active" : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="nav nav-pills nav-fill gap-2">
      {tabBtn("cell", "Cell")}
      {tabBtn("tissue", "Tissue")}
      {tabBtn("organ", "Organ")}
    </div>
  );
}
