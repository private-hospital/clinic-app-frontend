import * as React from 'react';
import { CSSProperties } from 'react';

export interface ButtonProperties {
  type: 'primary' | 'secondary';
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  css?: CSSProperties;
  isSubmit: boolean;
}
