import { ButtonProperties } from '../types/ButtonProperties';
import '../styles/Button.css';

const Button = ({ type, onClick, text, css, isSubmit }: ButtonProperties) => {
  return (
    <button
      className={`btn ${type === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
      onClick={onClick}
      style={css}
      type={isSubmit ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
};

export default Button;
