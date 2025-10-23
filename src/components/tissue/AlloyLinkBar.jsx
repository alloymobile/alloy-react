// src/components/AlloyLinkBar.jsx
import React, { useRef } from "react";
import AlloyLink, { LinkObject } from "../cell/AlloyLink"
import AlloyLinkIcon, { LinkIconObject } from "../cell/AlloyLinkIcon";
import AlloyLinkLogo, { LinkLogoObject } from "../cell/AlloyLinkLogo";

/* ── ID generators (same pattern as LinkObject) ───────────────────────────── */
let __barItemCounter = 0;
function nextBarItemId() {
  __barItemCounter += 1;
  return `barItem${__barItemCounter}`;
}

let __linkBarCounter = 0;
function nextLinkBarId() {
  __linkBarCounter += 1;
  return `linkBar${__linkBarCounter}`;
}

/* ── BarItem ──────────────────────────────────────────────────────────────── */
export class BarItem {
  /**
   * @param {{ id?: string, name?: string, className?: string, show?: boolean }} p
   */
  constructor({ id, name, className, show } = {}) {
    this.id = id ?? nextBarItemId();
    this.name = name ?? "Bar Item";
    this.className = className ?? "";
    this.show = typeof show === "boolean" ? show : false;
  }
}

/* ── LinkBarObject (merged, no inheritance, no `selected`) ────────────────── */
/**
 * @param {{
 *   id?: string,
 *   className?: string,
 *   barName?: BarItem|object,
 *   type?: "AlloyLink"|"AlloyLinkIcon"|"AlloyLinkLogo",
 *   linkClass?: string,
 *   links?: any[]
 * }} p
 */
export class LinkBarObject {
  constructor({ id, className, barName, type, linkClass, links } = {}) {
    this.id = id ?? nextLinkBarId();
    this.className = className ?? "d-flex justify-content-center";
    this.barName = barName instanceof BarItem ? barName : new BarItem(barName ?? {});
    this.type = type ?? "AlloyLink";
    this.linkClass = linkClass ?? "nav-item";
    this.links = Array.isArray(links) ? links.slice() : [];
  }
}

/* ── Component (requires LinkBarObject instance) ──────────────────────────── */
/**
 * AlloyLinkBar — accepts ONLY a LinkBarObject instance via `linkBar`.
 * Mirrors Angular ngSwitch: AlloyLink / AlloyLinkIcon / AlloyLinkLogo / default→AlloyLink
 */
export function AlloyLinkBar({ linkBar }) {
  if (!linkBar || !(linkBar instanceof LinkBarObject)) {
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  }

  // Stabilize the <ul> id like you do in AlloyLink
  const ulIdRef = useRef(linkBar.id);

  const Title = () =>
    linkBar.barName?.show ? (
      <div id={linkBar.barName.id} className={linkBar.barName.className}>
        {linkBar.barName.name}
      </div>
    ) : null;

  const renderAlloyLink = () => (
    <>
      <Title />
      <ul id={ulIdRef.current} className={linkBar.className}>
        {linkBar.links.map((item, idx) => {
          if (!(item instanceof LinkObject)) {
            throw new Error(
              "AlloyLinkBar (type='AlloyLink') requires each `links` item to be a LinkObject instance."
            );
          }
          return (
            <li key={(item?.id ?? idx) + "-li"} className={linkBar.linkClass}>
              <AlloyLink link={item} />
            </li>
          );
        })}
      </ul>
    </>
  );

  const renderAlloyLinkIcon = () => (
    <>
      <Title />
      <ul id={ulIdRef.current} className={linkBar.className}>
        {linkBar.links.map((item, idx) => {
          if (!(item instanceof LinkIconObject)) {
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkIcon') requires each `links` item to be a LinkIconObject instance."
            );
          }
          return (
            <li key={(item?.id ?? idx) + "-li"} className={linkBar.linkClass}>
              <AlloyLinkIcon linkIcon={item} />
            </li>
          );
        })}
      </ul>
    </>
  );

  const renderAlloyLinkLogo = () => (
    <>
      <Title />
      <ul id={ulIdRef.current} className={linkBar.className}>
        {linkBar.links.map((item, idx) => {
          if (!(item instanceof LinkLogoObject)) {
            throw new Error(
              "AlloyLinkBar (type='AlloyLinkLogo') requires each `links` item to be a LinkLogoObject instance."
            );
          }
          return (
            <li key={(item?.id ?? idx) + "-li"} className={linkBar.linkClass}>
              <AlloyLinkLogo linkLogo={item} />
            </li>
          );
        })}
      </ul>
    </>
  );

  switch (linkBar.type) {
    case "AlloyLink":
      return <nav data-type="AlloyLink">{renderAlloyLink()}</nav>;
    case "AlloyLinkIcon":
      return <nav data-type="AlloyLinkIcon">{renderAlloyLinkIcon()}</nav>;
    case "AlloyLinkLogo":
      return <nav data-type="AlloyLinkLogo">{renderAlloyLinkLogo()}</nav>;
    default:
      return <nav data-type="AlloyLink">{renderAlloyLink()}</nav>;
  }
}

export default AlloyLinkBar;
