import React from 'react';
import '../styles/FilterButton.css';
import { FilterButtonProps } from '../types/FilterButtonProps';

const FilterButton: React.FC<FilterButtonProps> = (p: FilterButtonProps) => {
  return (
    <button className="filter-button" onClick={p.onClick}>
      <img
        src="https://cdn.vitalineph.com/svg/filter.svg"
        alt="Filter icon"
        className="filter-icon"
      />
      <span>Фільтр</span>
    </button>
  );
};

export default FilterButton;
