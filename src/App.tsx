import { useState } from "react";

import stockJson from "./data/stock.json";
import recipesJson from "./data/recipes.json";

import type { Recipe, StockItem } from "./types";

import StockTable from "./components/StockTable";
import Menu from "./components/Menu";
import AddIngredientForm from "./components/AddIngredientForm";

import { placeOrder } from "./services/order";

function App() {
  const [stock, setStock] = useState<StockItem[]>(stockJson as StockItem[]);

  const [message, setMessage] = useState("");

  const recipes = recipesJson as Recipe[];

  function handleUpdateStock(name: string, qty: number, par: number) {
    setStock((current) =>
      current.map((item) =>
        item.name === name
          ? {
              ...item,
              qty,
              par,
            }
          : item,
      ),
    );

    setMessage(`${name} updated successfully`);
  }

  function handleAddIngredient(item: StockItem) {
    setStock((current) => [...current, item]);

    setMessage(`${item.name} added successfully`);
  }

  function handleDeleteIngredient(name: string) {
    const usedBy = recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) => ingredient.name === name),
    );

    if (usedBy.length > 0) {
      alert(
        `${name} cannot be deleted because it is used by: ${usedBy
          .map((recipe) => recipe.dish)
          .join(", ")}`,
      );

      return;
    }

    setStock((current) => current.filter((item) => item.name !== name));

    setMessage(`${name} deleted successfully`);
  }

  function handleOrder(recipe: Recipe) {
    try {
      const updatedStock = placeOrder(recipe, stock);

      setStock(updatedStock);

      setMessage(`${recipe.dish} ordered successfully`);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to place order",
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Palyt Kitchen
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage kitchen inventory and live menu availability
              </p>
            </div>

            <div className="text-sm text-slate-500">
              {stock.length} ingredients
            </div>
          </div>
        </header>

        {/* Message */}
        {message && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-medium text-emerald-700">{message}</p>

            <button
              onClick={() => setMessage("")}
              className="text-sm text-emerald-600 transition hover:text-emerald-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main layout */}
        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          {/* Left */}
          <div className="space-y-6">
            <StockTable
              stock={stock}
              onUpdate={handleUpdateStock}
              onDelete={handleDeleteIngredient}
            />

            <AddIngredientForm stock={stock} onAdd={handleAddIngredient} />
          </div>

          {/* Right */}
          <div>
            <Menu recipes={recipes} stock={stock} onOrder={handleOrder} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
