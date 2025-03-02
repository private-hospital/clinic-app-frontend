import * as React from 'react';

export interface ButtonProperties {
  type: 'primary' | 'secondary';
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
