export type Unit = "kg" | "g" | "ml";

export interface StockItem {
  name: string;
  qty: number;
  unit: Unit;
  par: number;
}

export interface RecipeIngredient {
  name: string;
  qty: number;
  unit: Unit;
}

export interface Recipe {
  dish: string;
  price: number;
  ingredients: RecipeIngredient[];
}
