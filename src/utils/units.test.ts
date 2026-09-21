import { describe, expect, it } from "vitest";

import { convertQuantity } from "./utils";

describe("convertQuantity", () => {
  it("converts kg to grams", () => {
    expect(convertQuantity(1.4, "kg", "g")).toBe(1400);
  });

  it("converts grams to kg", () => {
    expect(convertQuantity(180, "g", "kg")).toBe(0.18);
  });

  it("rejects weight to volume conversion", () => {
    expect(() => convertQuantity(100, "g", "ml")).toThrow();
  });
});
