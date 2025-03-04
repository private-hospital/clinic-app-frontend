import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProperties {
  label: string;
  selectId: string;
  error?: string;
  css?: React.CSSProperties;
  register?: any;
  options: SelectOption[];
}
