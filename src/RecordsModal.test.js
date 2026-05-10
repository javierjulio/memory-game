import { render, screen, fireEvent } from '@testing-library/svelte'
import RecordsModal from './RecordsModal.svelte'

vi.mock('./db', () => {
  return {
    db: {
      completedGames: {
        toArray: vi.fn(() => [])
      },
    }
  }
})

// TODO: rewrite as an integration test with Playwright as jsdom doesn't
// support Web Animations API and Svelte's transitions require it.
// https://github.com/testing-library/svelte-testing-library/issues/416
describe.skip("Svelte 5 requires Web Animations API - RecordsModal", () => {
  it("includes a close button", () => {
    render(RecordsModal)
    expect(screen.queryByRole("button", { name: "Close" })).toBeInTheDocument()
  })

  it("forwards the close event", async () => {
    let closeReceived = false

    const { component } = render(RecordsModal, { close: () => closeReceived = true })

    const button = screen.queryByRole("button", { name: "Close" })
    await fireEvent.click(button)

    expect(closeReceived).toEqual(true)
  })
})
