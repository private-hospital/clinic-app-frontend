import React from 'react';
import '../styles/Input.css';
import { SelectProperties } from '../types/selectComponent';

const Select: React.FC<SelectProperties> = (p) => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <div className="labels-holder" style={{ margin: 0, padding: 0 }}>
        <label htmlFor={p.selectId} className="label-text">
          {p.label}
        </label>
        {!p.disableErr && p.error && (
          <p className="label-text error-message">{p.error}</p>
        )}
      </div>

      <select
        id={p.selectId}
        className={p.error ? 'input-error' : ''}
        style={p.css}
        {...(p.register ? p.register : {})}
        disabled={!!p.disabled}
        onChange={p.onChange}
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
