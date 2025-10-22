// pages/Cell/InputIconPage.jsx
import React, { useMemo, useRef, useState } from "react";
import { AlloyInput, InputObject } from "../../../src";

const DEFAULTS = {
  username: {
    name: "username",
    label: "Username",
    type: "text",
    layout: "icon",
    placeholder: "Enter username",
    required: true,
    icon: { iconClass: "fa-solid fa-user" }
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    layout: "icon",
    placeholder: "Enter email",
    required: true,
    icon: { iconClass: "fa-solid fa-envelope" }
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    layout: "icon",
    required: true,
    icon: { iconClass: "fa-solid fa-lock" },
    passwordStrength: true
  },
  age: {
    name: "age",
    label: "Age",
    type: "number",
    layout: "icon",
    placeholder: "Enter your age",
    required: true,
    icon: { iconClass: "fa-solid fa-hashtag" }
  },
  dob: {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    layout: "icon",
    required: true,
    icon: { iconClass: "fa-solid fa-calendar" }
  }
};

const TABS = Object.keys(DEFAULTS);

export default function InputIconPage() {
  const [tab, setTab] = useState("username");
  const [inputJson, setInputJson] = useState(JSON.stringify(DEFAULTS[tab], null, 2));
  const [outputJson, setOutputJson] = useState("// Interact with the field");
  const ref = useRef(null);

  const model = useMemo(() => {
    try {
      return new InputObject(JSON.parse(inputJson));
    } catch {
      return new InputObject(DEFAULTS[tab]);
    }
  }, [inputJson, tab]);

  function handleOutput(e) {
    setOutputJson(JSON.stringify(e, null, 2));
  }

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloyInput (Layout: Icon)</h3>

      <ul className="nav nav-underline nav-fill mb-3">
        {TABS.map((k) => (
          <li className="nav-item" key={k}>
            <button
              className={`nav-link ${k === tab ? "active" : ""}`}
              onClick={() => {
                setTab(k);
                setInputJson(JSON.stringify(DEFAULTS[k], null, 2));
                setOutputJson("// Interact with the field");
              }}
            >
              {k}
            </button>
          </li>
        ))}
      </ul>

      <div className="row g-3 mb-3">
        <div className="col-12 text-center">
          <pre className="bg-light text-dark border rounded-3 p-3 small mb-0">
            <code>{`<AlloyInput input={new InputObject(inputObject)} output={handleOutput} />`}</code>
          </pre>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 text-center">
          <AlloyInput key={tab} ref={ref} input={model} output={handleOutput} />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Input JSON</label>
          <textarea
            className="form-control font-monospace"
            rows={16}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Output</label>
          <textarea
            className="form-control font-monospace bg-light border"
            rows={16}
            value={outputJson || "// No interaction yet"}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}