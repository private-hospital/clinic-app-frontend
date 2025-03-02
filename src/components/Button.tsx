import { ButtonProperties } from '../types/ButtonProperties';
import '../styles/Button.css';

const Button = ({ type, onClick, text, css }: ButtonProperties) => {
  return (
    <button
      className={`btn ${type === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
      onClick={onClick}
      style={css}
    >
      {text}
    </button>
  );
};

export default Button;
