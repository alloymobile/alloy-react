// pages/Tissue/CrudForm.jsx
import React, { useMemo, useState } from "react";
import { AlloyCrudForm, CrudFormObject, AlloyProductAction, ProductActionObject } from "../../../src";
import { OutputObject } from "../../../src/utils/idHelper.js";

/* -------------------------------------------
 * DEFAULT JSON CONFIGS (AlloyCrudForm)
 * ----------------------------------------- */

// TABLE DEMO CONFIG
const DEFAULT_TABLE_CRUD_FORM_JSON = JSON.stringify(
  {
    id: "vendorCrudFormTable",
    name: "Vendor (Table Demo)",
    className: "container-fluid",

    documentClass: "col-6 col-md-4 col-lg-3 col-xl-2 mb-3",

    type: "table",

    search: {
      name: "vendorSearchTable",
      id: "vendorSearchTable",
      type: "text",
      layout: "icon",
      icon: { iconClass: "fa-solid fa-magnifying-glass" },
      label: "Search Vendors",
      placeholder: "Search by name, email, city…",
      className: "form-control",
    },

    add: {
      id: "addVendorButtonTable",
      name: "Add vendor",
      icon: { iconClass: "fa-solid fa-plus" },
      className: "btn btn-primary",
      title: "Add Vendor",
      ariaLabel: "Add Vendor",
    },

    document: {
      id: "vendorTable",
      className: "table table-striped align-middle",
      name: "Vendors",
      link: "/vendors",
      icon: { iconClass: "fa-solid fa-industry" },
      sort: { iconClass: "fa-solid fa-arrow-down-short-wide" },
      rows: [
        {
          id: "v001",
          vendorName: "Alpha Precast Ltd.",
          email: "info@alphaprecast.com",
          city: "Toronto",
          status: "Active",
        },
        {
          id: "v002",
          vendorName: "Beta Concrete Inc.",
          email: "contact@betaconcrete.com",
          city: "Hamilton",
          status: "Pending",
        },
      ],
      actions: {
        id: "vendorRowActionsTable",
        className: "btn-group btn-group-sm",
        name: "Row Actions",
        buttons: [
          {
            id: "editVendorBtnTable",
            name: "Edit",
            icon: { iconClass: "fa-solid fa-pen" },
            className: "btn btn-outline-primary",
            title: "Edit vendor",
            ariaLabel: "Edit vendor",
          },
          {
            id: "deleteVendorBtnTable",
            name: "Delete",
            icon: { iconClass: "fa-solid fa-trash" },
            className: "btn btn-outline-danger",
            title: "Delete vendor",
            ariaLabel: "Delete vendor",
          },
        ],
      },
    },

    pagination: {
      id: "vendorCrudPaginationTable",
      name: "Vendors",
      className: "d-flex justify-content-end align-items-center mt-3",
      listClassName: "pagination justify-content-end mb-0",
      itemClassName: "page-item",
      activeClassName: "active",
      disabledClassName: "disabled",

      totalPages: 10,
      totalElements: 480,
      last: false,
      numberOfElements: 50,
      size: 50,
      number: 0,
      first: true,
      empty: false,
    },

    modalToast: {
      id: "vendorDeleteToastTable",
      title: "Delete vendor?",
      message: "Are you sure you want to delete this vendor? This action cannot be undone.",
      action: "vendorDeleteConfirmedTable",
      submit: {
        name: "Yes, delete",
        className: "btn btn-danger",
        icon: { iconClass: "fa-solid fa-trash" },
      },
    },

    form: {
      id: "vendorTabFormTable",
      name: "Vendor Registration",
      status: "draft",
      currentIndex: 0,
      navButtons: {
        previous: {
          name: "Previous",
          icon: { iconClass: "fa-solid fa-arrow-left" },
          className: "btn btn-outline-secondary",
        },
        next: {
          name: "Next",
          icon: { iconClass: "fa-solid fa-arrow-right" },
          className: "btn btn-primary",
        },
        finish: {
          name: "Finish",
          icon: { iconClass: "fa-solid fa-paper-plane" },
          className: "btn btn-success",
        },
      },
      tabs: [
        {
          id: "vendorStep1Table",
          key: "basic",
          order: 1,
          title: "Basic Details",
          subtitle: "Who is this vendor?",
          icon: { iconClass: "fa-solid fa-address-card" },
          inputs: [
            {
              name: "vendorName",
              label: "Vendor Name",
              type: "text",
              layout: "text",
              placeholder: "Enter vendor name",
              required: true,
              minLength: 3,
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              layout: "text",
              placeholder: "name@example.com",
              required: true,
            },
          ],
        },
        {
          id: "vendorStep2Table",
          key: "location",
          order: 2,
          title: "Location & Status",
          subtitle: "Where are they based and what is their status?",
          icon: { iconClass: "fa-solid fa-location-dot" },
          inputs: [
            {
              name: "city",
              label: "City",
              type: "text",
              layout: "text",
              placeholder: "Toronto",
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              layout: "text",
              options: [
                { value: "active", label: "Active" },
                { value: "pending", label: "Pending" },
                { value: "inactive", label: "Inactive" },
              ],
              value: "active",
              required: true,
            },
          ],
        },
        {
          id: "vendorStep3Table",
          key: "review",
          order: 3,
          title: "Review & Confirm",
          subtitle: "Check details before submitting.",
          icon: { iconClass: "fa-solid fa-clipboard-check" },
          inputs: [
            {
              name: "acceptTerms",
              label: "I confirm the above vendor details are accurate.",
              type: "checkbox",
              layout: "checkbox",
              required: true,
            },
          ],
        },
      ],
    },
  },
  null,
  2
);

// CARD DEMO CONFIG
const DEFAULT_CARD_CRUD_FORM_JSON = JSON.stringify(
  {
    id: "vendorCrudFormCard",
    name: "Vendor (Card Demo)",
    className: "container-fluid",
    documentClass: "col-6 col-md-4 col-lg-3 col-xl-2 mb-3",

    type: "card",

    search: {
      name: "vendorSearchCard",
      id: "vendorSearchCard",
      type: "text",
      layout: "icon",
      icon: { iconClass: "fa-solid fa-magnifying-glass" },
      label: "Search Vendors",
      placeholder: "Search by name, email, city…",
      className: "form-control",
    },

    add: {
      id: "addVendorButtonCard",
      name: "Add vendor",
      icon: { iconClass: "fa-solid fa-plus" },
      className: "btn btn-primary",
      title: "Add Vendor",
      ariaLabel: "Add Vendor",
    },

    document: [
      {
        id: "vendorCard01",
        className: "card border m-2 shadow",
        link: "/vendors/v001",
        body: {
          id: "vendorCard01Body",
          className: "card-body",
          ariaLabel: "Vendor card Alpha Precast Ltd.",
        },
        fields: [
          { id: "id", colClass: "col-12", className: "d-none", name: "v001" },
          { id: "vendorName", colClass: "col-12", className: "fw-semibold", name: "Alpha Precast Ltd." },
          { id: "email", colClass: "col-12", className: "text-muted small", name: "info@alphaprecast.com" },
          { id: "city", colClass: "col-6", className: "text-muted small", name: "Toronto" },
          { id: "status", colClass: "col-6", className: "text-muted small", name: "Active" },
        ],
        footer: {
          id: "vendorCard01Footer",
          className: "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Actions",
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButtonIcon",
          className: "nav gap-2",
          buttonClass: "nav-item",
          barName: { show: false },
          buttons: [
            {
              id: "vendor01EditBtn",
              name: "Edit",
              className: "btn btn-sm btn-outline-primary d-flex align-items-center gap-1",
              icon: { iconClass: "fa-solid fa-pen" },
            },
            {
              id: "vendor01DeleteBtn",
              name: "Delete",
              className: "btn btn-sm btn-outline-danger d-flex align-items-center gap-1",
              icon: { iconClass: "fa-solid fa-trash" },
            },
          ],
        },
      },
      {
        id: "vendorCard02",
        className: "card border m-2 shadow",
        link: "/vendors/v002",
        body: {
          id: "vendorCard02Body",
          className: "card-body",
          ariaLabel: "Vendor card Beta Concrete Inc.",
        },
        fields: [
          { id: "id", colClass: "col-12", className: "d-none", name: "v002" },
          { id: "vendorName", colClass: "col-12", className: "fw-semibold", name: "Beta Concrete Inc." },
          { id: "email", colClass: "col-12", className: "text-muted small", name: "contact@betaconcrete.com" },
          { id: "city", colClass: "col-6", className: "text-muted small", name: "Hamilton" },
          { id: "status", colClass: "col-6", className: "text-muted small", name: "Pending" },
        ],
        footer: {
          id: "vendorCard02Footer",
          className: "card-footer d-flex align-items-center justify-content-between flex-wrap gap-2 py-2",
          name: "Actions",
        },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButtonIcon",
          className: "nav gap-2",
          buttonClass: "nav-item",
          barName: { show: false },
          buttons: [
            {
              id: "vendor02EditBtn",
              name: "Edit",
              className: "btn btn-sm btn-outline-primary d-flex align-items-center gap-1",
              icon: { iconClass: "fa-solid fa-pen" },
            },
            {
              id: "vendor02DeleteBtn",
              name: "Delete",
              className: "btn btn-sm btn-outline-danger d-flex align-items-center gap-1",
              icon: { iconClass: "fa-solid fa-trash" },
            },
          ],
        },
      },
    ],

    pagination: {
      id: "vendorCrudPaginationCard",
      name: "Vendors",
      className: "d-flex justify-content-end align-items-center mt-3",
      listClassName: "pagination justify-content-end mb-0",
      itemClassName: "page-item",
      activeClassName: "active",
      disabledClassName: "disabled",

      totalPages: 1,
      totalElements: 2,
      last: true,
      numberOfElements: 2,
      size: 2,
      number: 0,
      first: true,
      empty: false,
    },

    modalToast: {
      id: "vendorDeleteToastCard",
      title: "Delete vendor card?",
      message: "Are you sure you want to delete this vendor card? This action cannot be undone.",
      action: "vendorDeleteConfirmedCard",
      submit: {
        name: "Yes, delete",
        className: "btn btn-danger",
        icon: { iconClass: "fa-solid fa-trash" },
      },
    },

    form: {
      id: "vendorTabFormCard",
      name: "Vendor Registration",
      status: "draft",
      currentIndex: 0,
      navButtons: {
        previous: {
          name: "Previous",
          icon: { iconClass: "fa-solid fa-arrow-left" },
          className: "btn btn-outline-secondary",
        },
        next: {
          name: "Next",
          icon: { iconClass: "fa-solid fa-arrow-right" },
          className: "btn btn-primary",
        },
        finish: {
          name: "Finish",
          icon: { iconClass: "fa-solid fa-paper-plane" },
          className: "btn btn-success",
        },
      },
      tabs: [
        {
          id: "vendorStep1Card",
          key: "basic",
          order: 1,
          title: "Basic Details",
          subtitle: "Who is this vendor?",
          icon: { iconClass: "fa-solid fa-address-card" },
          inputs: [
            {
              name: "vendorName",
              label: "Vendor Name",
              type: "text",
              layout: "text",
              placeholder: "Enter vendor name",
              required: true,
              minLength: 3,
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              layout: "text",
              placeholder: "name@example.com",
              required: true,
            },
          ],
        },
        {
          id: "vendorStep2Card",
          key: "location",
          order: 2,
          title: "Location & Status",
          subtitle: "Where are they based and what is their status?",
          icon: { iconClass: "fa-solid fa-location-dot" },
          inputs: [
            {
              name: "city",
              label: "City",
              type: "text",
              layout: "text",
              placeholder: "Toronto",
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              layout: "text",
              options: [
                { value: "active", label: "Active" },
                { value: "pending", label: "Pending" },
                { value: "inactive", label: "Inactive" },
              ],
              value: "active",
              required: true,
            },
          ],
        },
        {
          id: "vendorStep3Card",
          key: "review",
          order: 3,
          title: "Review & Confirm",
          subtitle: "Check details before submitting.",
          icon: { iconClass: "fa-solid fa-clipboard-check" },
          inputs: [
            {
              name: "acceptTerms",
              label: "I confirm the above vendor details are accurate.",
              type: "checkbox",
              layout: "checkbox",
              required: true,
            },
          ],
        },
      ],
    },
  },
  null,
  2
);

/* -------------------------------------------
 * DEFAULT JSON CONFIG (AlloyProductAction)
 * ----------------------------------------- */

const DEFAULT_PRODUCT_ACTION_JSON = JSON.stringify(
  {
    id: "productActionDemo",
    className: "card border-0 shadow-sm rounded-4 overflow-hidden",
    link: "/products/p001",

    product: {
      id: "p001",
      brand: "MEGAFOUNDRY",
      title: "Precast Beam (Demo)",
      sku: "BEAM-001",
      status: "ACTIVE",
      description: "This demo shows image/video/GLB media, thumbnails, quantity, and footer actions.",
      price: 249.99,
      compareAtPrice: 299.99,
      metaLine: "Ready stock • Ships in 3–5 days",
      tags: ["Concrete", "Precast", "Beam", "Industrial"]
    },

    media: {
      items: [
        {
          id: "img-1",
          kind: "image",
          url: "https://picsum.photos/seed/precast-1/1200/1200",
          thumbUrl: "https://picsum.photos/seed/precast-1/200/200",
          title: "Front"
        },
        {
          id: "img-2",
          kind: "image",
          url: "https://picsum.photos/seed/precast-2/1200/1200",
          thumbUrl: "https://picsum.photos/seed/precast-2/200/200",
          title: "Side"
        },
        {
          id: "vid-1",
          kind: "video",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          thumbUrl: "https://picsum.photos/seed/precast-video/200/200",
          title: "Video"
        },
        {
          id: "glb-1",
          kind: "glb",
          url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          thumbUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.webp",
          title: "3D (GLB)"
        }
      ]
    },

    quantity: {
      label: "Quantity",
      min: 1,
      max: 250,
      step: 1,
      value: 3,
      emitOnChange: true
    },

    footer: {
      leftText: "Footer actions emit OutputObject (type=product-action)."
    },

    type: "AlloyButtonBar",
    action: {
      type: "AlloyButtonIcon",
      className: "nav gap-2",
      buttonClass: "nav-item",
      barName: { show: false },
      buttons: [
        {
          id: "addToCartBtn",
          name: "Add to cart",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-solid fa-cart-plus" }
        },
        {
          id: "wishlistBtn",
          name: "Wishlist",
          className: "btn btn-sm btn-outline-secondary d-flex align-items-center gap-1",
          icon: { iconClass: "fa-regular fa-heart" }
        }
      ]
    }
  },
  null,
  2
);

/* -------------------------------------------
 * Demo Page with Tabs (Table / Card / Product)
 * ----------------------------------------- */

export default function CrudFormPage() {
  const [activeTab, setActiveTab] = useState("table");

  // TABLE demo state
  const [crudJsonTable, setCrudJsonTable] = useState(DEFAULT_TABLE_CRUD_FORM_JSON);
  const [crudParseErrorTable, setCrudParseErrorTable] = useState("");
  const [crudOutputJsonTable, setCrudOutputJsonTable] = useState(
    "// Table Demo: interact with search, table row buttons, Add vendor, pagination, and the form to see OutputObject here…"
  );

  // CARD demo state
  const [crudJsonCard, setCrudJsonCard] = useState(DEFAULT_CARD_CRUD_FORM_JSON);
  const [crudParseErrorCard, setCrudParseErrorCard] = useState("");
  const [crudOutputJsonCard, setCrudOutputJsonCard] = useState(
    "// Card Demo: interact with search, card buttons, Add vendor, pagination, and the form to see OutputObject here…"
  );

  // PRODUCT demo state
  const [productJson, setProductJson] = useState(DEFAULT_PRODUCT_ACTION_JSON);
  const [productParseError, setProductParseError] = useState("");
  const [productOutputJson, setProductOutputJson] = useState(
    "// Product Demo: interact with thumbnails, quantity, and footer actions to see OutputObject here…"
  );

  /* -------------------------------------------
   * Build CrudFormObject from JSON (TABLE)
   * ----------------------------------------- */
  const crudModelTable = useMemo(() => {
    try {
      const raw = JSON.parse(crudJsonTable || "{}");
      const model = new CrudFormObject(raw);
      setCrudParseErrorTable("");
      return model;
    } catch (e) {
      setCrudParseErrorTable(String(e.message || e));

      return new CrudFormObject({
        id: "fallbackCrudFormTable",
        name: "Invalid JSON (Table CrudForm)",
        className: "container-fluid",
        type: "table",
        documentClass: "col-12",
        search: {
          name: "search",
          label: "Search (JSON invalid)",
          type: "text",
          layout: "text",
          placeholder: "Fix JSON on the left to preview real table CRUD…",
        },
        add: {
          name: "Add (disabled)",
          icon: { iconClass: "fa-solid fa-plus" },
          className: "btn btn-secondary",
          disabled: true,
        },
        document: {
          name: "Table",
          rows: [],
        },
        form: {
          id: "fallbackFormTable",
          name: "Invalid Form",
          status: "draft",
          tabs: [],
        },
        pagination: {
          totalPages: 0,
          totalElements: 0,
          size: 0,
          number: 0,
          first: true,
          last: true,
          empty: true,
        },
      });
    }
  }, [crudJsonTable]);

  /* -------------------------------------------
   * Build CrudFormObject from JSON (CARD)
   * ----------------------------------------- */
  const crudModelCard = useMemo(() => {
    try {
      const raw = JSON.parse(crudJsonCard || "{}");
      const model = new CrudFormObject(raw);
      setCrudParseErrorCard("");
      return model;
    } catch (e) {
      setCrudParseErrorCard(String(e.message || e));

      return new CrudFormObject({
        id: "fallbackCrudFormCard",
        name: "Invalid JSON (Card CrudForm)",
        className: "container-fluid",
        type: "card",
        documentClass: "col-12",
        search: {
          name: "searchCard",
          label: "Search (JSON invalid)",
          type: "text",
          layout: "text",
          placeholder: "Fix JSON on the left to preview card CRUD…",
        },
        add: {
          name: "Add (disabled)",
          icon: { iconClass: "fa-solid fa-plus" },
          className: "btn btn-secondary",
          disabled: true,
        },
        document: [],
        form: {
          id: "fallbackFormCard",
          name: "Invalid Form",
          status: "draft",
          tabs: [],
        },
        pagination: {
          totalPages: 0,
          totalElements: 0,
          size: 0,
          number: 0,
          first: true,
          last: true,
          empty: true,
        },
      });
    }
  }, [crudJsonCard]);

  /* -------------------------------------------
   * Build ProductActionObject from JSON (PRODUCT)
   * ----------------------------------------- */
  const productModel = useMemo(() => {
    try {
      const raw = JSON.parse(productJson || "{}");
      const model = new ProductActionObject(raw);
      setProductParseError("");
      return model;
    } catch (e) {
      setProductParseError(String(e.message || e));

      return new ProductActionObject({
        id: "fallbackProductAction",
        className: "card border-0 shadow-sm rounded-4 overflow-hidden",
        link: "",
        product: {
          id: "p-fallback",
          brand: "Invalid JSON",
          title: "Invalid ProductAction JSON",
          sku: "",
          status: "INACTIVE",
          description: "Fix JSON on the left to preview ProductAction…",
          price: null,
          compareAtPrice: null,
          metaLine: "",
          tags: []
        },
        media: { items: [] },
        quantity: { label: "Quantity", min: 1, max: 1, step: 1, value: 1, emitOnChange: false },
        footer: { leftText: "" },
        type: "AlloyButtonBar",
        action: {
          type: "AlloyButtonIcon",
          className: "nav gap-2",
          buttonClass: "nav-item",
          barName: { show: false },
          buttons: [
            {
              id: "disabledBtn",
              name: "Disabled",
              className: "btn btn-sm btn-secondary",
              icon: { iconClass: "fa-solid fa-ban" },
              disabled: true
            }
          ]
        }
      });
    }
  }, [productJson]);

  /* -------------------------------------------
   * Output handlers
   * ----------------------------------------- */

  function handleCrudOutputTable(out) {
    const payload = out instanceof OutputObject && typeof out.toJSON === "function" ? out.toJSON() : out;
    setCrudOutputJsonTable(JSON.stringify(payload, null, 2));
  }

  function handleCrudOutputCard(out) {
    const payload = out instanceof OutputObject && typeof out.toJSON === "function" ? out.toJSON() : out;
    setCrudOutputJsonCard(JSON.stringify(payload, null, 2));
  }

  function handleProductOutput(out) {
    const payload = out instanceof OutputObject && typeof out.toJSON === "function" ? out.toJSON() : out;
    setProductOutputJson(JSON.stringify(payload, null, 2));
  }

  /* -------------------------------------------
   * Helpers for reset / format
   * ----------------------------------------- */

  function resetCrudTable() {
    setCrudJsonTable(DEFAULT_TABLE_CRUD_FORM_JSON);
    setCrudOutputJsonTable(
      "// Table Demo: interact with search, table row buttons, Add vendor, pagination, and the form to see OutputObject here…"
    );
    setCrudParseErrorTable("");
  }

  function formatCrudTable() {
    try {
      const parsed = JSON.parse(crudJsonTable);
      setCrudJsonTable(JSON.stringify(parsed, null, 2));
    } catch {}
  }

  function resetCrudCard() {
    setCrudJsonCard(DEFAULT_CARD_CRUD_FORM_JSON);
    setCrudOutputJsonCard(
      "// Card Demo: interact with search, card buttons, Add vendor, pagination, and the form to see OutputObject here…"
    );
    setCrudParseErrorCard("");
  }

  function formatCrudCard() {
    try {
      const parsed = JSON.parse(crudJsonCard);
      setCrudJsonCard(JSON.stringify(parsed, null, 2));
    } catch {}
  }

  function resetProduct() {
    setProductJson(DEFAULT_PRODUCT_ACTION_JSON);
    setProductOutputJson("// Product Demo: interact with thumbnails, quantity, and footer actions to see OutputObject here…");
    setProductParseError("");
  }

  function formatProduct() {
    try {
      const parsed = JSON.parse(productJson);
      setProductJson(JSON.stringify(parsed, null, 2));
    } catch {}
  }

  /* -------------------------------------------
   * RENDER
   * ----------------------------------------- */

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">Alloy Demos (CrudForm + ProductAction)</h3>

      <div className="row mb-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>
              {`<AlloyCrudForm crudForm={new CrudFormObject(crudFormObject)} output={handleOutput} />\n<AlloyProductAction productAction={new ProductActionObject(productActionObject)} output={handleOutput} />`}
            </code>
          </pre>
        </div>
      </div>

      <ul className="nav nav-tabs mb-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "table" ? "active" : ""}`}
            type="button"
            role="tab"
            onClick={() => setActiveTab("table")}
          >
            Table Demo
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "card" ? "active" : ""}`}
            type="button"
            role="tab"
            onClick={() => setActiveTab("card")}
          >
            Card Demo
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "product" ? "active" : ""}`}
            type="button"
            role="tab"
            onClick={() => setActiveTab("product")}
          >
            Product Demo
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === "table" && (
          <div className="tab-pane fade show active" role="tabpanel">
            <div className="row mb-4">
              <div className="col-12">
                <AlloyCrudForm crudForm={crudModelTable} output={handleCrudOutputTable} />

                <div className="small text-secondary mt-2 text-center">
                  <strong>Delete</strong> uses <code>modalToast</code>: clicking Delete opens a confirmation toast modal,
                  and confirming emits <code>action="Delete"</code> with the underlying row data.
                </div>
              </div>
            </div>

            <div className="row g-3 align-items-stretch">
              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold">Table CrudForm Input JSON (editable)</span>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={resetCrudTable}>
                      Reset
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={formatCrudTable}
                      title="Format JSON"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
                      Format
                    </button>
                  </div>
                </div>

                <textarea
                  className={`form-control font-monospace ${crudParseErrorTable ? "is-invalid" : ""}`}
                  rows={22}
                  value={crudJsonTable}
                  onChange={(e) => setCrudJsonTable(e.target.value)}
                  spellCheck={false}
                />
                {crudParseErrorTable && <div className="invalid-feedback d-block mt-1">{crudParseErrorTable}</div>}

                <div className="form-text">
                  Required pieces: <code>type="table"</code>, <code>document</code> with <code>rows[]</code> and row
                  actions, <code>form.tabs[].inputs[]</code> matching row field names, optional <code>pagination</code>,
                  optional <code>modalToast</code> for delete confirmation.
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold">
                    Table Output (from <code>output</code> callback)
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setCrudOutputJsonTable("// cleared")}
                  >
                    Clear
                  </button>
                </div>

                <textarea
                  className="form-control font-monospace"
                  rows={22}
                  value={crudOutputJsonTable}
                  onChange={(e) => setCrudOutputJsonTable(e.target.value)}
                  spellCheck={false}
                />

                <div className="form-text">
                  Emitted as <code>type="crud-form"</code> with <code>action</code> and <code>data</code>.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "card" && (
          <div className="tab-pane fade show active" role="tabpanel">
            <div className="row mb-4">
              <div className="col-12">
                <AlloyCrudForm crudForm={crudModelCard} output={handleCrudOutputCard} />

                <div className="small text-secondary mt-2 text-center">
                  Card demo mirrors table behaviour: Edit emits <code>action="editInit"</code> and opens the form; Delete
                  uses <code>modalToast</code> and confirm emits <code>action="Delete"</code>.
                </div>
              </div>
            </div>

            <div className="row g-3 align-items-stretch">
              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold">Card CrudForm Input JSON (editable)</span>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={resetCrudCard}>
                      Reset
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={formatCrudCard}
                      title="Format JSON"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
                      Format
                    </button>
                  </div>
                </div>

                <textarea
                  className={`form-control font-monospace ${crudParseErrorCard ? "is-invalid" : ""}`}
                  rows={22}
                  value={crudJsonCard}
                  onChange={(e) => setCrudJsonCard(e.target.value)}
                  spellCheck={false}
                />
                {crudParseErrorCard && <div className="invalid-feedback d-block mt-1">{crudParseErrorCard}</div>}

                <div className="form-text">
                  For card mode: <code>type="card"</code> and <code>document</code> array of CardActionObject configs.
                  <code>fields[].id</code> become keys in emitted <code>data</code>.
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold">
                    Card Output (from <code>output</code> callback)
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setCrudOutputJsonCard("// cleared")}
                  >
                    Clear
                  </button>
                </div>

                <textarea
                  className="form-control font-monospace"
                  rows={22}
                  value={crudOutputJsonCard}
                  onChange={(e) => setCrudOutputJsonCard(e.target.value)}
                  spellCheck={false}
                />

                <div className="form-text">
                  Emitted as <code>type="crud-form"</code> with <code>action</code> and <code>data</code>.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "product" && (
          <div className="tab-pane fade show active" role="tabpanel">
            <div className="row mb-4">
              <div className="col-12">
                <AlloyProductAction productAction={productModel} output={handleProductOutput} />

                <div className="small text-secondary mt-2 text-center">
                  Product demo emits <code>type="product-action"</code>. Thumbnails can emit <code>action="media"</code>,
                  quantity emits <code>action="quantity"</code>, and footer buttons emit the clicked button name with the
                  product payload.
                </div>
              </div>
            </div>

            <div className="row g-3 align-items-stretch">
              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold">ProductAction Input JSON (editable)</span>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={resetProduct}>
                      Reset
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={formatProduct}
                      title="Format JSON"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
                      Format
                    </button>
                  </div>
                </div>

                <textarea
                  className={`form-control font-monospace ${productParseError ? "is-invalid" : ""}`}
                  rows={22}
                  value={productJson}
                  onChange={(e) => setProductJson(e.target.value)}
                  spellCheck={false}
                />
                {productParseError && <div className="invalid-feedback d-block mt-1">{productParseError}</div>}

                <div className="form-text">
                  Key parts: <code>product</code>, <code>media.items[]</code> (image/video/glb), <code>quantity</code>,
                  and footer <code>action</code> (ButtonBar/LinkBar config).
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold">
                    Product Output (from <code>output</code> callback)
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setProductOutputJson("// cleared")}
                  >
                    Clear
                  </button>
                </div>

                <textarea
                  className="form-control font-monospace"
                  rows={22}
                  value={productOutputJson}
                  onChange={(e) => setProductOutputJson(e.target.value)}
                  spellCheck={false}
                />

                <div className="form-text">
                  Emitted as <code>type="product-action"</code> with the selected media + quantity in <code>data</code>.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
