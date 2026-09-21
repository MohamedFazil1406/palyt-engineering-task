import type { Recipe, StockItem } from "../types/index";

export interface AvailabilityResult {
  available: boolean;
  reasons: string[];
}

export function getDishAvailability(
  recipe: Recipe,
  stock: StockItem[],
): AvailabilityResult {
  const reasons: string[] = [];

  for (const required of recipe.ingredients) {
    const stockItem = stock.find((item) => item.name === required.name);

    if (!stockItem) {
      reasons.push(`${required.name} is missing from stock`);
      continue;
    }

    if (stockItem.qty < stockItem.par) {
      reasons.push(`${stockItem.name} is below par`);
    }
  }

  return {
    available: reasons.length === 0,
    reasons,
  };
}
