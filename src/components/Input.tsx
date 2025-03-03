import { InputProperties } from '../types/InputProperties';
import '../styles/Input.css';

const Input = (p: InputProperties) => {
  return (
    <div>
      <div className="labels-holder">
        <label htmlFor={p.inputId} className="label-text">
          {p.label}
        </label>
        {p.error && <p className="label-text error-message">{p.error}</p>}
      </div>
      <input
        id={p.inputId}
        type={p.type}
        placeholder={p.placeholder}
        style={p.css}
        // onChange={p.setValue}
        // value={p.value}
        className={p.error ? 'input-error' : ''}
        {...p.register}
      />
    </div>
  );
};

export default Input;
