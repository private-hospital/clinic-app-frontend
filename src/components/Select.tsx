import React from 'react';
import '../styles/Input.css';
import { SelectProperties } from '../types/selectComponent';

const Select: React.FC<SelectProperties> = (p) => {
  return (
    <div>
      <div className="labels-holder">
        <label htmlFor={p.selectId} className="label-text">
          {p.label}
        </label>
        {p.error && <p className="label-text error-message">{p.error}</p>}
      </div>

      <select
        id={p.selectId}
        className={p.error ? 'input-error' : ''}
        style={p.css}
        {...(p.register ? p.register : {})}
        disabled={!!p.disabled}
      >
        {p.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
