// src/components/tissue/AlloyLinkBar.jsx
import React, { useEffect, useRef, useState } from "react";
import AlloyLink, { LinkObject } from "../cell/AlloyLink";
import AlloyLinkIcon, { LinkIconObject } from "../cell/AlloyLinkIcon";
import AlloyLinkLogo, { LinkLogoObject } from "../cell/AlloyLinkLogo";

/* ── ID generators ───────────────────────────────────────────────────────── */
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

/* ── BarItem ─────────────────────────────────────────────────────────────── */
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

/* ── LinkBarObject (hydrates `links` by `type`) ───────────────────────────── */
/**
 * @param {{
 *   id?: string,
 *   className?: string,              // applied to <ul>
 *   barName?: BarItem|object,
 *   type?: "AlloyLink"|"AlloyLinkIcon"|"AlloyLinkLogo",
 *   linkClass?: string,              // applied to each <li>
 *   links?: any[],                   // plain JSON or instances → hydrated here
 *   selected?: string                // class name applied to the selected item (e.g. "active")
 * }} p
 */
export class LinkBarObject {
  constructor({ id, className, barName, type, linkClass, links, selected } = {}) {
    this.id = id ?? nextLinkBarId();
    this.className = className ?? "d-flex justify-content-center";
    this.barName = barName instanceof BarItem ? barName : new BarItem(barName ?? {});
    this.type = type ?? "AlloyLink";
    this.linkClass = linkClass ?? "nav-item";
    this.selected = selected ?? "active";

    // 🔽 Hydrate links to proper instances based on `type`
    const src = Array.isArray(links) ? links : [];
    switch (this.type) {
      case "AlloyLinkIcon":
        this.links = src.map((l) =>
          l instanceof LinkIconObject
            ? l
            : new LinkIconObject({
                id: l?.id,
                href: l?.href,
                icon: l?.icon, // LinkIconObject ctor will wrap plain icon into IconObject
                name: l?.name,
                className: l?.className,
                active: l?.active,
                target: l?.target,
                rel: l?.rel,
                onClick: l?.onClick,
                title: l?.title,
              })
        );
        break;

      case "AlloyLinkLogo":
        this.links = src.map((l) =>
          l instanceof LinkLogoObject
            ? l
            : new LinkLogoObject({
                id: l?.id,
                name: l?.name,
                href: l?.href,
                logo: l?.logo,
                width: l?.width,
                height: l?.height,
                logoAlt: l?.logoAlt,
                className: l?.className,
                active: l?.active,
                target: l?.target,
                rel: l?.rel,
                onClick: l?.onClick,
                title: l?.title,
              })
        );
        break;

      case "AlloyLink":
      default:
        this.links = src.map((l) =>
          l instanceof LinkObject
            ? l
            : new LinkObject({
                id: l?.id,
                name: l?.name,
                href: l?.href,
                className: l?.className,
                active: l?.active,
                target: l?.target,
                rel: l?.rel,
                onClick: l?.onClick,
                title: l?.title,
              })
        );
        break;
    }
  }
}

/* ── small helper: inject active + click without mutating original model ─── */
function cloneWithActiveAndClick(item, activeClass, isSelected, wrappedOnClick) {
  const active = isSelected ? activeClass : "";

  if (item instanceof LinkObject) {
    return new LinkObject({
      id: item.id,
      name: item.name,
      href: item.href,
      className: item.className,
      active,
      target: item.target,
      rel: item.rel,
      onClick: wrappedOnClick,
      title: item.title,
    });
  }

  if (item instanceof LinkIconObject) {
    return new LinkIconObject({
      id: item.id,
      href: item.href,
      icon: item.icon,
      name: item.name,
      className: item.className,
      active,
      target: item.target,
      rel: item.rel,
      onClick: wrappedOnClick,
      title: item.title,
    });
  }

  if (item instanceof LinkLogoObject) {
    return new LinkLogoObject({
      id: item.id,
      name: item.name,
      href: item.href,
      logo: item.logo,
      width: item.width,
      height: item.height,
      logoAlt: item.logoAlt,
      className: item.className,
      active,
      target: item.target,
      rel: item.rel,
      onClick: wrappedOnClick,
      title: item.title,
    });
  }

  return item;
}

/* ── Component: AlloyLinkBar ─────────────────────────────────────────────── */
/**
 * Accepts ONLY a hydrated LinkBarObject; ensures only ONE link has the selected class.
 */
export function AlloyLinkBar({ linkBar }) {
  if (!linkBar || !(linkBar instanceof LinkBarObject)) {
    throw new Error("AlloyLinkBar requires `linkBar` (LinkBarObject instance).");
  }

  const ulIdRef = useRef(linkBar.id);
  const [selectedId, setSelectedId] = useState("");

  // Reset selection when the bar instance changes (or on mount)
  useEffect(() => {
    setSelectedId("");
  }, [linkBar]);

  const Title = () =>
    linkBar.barName?.show ? (
      <div id={linkBar.barName.id} className={linkBar.barName.className}>
        {linkBar.barName.name}
      </div>
    ) : null;

  // Wrap original onClick: set selection, then call original
  function wrapOnClick(item) {
    const original = item.onClick;
    return (e) => {
      const nextId = item.id || `${item.href || ""}-${item.name || ""}`;
      setSelectedId(nextId);
      original?.(e);
    };
  }

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
          const isSelected = (item?.id ?? "") === selectedId;
          const cloned = cloneWithActiveAndClick(
            item,
            linkBar.selected,
            isSelected,
            wrapOnClick(item)
          );
          return (
            <li key={(item?.id ?? idx) + "-li"} className={linkBar.linkClass}>
              <AlloyLink link={cloned} />
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
          const isSelected = (item?.id ?? "") === selectedId;
          const cloned = cloneWithActiveAndClick(
            item,
            linkBar.selected,
            isSelected,
            wrapOnClick(item)
          );
          return (
            <li key={(item?.id ?? idx) + "-li"} className={linkBar.linkClass}>
              <AlloyLinkIcon linkIcon={cloned} />
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
          const isSelected = (item?.id ?? "") === selectedId;
          const cloned = cloneWithActiveAndClick(
            item,
            linkBar.selected,
            isSelected,
            wrapOnClick(item)
          );
          return (
            <li key={(item?.id ?? idx) + "-li"} className={linkBar.linkClass}>
              <AlloyLinkLogo linkLogo={cloned} />
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
