// src/components/tissue/AlloyCard.jsx
import React from "react";
import { Link } from "react-router-dom";

/* ---------------------- id generators ---------------------- */
let __cardCounter = 0;
let __cardItemCounter = 0;
function nextCardId() {
  __cardCounter += 1;
  return `card${__cardCounter}`;
}
function nextCardItemId() {
  __cardItemCounter += 1;
  return `carditem${__cardItemCounter}`;
}

/* ---------------------- Model ---------------------- */
export class CardItem {
  /**
   * @param {{ id?:string, name?:string, className?:string, show?:boolean }=} res
   */
  constructor(res = {}) {
    this.id = res.id ?? nextCardItemId(); // follow ID generator rule
    this.className = res.className ?? "";
    this.name = res.name ?? "Card Item";
    this.show = typeof res.show === "boolean" ? res.show : true;
  }
}

/**
 * Top-level Card object
 */
export class CardObject {
  /**
   * @param {{ id?:string, className?:string, body?:CardItem|object, fields?:Array<CardItem|object>, link?:string }=} res
   */
  constructor(res = {}) {
    this.id = res.id ?? nextCardId(); // follow ID generator rule
    this.className = res.className ?? "card border m-2 shadow";
    this.link = typeof res.link === "string" ? res.link : "";

    this.body = res.body instanceof CardItem ? res.body : new CardItem(res.body || {});
    const rawFields = Array.isArray(res.fields) ? res.fields : [];
    this.fields = rawFields.map((i) => (i instanceof CardItem ? i : new CardItem(i)));
  }
}

/* ---------------------- Component ---------------------- */
/**
 * Props:
 *  - card: CardObject (required)
 *
 * Behavior:
 *  - If `card.link` is truthy, the whole card renders as a <Link>.
 *  - Otherwise, it’s a plain <div>, no click handlers, no output.
 */
export function AlloyCard({ card }) {
  if (!card || !(card instanceof CardObject)) {
    throw new Error("AlloyCard requires `card` (CardObject instance).");
    // (keep this strict like other Alloy* components)
  }

  const content = (
    <div
      id={card.body.id}
      className={card.body.className}
      aria-label={card.body.name}
    >
      {card.fields.map((field) =>
        field?.show ? (
          <div id={field.id} className={field.className} key={field.id}>
            {field.name}
          </div>
        ) : null
      )}
    </div>
  );

  return card.link ? (
    <Link id={card.id} to={card.link} className={card.className + " text-decoration-none"}>
      {content}
    </Link>
  ) : (
    <div id={card.id} className={card.className}>
      {content}
    </div>
  );
}

export default AlloyCard;
