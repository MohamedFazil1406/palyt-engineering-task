import type { Recipe, StockItem } from "../types";

import { convertQuantity } from "../utils/utils";

export function canFulfilRecipe(recipe: Recipe, stock: StockItem[]): boolean {
  return recipe.ingredients.every((required) => {
    const stockItem = stock.find((item) => item.name === required.name);

    if (!stockItem) {
      return false;
    }

    try {
      const requiredInStockUnit = convertQuantity(
        required.qty,
        required.unit,
        stockItem.unit,
      );

      return stockItem.qty >= requiredInStockUnit;
    } catch {
      return false;
    }
  });
}

export function placeOrder(recipe: Recipe, stock: StockItem[]): StockItem[] {
  if (!canFulfilRecipe(recipe, stock)) {
    throw new Error(`Not enough stock to prepare ${recipe.dish}`);
  }

  return stock.map((stockItem) => {
    const required = recipe.ingredients.find(
      (ingredient) => ingredient.name === stockItem.name,
    );

    if (!required) {
      return stockItem;
    }

    const requiredInStockUnit = convertQuantity(
      required.qty,
      required.unit,
      stockItem.unit,
    );

    return {
      ...stockItem,
      qty: Math.round((stockItem.qty - requiredInStockUnit) * 1000) / 1000,
    };
  });
}
