import React, { CSSProperties } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProperties {
  type: 'text' | 'number' | 'email' | 'password' | 'date' | 'phone';
  placeholder: string;
  label: string;
  inputId: string;
  css?: CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  register?: UseFormRegisterReturn;
  error?: string;
  disableErr?: boolean;
  disabled?: boolean;
  cancelId?: number;
  onCancel?: () => void;
  defaultValue?: string | number;
}
