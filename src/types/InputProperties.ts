import { CSSProperties } from 'react';
import * as React from 'react';

export interface InputProperties {
  type: 'text' | 'number' | 'email' | 'password';
  placeholder: string;
  label: string;
  inputId: string;
  css?: CSSProperties;
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
