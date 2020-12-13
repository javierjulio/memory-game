import { render, screen } from '@testing-library/react';
import App from './App';

test('renders initial move count', () => {
  render(<App />);
  const label = screen.getByText(/0 moves/i);
  expect(label).toBeInTheDocument();
});
