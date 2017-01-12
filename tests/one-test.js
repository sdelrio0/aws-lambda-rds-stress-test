import { expect } from 'chai';

describe("MY_ENV variable", () => {
  it("should be 123", () => {
    expect(process.env["MY_ENV"]).to.eq('123')
  })
})