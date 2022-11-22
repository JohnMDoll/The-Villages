import { render, screen } from '@testing-library/react';
import CapTest from './CapTest';

test('renders learn react link', () => {
  render(<CapTest />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
