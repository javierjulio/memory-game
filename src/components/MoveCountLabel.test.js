import { render, screen } from '@testing-library/react';
import MoveCountLabel from './MoveCountLabel';

test('renders given move count', () => {
  render(<MoveCountLabel count={0} />);
  const label = screen.getByText("0 moves");
  expect(label).toBeInTheDocument();
});

test('renders label in singular form with count of 1', () => {
  render(<MoveCountLabel count={1} />);
  const label = screen.getByText("1 move");
  expect(label).toBeInTheDocument();
});

test('renders label in plural form with count of 2', () => {
  render(<MoveCountLabel count={2} />);
  const label = screen.getByText("2 moves");
  expect(label).toBeInTheDocument();
});
