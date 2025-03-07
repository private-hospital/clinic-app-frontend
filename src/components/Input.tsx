import { InputProperties } from '../types/InputProperties';
import '../styles/Input.css';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../service/axiosUtils';
import { StatusResponseDto } from '../types/common';

const Input = (p: InputProperties) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const cancelHandler = async () => {
    try {
      setShowDropdown((prev) => !prev);
      await api.put<StatusResponseDto, object>(
        `/doctor/appointments?id=${p.cancelId}`,
        {},
      );
      if (p.onCancel) p.onCancel();
      toast.success('Запис скасовано');
    } catch (e) {
      console.log(e);
      toast.error('Не вдалось скасувати запис');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
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
          {!p.disableErr && p.error && (
            <p className="label-text error-message">{p.error}</p>
          )}
        </div>
        <input
          id={p.inputId}
          type={p.type}
          placeholder={p.placeholder}
          style={p.css}
          value={p.value}
          className={p.error ? 'input-error' : ''}
          {...p.register}
          disabled={!!p.disabled}
          onChange={p.onChange}
          defaultValue={p.defaultValue}
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
        {!p.disableErr && p.error && (
          <p className="label-text error-message">{p.error}</p>
        )}
      </div>
      <div className="input-wrapper" ref={dropdownRef}>
        {showDropdown && (
          <div className="dropdown-menu">
            <button
              type="button"
              onClick={cancelHandler}
              style={{ width: '100%' }}
            >
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
          onChange={p.onChange}
          defaultValue={p.defaultValue}
        />
        <img
          src={`${import.meta.env.VITE_CDN_BASE_URL}/svg/dots.svg`}
          alt="dots icon"
          className="dots-icon"
          onClick={toggleDropdown}
          onFocus={() => {}}
          onKeyDown={() => {}}
          onMouseOver={() => {}}
        />
      </div>
    </div>
  );
};

export default Input;
