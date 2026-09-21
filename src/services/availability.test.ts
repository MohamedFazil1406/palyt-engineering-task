import { describe, expect, it } from "vitest";

import { getDishAvailability } from "./availability";

import type { Recipe, StockItem } from "../types";

const recipe: Recipe = {
  dish: "Test Curry",
  price: 200,
  ingredients: [
    {
      name: "Cashews",
      qty: 40,
      unit: "g",
    },
  ],
};

describe("getDishAvailability", () => {
  it("returns available when stock is above par", () => {
    const stock: StockItem[] = [
      {
        name: "Cashews",
        qty: 300,
        unit: "g",
        par: 250,
      },
    ];

    const result = getDishAvailability(recipe, stock);

    expect(result.available).toBe(true);
  });

  it("returns unavailable when below par", () => {
    const stock: StockItem[] = [
      {
        name: "Cashews",
        qty: 220,
        unit: "g",
        par: 250,
      },
    ];

    const result = getDishAvailability(recipe, stock);

    expect(result.available).toBe(false);
  });

  it("returns unavailable when ingredient is missing", () => {
    const result = getDishAvailability(recipe, []);

    expect(result.available).toBe(false);
  });
});
