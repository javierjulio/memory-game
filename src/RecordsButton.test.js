import { render, screen, fireEvent } from '@testing-library/svelte'
import RecordsButton from './RecordsButton.svelte'

describe("RecordsButton", () => {
  it("includes button label", () => {
    render(RecordsButton)
    expect(screen.queryByRole("button", { name: "Records" })).toBeInTheDocument()
  })

  it("forwards the click event", async () => {
    let clickReceived = false

    const { component } = render(RecordsButton, { onclick: () => clickReceived = true })

    const button = screen.queryByRole("button", { name: "Records" })
    await fireEvent.click(button)

    expect(clickReceived).toEqual(true)
  })
})
