import groupBy from "./groupBy"

describe("groupBy", () => {
  it("returns an empty object if data is empty", () => {
    expect(groupBy([], "moveCount")).toEqual({})
  })

  it("returns object with data grouped by given key", () => {
    const data = [
      { moveCount: 8, day: 1 },
      { moveCount: 8, day: 2 },
      { moveCount: 9, day: 3 }
    ]

    const result = {
      "8": [{ moveCount: 8, day: 1 }, { moveCount: 8, day: 2 }],
      "9": [{ moveCount: 9, day: 3 }]
    }

    expect(groupBy(data, "moveCount")).toEqual(result)
  })
})
