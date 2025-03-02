import { ButtonProperties } from '../types/ButtonProperties';
import '../styles/Button.css';

const Button = (properties: ButtonProperties) => {
  return (
    <button
      className={`btn ${properties.type === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
      onClick={properties.onClick}
    >
      {properties.text}
    </button>
  );
};

export default Button;
