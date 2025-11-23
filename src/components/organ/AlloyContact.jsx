// src/lib/components/organ/AlloyContact.jsx
import React from "react";

import { OutputObject, generateId } from "../../utils/idHelper.js";
import AlloyForm, { FormObject } from "../tissue/AlloyForm.jsx";
import AlloyCard, { CardObject } from "../tissue/AlloyCard.jsx";

/* -------------------------------------------------------
 * ContactObject (model)
 * ----------------------------------------------------- */
export class ContactObject {
  constructor(cfg = {}) {
    const {
      id,
      title = "Contact Us",
      type = "AlloyInputTextIcon",
      className = "d-flex justify-content-center flex-column text-center h-100 mt-3",
      contactClass = "col-12 col-md-6",
      addressClass = "col-12 col-md-6",
      contactForm,
      addressCard,
      data,
      ...rest
    } = cfg || {};

    this.id = id ?? generateId("contact");
    this.title = title;
    this.type = type;
    this.className = className;
    this.contactClass = contactClass;
    this.addressClass = addressClass;

    // contactForm → FormObject
    this.contactForm =
      contactForm instanceof FormObject
        ? contactForm
        : new FormObject(contactForm || {});

    // addressCard → CardObject (CardObject now REQUIRES fields[])
    // We normalize so:
    //  - body is always present
    //  - there is at least one field
    //  - if no fields given, we reuse body.name as a single field line
    if (addressCard instanceof CardObject) {
      // Already a model, trust it (assumed valid)
      this.addressCard = addressCard;
    } else {
      const raw = addressCard || {};

      const body = raw.body || {
        id: "contactAddressBody",
        className: "card-body"
      };

      const hasFields = Array.isArray(raw.fields) && raw.fields.length > 0;

      const fields = hasFields
        ? raw.fields
        : [
            {
              id: "addressLine",
              className: "text-center text-muted",
              name:
                body.name ||
                "Configure addressCard.fields to show address info."
            }
          ];

      // If we synthesized fields from body.name, clear body.name to avoid duplicate text
      const finalBody = {
        ...body,
        name: hasFields ? body.name || "" : ""
      };

      const addrCfg = {
        id: raw.id || "contactAddressFallback",
        className: raw.className || "card border-0",
        header: raw.header,
        body: finalBody,
        fields,
        footer: raw.footer
      };

      this.addressCard = new CardObject(addrCfg);
    }

    this.data = data || {};

    Object.assign(this, rest);
  }
}

/* -------------------------------------------------------
 * AlloyContact (view)
 *
 * Props:
 *   - contact: ContactObject
 *   - output?: (out: OutputObject) => void
 *
 * Behavior:
 *   - The inner AlloyForm emits type="form", action="submit".
 *   - AlloyContact wraps that into type="contact", action="submit".
 * ----------------------------------------------------- */
export function AlloyContact({ contact, output }) {
  if (!contact || !(contact instanceof ContactObject)) {
    throw new Error(
      "AlloyContact requires `contact` (ContactObject instance)."
    );
  }

  const emit = (out) => {
    if (typeof output === "function") {
      output(out);
    }
  };

  function handleFormOutput(formOut) {
    if (!formOut) return;

    const base =
      formOut instanceof OutputObject && typeof formOut.toJSON === "function"
        ? formOut.toJSON()
        : formOut || {};

    const wrapped = new OutputObject({
      id: contact.id,
      type: "contact",
      action: base.action || "submit",
      error: !!base.error,
      data: base.data || {}
    });

    emit(wrapped);
  }

  return (
    <div id={contact.id} className={contact.className}>
      <h1 className="text-center mb-4">{contact.title}</h1>

      <div className="row d-flex align-items-center">
        <div className={contact.contactClass}>
          <AlloyForm form={contact.contactForm} output={handleFormOutput} />
        </div>

        <div className={contact.addressClass}>
          <AlloyCard card={contact.addressCard} />
        </div>
      </div>
    </div>
  );
}

export default AlloyContact;
