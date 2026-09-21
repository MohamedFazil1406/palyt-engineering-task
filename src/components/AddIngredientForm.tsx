import { useState } from "react";

import type { StockItem, Unit } from "../types";

interface Props {
  stock: StockItem[];
  onAdd: (item: StockItem) => void;
}

export default function AddIngredientForm({ stock, onAdd }: Props) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [par, setPar] = useState("");
  const [unit, setUnit] = useState<Unit>("g");

  function submit(event: React.FormEvent) {
    event.preventDefault();

    const cleanName = name.trim();

    const numericQty = Number(qty);
    const numericPar = Number(par);

    if (!cleanName) {
      alert("Ingredient name is required");
      return;
    }

    const duplicate = stock.some(
      (item) => item.name.toLowerCase() === cleanName.toLowerCase(),
    );

    if (duplicate) {
      alert("An ingredient with this name already exists");

      return;
    }

    if (!Number.isFinite(numericQty) || numericQty < 0) {
      alert("Quantity must be a non-negative number");

      return;
    }

    if (!Number.isFinite(numericPar) || numericPar < 0) {
      alert("Par must be a non-negative number");

      return;
    }

    onAdd({
      name: cleanName,
      qty: numericQty,
      par: numericPar,
      unit,
    });

    setName("");
    setQty("");
    setPar("");
  }

  return (
    <form onSubmit={submit}>
      <h3>Add ingredient</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="number"
        min="0"
        placeholder="Quantity"
        value={qty}
        onChange={(event) => setQty(event.target.value)}
      />

      <select
        value={unit}
        onChange={(event) => setUnit(event.target.value as Unit)}
      >
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
      </select>

      <input
        type="number"
        min="0"
        placeholder="Par"
        value={par}
        onChange={(event) => setPar(event.target.value)}
      />

      <button type="submit">Add ingredient</button>
    </form>
  );
}
