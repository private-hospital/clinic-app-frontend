import { render, screen } from '@testing-library/react';
import App from '../src/App';
import * as React from 'react';

describe('App component', () => {
  test('renders header text', () => {
    render(<App />);
    const headerElement = screen.getByText(/Vite \+ React/i);
    expect(headerElement).toBeInTheDocument();
  });
});
