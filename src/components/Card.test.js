import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Card from './Card';

test('renders card with type as text but hidden visually', () => {
  const item = { backfaceIsUp: false, type: 1 }
  render(<Card item={item} disableAction={false} onOpen={() => {}} />);
  const label = screen.getByText("1");
  expect(label).toBeInTheDocument();
});

test('fires onOpen callback on click', () => {
  const onClick = jest.fn()
  const item = { backfaceIsUp: false, type: 1 }
  const { container } = render(<Card item={item} disableAction={false} onOpen={onClick} />);

  userEvent.click(container.firstChild)

  expect(onClick).toHaveBeenCalledTimes(1)
});

test('does not fire onOpen callback if value is revealed', () => {
  const onClick = jest.fn()
  const item = { backfaceIsUp: true, type: 1 }
  const { container } = render(<Card item={item} disableAction={false} onOpen={onClick} />);

  userEvent.click(container.firstChild)

  expect(onClick).not.toHaveBeenCalled()
});

test('does not fire onOpen callback if disabled', () => {
  const onClick = jest.fn()
  const item = { backfaceIsUp: false, type: 1 }
  const { container } = render(<Card item={item} disableAction={true} onOpen={onClick} />);

  userEvent.click(container.firstChild)

  expect(onClick).not.toHaveBeenCalled()
});

test('renders card with toggled className if value is revealed', () => {
  const item = { backfaceIsUp: true, type: 1 }
  const { container } = render(<Card item={item} disableAction={false} onOpen={jest.fn()} />);
  expect(container.firstChild).toHaveClass("toggled")
});
