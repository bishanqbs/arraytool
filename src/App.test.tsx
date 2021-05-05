import React from 'react';
import { render, screen } from '@testing-library/react';
import ArrayTool from './ArrayTool';

test('renders learn react link', () => {
  render(<ArrayTool />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
