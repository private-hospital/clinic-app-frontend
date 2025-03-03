import { CSSProperties } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProperties {
  type: 'text' | 'number' | 'email' | 'password';
  placeholder: string;
  label: string;
  inputId: string;
  css?: CSSProperties;
  // setValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // value: string;
  register?: UseFormRegisterReturn;
  error?: string;
}
