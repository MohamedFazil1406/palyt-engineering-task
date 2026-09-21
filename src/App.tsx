import { useState } from "react";

import stockJson from "./data/stock.json";
import recipesJson from "./data/recipes.json";

import type { Recipe, StockItem } from "./types";

import StockTable from "./components/StockTable";
import Menu from "./components/Menu";
import AddIngredientForm from "./components/AddIngredientForm";

import { placeOrder } from "./services/order";

import "./App.css";

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
  }

  function handleAddIngredient(item: StockItem) {
    setStock((current) => [...current, item]);
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
    <main>
      <h1>Palyt Kitchen</h1>

      {message && <p>{message}</p>}

      <div className="layout">
        <StockTable
          stock={stock}
          onUpdate={handleUpdateStock}
          onDelete={handleDeleteIngredient}
        />
        <AddIngredientForm stock={stock} onAdd={handleAddIngredient} />

        <Menu recipes={recipes} stock={stock} onOrder={handleOrder} />
      </div>
    </main>
  );
}

export default App;
