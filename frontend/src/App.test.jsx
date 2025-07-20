import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Testing begins ):', () => {
  render(<App />);
  const heading = screen.getByText(/hello adis softwares/i);
  expect(heading).toBeInTheDocument();
});

