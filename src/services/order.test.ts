import { describe, expect, it } from "vitest";

import stockJson from "../data/stock.json";
import recipesJson from "../data/recipes.json";

import type { Recipe, StockItem } from "../types";

import { placeOrder } from "./order";

import { getDishAvailability } from "./availability";

describe("placeOrder", () => {
  it("deducts stock and makes cashew dishes unavailable", () => {
    const stock = stockJson as StockItem[];

    const recipes = recipesJson as Recipe[];

    const shahiPaneer = recipes.find(
      (recipe) => recipe.dish === "Shahi Paneer Korma",
    )!;

    const butterMasala = recipes.find(
      (recipe) => recipe.dish === "Paneer Butter Masala",
    )!;

    const afterFirstOrder = placeOrder(shahiPaneer, stock);

    const firstCashews = afterFirstOrder.find(
      (item) => item.name === "Cashews",
    )!;

    expect(firstCashews.qty).toBe(260);

    expect(getDishAvailability(shahiPaneer, afterFirstOrder).available).toBe(
      true,
    );

    const afterSecondOrder = placeOrder(shahiPaneer, afterFirstOrder);

    const secondCashews = afterSecondOrder.find(
      (item) => item.name === "Cashews",
    )!;

    expect(secondCashews.qty).toBe(220);

    expect(getDishAvailability(shahiPaneer, afterSecondOrder).available).toBe(
      false,
    );

    expect(getDishAvailability(butterMasala, afterSecondOrder).available).toBe(
      false,
    );
  });
});
