import { render } from '@testing-library/svelte'
import MoveCountLabel from './MoveCountLabel.svelte'

describe('MoveCountLabel', () => {
  it('renders given move count', () => {
    const { container } = render(MoveCountLabel, { count: 0 });
    expect(container).toHaveTextContent('0 moves')
  })

  it('renders label in singular form with count of 1', () => {
    const { container } = render(MoveCountLabel, { count: 1 });
    expect(container).toHaveTextContent('1 move')
  })

  it('renders label in plural form with count of 2', () => {
    const { container } = render(MoveCountLabel, { count: 2 });
    expect(container).toHaveTextContent('2 moves')
  })
})
