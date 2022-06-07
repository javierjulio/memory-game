import { render } from '@testing-library/svelte'
import MoveCountLabel from '../src/MoveCountLabel.svelte'

describe('MoveCountLabel.svelte', () => {
  it('renders given move count', () => {
    const { container } = render(MoveCountLabel, { count: 0 });
    expect(container).toBeTruthy()
    expect(container.innerHTML).toContain('0 moves')
    expect(container.innerHTML).toMatchSnapshot()
  })

  it('renders label in singular form with count of 1', () => {
    const { container } = render(MoveCountLabel, { count: 1 });
    expect(container).toBeTruthy()
    expect(container.innerHTML).toContain('1 move')
    expect(container.innerHTML).toMatchSnapshot()
  })

  it('renders label in plural form with count of 2', () => {
    const { container } = render(MoveCountLabel, { count: 2 });
    expect(container).toBeTruthy()
    expect(container.innerHTML).toContain('2 moves')
    expect(container.innerHTML).toMatchSnapshot()
  })
})
