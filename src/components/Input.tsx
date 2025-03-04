import { InputProperties } from '../types/InputProperties';
import '../styles/Input.css';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Input = (p: InputProperties) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const cancelHandler = () => {
    setShowDropdown((prev) => !prev);
    toast.success('Запис скасовано');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event.target);
      console.log(dropdownRef.current);
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        console.log('hello');
      }
      console.log('hiiii');
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  if (!p.cancelId) {
    return (
      <div style={{ margin: 0, marginBottom: '0.5rem' }}>
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
          value={p.value && p.value}
          className={p.error ? 'input-error' : ''}
          {...p.register}
          disabled={!!p.disabled}
        />
      </div>
    );
  }
  return (
    <div style={{ margin: 0, marginBottom: '0.5rem' }}>
      <div className="labels-holder">
        <label htmlFor={p.inputId} className="label-text">
          {p.label}
        </label>
        {p.error && <p className="label-text error-message">{p.error}</p>}
      </div>
      <div className="input-wrapper" ref={dropdownRef}>
        {showDropdown && (
          <div className="dropdown-menu">
            <button type="button" onClick={cancelHandler}>
              Скасувати
            </button>
          </div>
        )}
        <input
          id={p.inputId}
          type={p.type}
          placeholder={p.placeholder}
          style={p.css}
          value={p.value}
          className={p.error ? 'input-error' : ''}
          {...p.register}
          disabled={!!p.disabled}
        />
        <img
          src={`${import.meta.env.VITE_CDN_BASE_URL}/svg/dots.svg`}
          alt="dots icon"
          className="dots-icon"
          onClick={toggleDropdown}
        />
      </div>
    </div>
  );
};

export default Input;
