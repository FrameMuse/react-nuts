import React from "react"
import { CreateQuery } from "./utils"


describe("CreateQuery snippet", () => {
  it("should convert object to escaped string query", () => {
    const objectQuery = {
      page: 1,
      loaded: false,
      method: "POST",
      secret: "%hack$*~ing^"
    }
    const stringQuery = CreateQuery(objectQuery)
    expect(stringQuery).toBe("page=1&loaded=false&method=POST&secret=%25hack%24*~ing%5E")
  })
})

describe("CreateQuery snippet", () => {
  it("should convert object to escaped string query", () => {
    const objectQuery = {
      page: 1,
      loaded: false,
      method: "POST",
      secret: "%hack$*~ing^"
    }
    const stringQuery = CreateQuery(objectQuery)
    expect(stringQuery).toBe("page=1&loaded=false&method=POST&secret=%25hack%24*~ing%5E")
  })
})
