import { render } from '@testing-library/svelte'
import Card from './Card.svelte'

describe('Card', () => {
  it('adds toggled class when flipped', () => {
    const { getByTestId } = render(Card, { flipped: true })
    const component = getByTestId("card-0")
    expect(component).toBeInTheDocument()
    expect(component).toHaveClass("toggled")
  })

  it('does not have a toggled class when not flipped', () => {
    const { getByTestId } = render(Card, { flipped: false })
    const component = getByTestId("card-0")
    expect(component).toBeInTheDocument()
    expect(component).not.toHaveClass("toggled")
  })
})
