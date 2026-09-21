import { useState } from "react";

import stockJson from "./data/stock.json";
import recipesJson from "./data/recipes.json";

import type { Recipe, StockItem } from "./types";

import StockTable from "./components/StockTable";

import "./App.css";

function App() {
  const [stock, setStock] = useState<StockItem[]>(stockJson as StockItem[]);

  const recipes = recipesJson as Recipe[];

  return (
    <main>
      <h1>Palyt Kitchen</h1>

      <StockTable stock={stock} />
    </main>
  );
}

export default App;
