// pages/Cell/InputPage.jsx
import React, { useMemo, useRef, useState } from 'react';
import { AlloyInput, InputObject } from '../../../src';

const DEFAULT_INPUTS = {
  text: {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    layout: 'text',
    placeholder: 'Enter your name',
    required: true
  },
  email: {
    name: 'email',
    label: 'Email',
    type: 'email',
    layout: 'text',
    placeholder: 'Enter your email',
    required: true
  },
    password: {
    name: "password",
    label: "Password",
    type: "password",
    layout: "text",
    placeholder: 'Enter your password',
    required: true,
    passwordStrength: true
  },
  number: {
    name: 'age',
    label: 'Age',
    type: 'number',
    layout: 'text',
    placeholder: 'Age in years',
    min: 18
  },
  textarea: {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    layout: 'text',
    placeholder: 'Tell us about yourself...',
    required: true
  },
  checkbox: {
    name: 'interests',
    label: 'Interests',
    type: 'checkbox',
    layout: 'text',
    required: true,
    options: [
      { value: 'news', label: 'News' },
      { value: 'updates', label: 'Product Updates' },
      { value: 'offers', label: 'Special Offers' }
    ]
  },
  select: {
    name: 'role',
    label: 'Role',
    type: 'select',
    layout: 'text',
    options: [
      { value: '', label: 'Select role' },
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' },
      { value: 'guest', label: 'Guest' }
    ],
    required: true
  },
  date: {
    name: 'dob',
    label: 'Date of Birth',
    type: 'date',
    layout: 'text',
    required: true
  },
  radio: {
    name: 'gender',
    label: 'Gender',
    type: 'radio',
    layout: 'text',
    required: true,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' }
    ]
  }
};

const TABS = Object.keys(DEFAULT_INPUTS);

export default function InputPage() {
  const [tab, setTab] = useState('text');
  const [inputJson, setInputJson] = useState(JSON.stringify(DEFAULT_INPUTS[tab], null, 2));
  const [outputJson, setOutputJson] = useState('// Interact with the field');
  const ref = useRef(null);

  const inputModel = useMemo(() => {
    try {
      const raw = JSON.parse(inputJson);
      return new InputObject(raw);
    } catch {
      return new InputObject(DEFAULT_INPUTS[tab]);
    }
  }, [inputJson, tab]);

  function handleOutput(e) {
    setOutputJson(JSON.stringify(e, null, 2));
  }

  return (
    <div className="container py-3">
      <h3 className="mb-4 text-center">AlloyInput (Layout: Text)</h3>

      <ul className="nav nav-underline nav-fill mb-3">
        {TABS.map((k) => (
          <li className="nav-item" key={k}>
            <button
              className={`nav-link ${k === tab ? 'active' : ''}`}
              onClick={() => {
                setTab(k);
                const inputData = DEFAULT_INPUTS[k];
                setInputJson(JSON.stringify(inputData, null, 2));
                setOutputJson('// Interact with the field');
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
          <AlloyInput key={tab} ref={ref} input={inputModel} output={handleOutput} />
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
            value={outputJson || '// No interaction yet'}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}