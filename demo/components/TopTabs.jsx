import React from "react";
import { Link } from "react-router-dom";

export default function TopTabs({ active }) {
  const tabBtn = (key, label) => (
    <Link
      to={`/${key}`}
      className={`btn btn-sm ${active === key ? "btn-primary" : "btn-outline-light"}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="d-flex align-items-center gap-2">
      {tabBtn("cell", "Cell")}
      {tabBtn("tissue", "Tissue")}
      {tabBtn("organ", "Organ")}
    </div>
  );
}
