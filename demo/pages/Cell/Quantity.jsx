// demo/pages/tissue/QuantityPage.jsx
import React, { useMemo, useState } from "react";
import { AlloyQuantity, QuantityObject } from "../../../src";

const DEFAULT_QUANTITY = JSON.stringify(
  {
    label: "Quantity",
    colClass: "col-12 col-md-6 col-lg-4 mx-auto",
    className: "",

    name: "quantity",
    value: 1,
    min: 1,
    max: 8,
    step: 1,

    disabled: false,
    showRange: true,

    input: {
      type: "number",
      label: "",
      layout: "text",
      className: "form-control text-center"
    },

    decrease: {
      className: "btn btn-light text-muted",
      icon: { iconClass: "fa-solid fa-minus" },
      title: "Decrease",
      ariaLabel: "Decrease quantity"
    },

    increase: {
      className: "btn btn-light text-muted",
      icon: { iconClass: "fa-solid fa-plus" },
      title: "Increase",
      ariaLabel: "Increase quantity"
    }
  },
  null,
  2
);

const TAG_SNIPPET = `<AlloyQuantity quantity={new QuantityObject(quantityObject)} output={handleOutput} />`;

export default function QuantityPage() {
  const [jsonQty, setJsonQty] = useState(DEFAULT_QUANTITY);
  const [errQty, setErrQty] = useState("");
  const [outQty, setOutQty] = useState("// OutputObject here (inc/dec/set)");

  const modelQty = useMemo(() => {
    try {
      setErrQty("");
      return new QuantityObject(JSON.parse(jsonQty));
    } catch (e) {
      setErrQty(String(e.message || e));
      return new QuantityObject({
        label: "Invalid JSON (Quantity)",
        colClass: "col-12 col-md-6 col-lg-4 mx-auto",
        name: "quantity",
        value: 1,
        min: 1,
        max: 8,
        step: 1,
        disabled: true,
        showRange: true
      });
    }
  }, [jsonQty]);

  function handleOutput(payload) {
    const plain =
      payload && typeof payload.toJSON === "function"
        ? payload.toJSON()
        : payload;

    setOutQty(JSON.stringify(plain, null, 2));
  }

  return (
    <div className="container py-3">
      <h3 className="mb-3 text-center">AlloyQuantity</h3>

      <div className="row mb-4">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0 text-center w-100">
            <code>{TAG_SNIPPET}</code>
          </pre>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12 mx-auto mb-4">
          <AlloyQuantity quantity={modelQty} output={handleOutput} />
        </div>
      </div>

      <div className="row g-3 align-items-stretch justify-content-center mb-5">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">Input JSON (editable)</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setJsonQty(DEFAULT_QUANTITY);
                setOutQty("// OutputObject here (inc/dec/set)");
              }}
            >
              Reset
            </button>
          </div>

          <textarea
            className={`form-control font-monospace ${errQty ? "is-invalid" : ""}`}
            rows={18}
            value={jsonQty}
            onChange={(e) => setJsonQty(e.target.value)}
            spellCheck={false}
          />

          {errQty && (
            <div className="invalid-feedback d-block mt-1">{errQty}</div>
          )}
        </div>

        <div className="col-12 col-lg-6">
          <div className="fw-semibold mb-2 text-center text-lg-start">
            Output (OutputObject from <code>AlloyQuantity</code>)
          </div>
          <textarea
            className="form-control font-monospace bg-light border"
            rows={18}
            value={outQty}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
