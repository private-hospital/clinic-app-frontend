import React, { useState, useEffect } from 'react';
import {
  AppointmentStatuses,
  appStatusToReadable,
} from '../types/appointments';
import { statementsTestData } from '../types/statements';
import { FilterModalProps } from '../types/FilterModalProps';
import '../styles/FilterModal.css';
import Button from './Button';

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [services, setServices] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<AppointmentStatuses[]>([]);
  const [sortBy, setSortBy] = useState<'id' | 'service' | 'endDate'>('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [allowedServices, setAllowedServices] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const distinctServices = Array.from(
        new Set(statementsTestData.map((s) => s.service)),
      );
      setAllowedServices(distinctServices);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleService = (serviceName: string) => {
    setServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName],
    );
  };

  const toggleStatus = (status: AppointmentStatuses) => {
    setStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const handleApply = () => {
    onApply({
      services,
      statuses,
      sortBy,
      order,
    });
    onClose();
  };

  const handleClear = () => {
    setServices([]);
    setStatuses([]);
    setSortBy('id');
    setOrder('asc');

    onApply({
      services: [],
      statuses: [],
      sortBy: 'id',
      order: 'asc',
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2
          style={{
            textAlign: 'left',
            fontSize: '2.5rem',
            fontWeight: 600,
            margin: 0,
            marginBottom: '1rem',
          }}
        >
          Фільтри
        </h2>
        <div className="filter-section">
          <h4 style={{ fontSize: '1.5rem', fontWeight: 500, margin: 0 }}>
            Послуги
          </h4>
          {allowedServices.map((serviceName) => (
            <label key={serviceName} className="filter-label">
              <input
                type="checkbox"
                checked={services.includes(serviceName)}
                onChange={() => toggleService(serviceName)}
              />
              {serviceName}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4 style={{ fontSize: '1.5rem', fontWeight: 500, margin: 0 }}>
            Статуси
          </h4>
          {[
            AppointmentStatuses.PLANNED,
            AppointmentStatuses.CANCELED,
            AppointmentStatuses.COMPLETED,
          ].map((status) => (
            <label key={status} className="filter-label">
              <input
                type="checkbox"
                checked={statuses.includes(status)}
                onChange={() => toggleStatus(status)}
              />
              {appStatusToReadable(status)}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4 style={{ fontSize: '1.5rem', fontWeight: 500, margin: 0 }}>
            Сортувати за
          </h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="id">ID</option>
            <option value="service">Назва послуги</option>
            <option value="endDate">Дата виконання</option>
          </select>
        </div>

        <div className="filter-section">
          <h4 style={{ fontSize: '1.5rem', fontWeight: 500, margin: 0 }}>
            Порядок сортування
          </h4>
          <label className="filter-label">
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={order === 'asc'}
              onChange={() => setOrder('asc')}
            />
            Зростання
          </label>
          <label className="filter-label">
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={order === 'desc'}
              onChange={() => setOrder('desc')}
            />
            Спадання
          </label>
        </div>

        <div className="modal-actions">
          <Button
            type="primary"
            text="Застосувати"
            isSubmit={false}
            onClick={handleApply}
            css={{
              width: 'fit-content',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              height: '3rem',
              fontSize: '1rem',
              fontWeight: 300,
            }}
          />
          <Button
            type="secondary"
            text="Очистити"
            isSubmit={false}
            onClick={handleClear}
            css={{
              width: 'fit-content',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              height: '3rem',
              fontSize: '1rem',
              fontWeight: 300,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
