import React, { useMemo, useState } from "react";
import { AlloyProfile, ProfileObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT PROFILE JSON
 * ----------------------------------------- */

const DEFAULT_PROFILE_JSON = JSON.stringify(
  {
    id: "profile",
    className: "container py-3",
    name: "John Doe",
    email: "john.doe@example.com",
    icon: {
      iconClass: "fa-solid fa-user fa-2xl"
    },
    action: "updateProfile",

    profileForm: {
      id: "profileForm",
      title: "Profile",
      className: "col-12",
      message: "",
      action: "updateProfile",
      type: "AlloyInputTextIcon",
      submit: {
        id: "profileSubmit",
        name: "Update profile",
        icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
        className: "btn btn-primary w-100 mt-3",
        disabled: false,
        loading: false,
        ariaLabel: "Update profile",
        title: "Update profile"
      },
      fields: [
        {
          id: "firstName",
          name: "firstName",
          label: "First Name",
          type: "text",
          layout: "text",
          placeholder: "John",
          required: true,
          minLength: 2
        },
        {
          id: "lastName",
          name: "lastName",
          label: "Last Name",
          type: "text",
          layout: "text",
          placeholder: "Doe",
          required: true,
          minLength: 2
        },
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          layout: "text",
          placeholder: "john.doe@example.com",
          required: true
        },
        {
          id: "phone",
          name: "phone",
          label: "Phone",
          type: "tel",
          layout: "text",
          placeholder: "+1 (555) 123-4567"
        },
        {
          id: "company",
          name: "company",
          label: "Company",
          type: "text",
          layout: "text",
          placeholder: "PrecastXchange Inc."
        },
        {
          id: "city",
          name: "city",
          label: "City",
          type: "text",
          layout: "text",
          placeholder: "Toronto"
        }
      ],
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "",
        company: "PrecastXchange Inc.",
        city: "Toronto"
      }
    },

    details: {
      id: "profileAddressCrud",
      className: "container-fluid mt-3",
      type: "AlloyCardAction",

      modal: {
        id: "addressModal",
        title: "Address",
        className: "modal fade",
        action: "Create",
        submit: {
          id: "saveAddressBtn",
          name: "Save address",
          className: "btn btn-primary",
          icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
          active: "active",
          ariaLabel: "Save address",
          title: "Save address"
        },
        fields: [
          {
            name: "label",
            label: "Label",
            type: "text",
            layout: "text",
            placeholder: "Home / Office / Billing",
            required: true,
            minLength: 3
          },
          {
            name: "street",
            label: "Street",
            type: "text",
            layout: "text",
            placeholder: "123 Main St",
            required: true
          },
          {
            name: "city",
            label: "City",
            type: "text",
            layout: "text",
            placeholder: "Toronto",
            required: true
          },
          {
            name: "country",
            label: "Country",
            type: "text",
            layout: "text",
            placeholder: "Canada",
            required: true
          },
          {
            name: "postalCode",
            label: "Postal Code",
            type: "text",
            layout: "text",
            placeholder: "A1A 1A1",
            required: true
          }
        ],
        data: {
          label: "",
          street: "",
          city: "",
          country: "",
          postalCode: ""
        }
      },

      add: {
        id: "addAddressButton",
        name: "Add address",
        icon: { iconClass: "fa-solid fa-plus" },
        className: "btn btn-primary",
        title: "Add address",
        ariaLabel: "Add address"
      },

      cards: [
        {
          id: "addrHome",
          className: "col-12 col-md-6 col-lg-4",
          header: {
            id: "addrHomeHeader",
            name: "Home",
            className: "card-header py-2 fw-semibold"
          },
          body: {
            id: "addrHomeBody",
            name: "123 Main St",
            className: "card-body"
          },
          fields: [
            {
              id: "addrHomeCity",
              name: "City: Toronto",
              className: "small"
            },
            {
              id: "addrHomeCountry",
              name: "Country: Canada",
              className: "small"
            },
            {
              id: "addrHomePostal",
              name: "Postal: A1A 1A1",
              className: "small"
            }
          ],
          footer: {
            id: "addrHomeFooter",
            name: "Primary address",
            className:
              "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2"
          },
          type: "AlloyButtonBar",
          action: {
            id: "addrHomeActions",
            className: "nav gap-2",
            barName: { show: false },
            type: "AlloyButton",
            buttons: [
              {
                id: "editAddressBtn",
                name: "Edit",
                icon: { iconClass: "fa-solid fa-pen" },
                className: "btn btn-outline-primary btn-sm",
                title: "Edit address",
                ariaLabel: "Edit address"
              },
              {
                id: "deleteAddressBtn",
                name: "Delete",
                icon: { iconClass: "fa-solid fa-trash" },
                className: "btn btn-outline-danger btn-sm",
                title: "Delete address",
                ariaLabel: "Delete address"
              }
            ]
          }
        }
      ]
    }
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page
 * ----------------------------------------- */

export default function ProfilePage() {
  const [profileJson, setProfileJson] = useState(DEFAULT_PROFILE_JSON);
  const [profileParseError, setProfileParseError] = useState("");
  const [profileOutputJson, setProfileOutputJson] = useState(
    "// Submit the profile form or use address actions to see OutputObject here…"
  );

  const profileModel = useMemo(() => {
    try {
      const raw = JSON.parse(profileJson || "{}");
      const model = new ProfileObject(raw);
      setProfileParseError("");
      return model;
    } catch (e) {
      setProfileParseError(String(e.message || e));

      return new ProfileObject({
        id: "profile-invalid",
        className:
          "d-flex justify-content-center flex-column text-center h-100 mt-3",
        name: "Invalid JSON (Profile)",
        email: "",
        profileForm: {
          title: "Invalid JSON (Profile)",
          className: "col-12",
          message:
            "Fix the JSON on the left to preview the real profile form.",
          submit: {
            name: "Submit (disabled)",
            icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
            className: "btn btn-secondary w-100 mt-3",
            disabled: true,
            loading: false,
            ariaLabel: "Submit (disabled)",
            title: "Submit (disabled)"
          },
          fields: []
        },
        details: {
          id: "invalidProfileDetails",
          className: "container-fluid mt-3",
          type: "AlloyCardAction",
          modal: {
            id: "invalidProfileModal",
            title: "Invalid Address JSON",
            submit: {
              name: "Submit (disabled)",
              className: "btn btn-secondary",
              icon: { iconClass: "fa-solid fa-circle-notch fa-spin" },
              disabled: true
            },
            fields: [],
            data: {}
          },
          add: {
            id: "addAddressDisabled",
            name: "Add address (disabled)",
            icon: { iconClass: "fa-solid fa-plus" },
            className: "btn btn-secondary",
            disabled: true,
            ariaLabel: "Add address (disabled)",
            title: "Add address (disabled)"
          },
          cards: []
        }
      });
    }
  }, [profileJson]);

  function handleProfileOutput(out) {
    const payload =
      out instanceof OutputObject && typeof out.toJSON === "function"
        ? out.toJSON()
        : out;

    setProfileOutputJson(JSON.stringify(payload, null, 2));
  }

  function resetProfile() {
    setProfileJson(DEFAULT_PROFILE_JSON);
    setProfileOutputJson(
      "// Submit the profile form or use address actions to see OutputObject here…"
    );
    setProfileParseError("");
  }

  function formatProfile() {
    try {
      const parsed = JSON.parse(profileJson);
      setProfileJson(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore; parse error already shown
    }
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyProfile</h3>

      {/* Usage snippet */}
      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {
                "<AlloyProfile profile={new ProfileObject(profileObject)} output={handleOutput} />"
              }
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="row mb-4">
        <div className="col-12">
          <AlloyProfile profile={profileModel} output={handleProfileOutput} />

          <div className="small text-secondary mt-2 text-center">
            <strong>Profile form</strong> is a normal{" "}
            <code>AlloyForm</code> – validates each field and only emits an{" "}
            <code>OutputObject</code> on submit. The payload uses{" "}
            <code>type="profile"</code>, <code>action="form.submit"</code>, and
            a flat data map with your values.
            <br />
            <strong>Address section</strong> uses{" "}
            <code>AlloyCrudCard</code>. Add/Edit/Delete addresses open a modal
            and emit <code>type="profile"</code> with{" "}
            <code>action="details.&lt;innerAction&gt;"</code> plus the flat
            address data.
          </div>
        </div>
      </div>

      {/* JSON in / JSON out */}
      <div className="row g-3 align-items-stretch">
        {/* Left: Input JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Profile Input JSON (editable)
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={resetProfile}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={formatProfile}
                title="Format JSON"
              >
                <i
                  className="fa-solid fa-wand-magic-sparkles me-2"
                  aria-hidden="true"
                />
                Format
              </button>
            </div>
          </div>

          <textarea
            className={`form-control font-monospace ${
              profileParseError ? "is-invalid" : ""
            }`}
            rows={26}
            value={profileJson}
            onChange={(e) => setProfileJson(e.target.value)}
            spellCheck={false}
          />
          {profileParseError && (
            <div className="invalid-feedback d-block mt-1">
              {profileParseError}
            </div>
          )}

          <div className="form-text">
            Single JSON drives everything:
            <ul className="mb-0">
              <li>
                <code>profileForm</code> → fields and submit button.
              </li>
              <li>
                <code>details.modal</code> → address modal fields.
              </li>
              <li>
                <code>details.cards[]</code> → address cards and their footer
                buttons.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Output JSON */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Output (from <code>output</code> callback)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setProfileOutputJson("// cleared")}
            >
              Clear
            </button>
          </div>

          <textarea
            className="form-control font-monospace"
            rows={26}
            value={profileOutputJson}
            onChange={(e) => setProfileOutputJson(e.target.value)}
            spellCheck={false}
          />

          <div className="form-text">
            Example (successful profile submit):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "profile",
  "type": "profile",
  "action": "form.submit",
  "error": false,
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "",
    "company": "PrecastXchange Inc.",
    "city": "Toronto"
  }
}`}
            </pre>

            Example (Edit address → Save address):
            <pre className="mb-0 mt-1 small">
{`{
  "id": "profile",
  "type": "profile",
  "action": "details.Edit",
  "error": false,
  "data": {
    "label": "Home",
    "street": "123 Main St",
    "city": "Toronto",
    "country": "Canada",
    "postalCode": "A1A 1A1"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
