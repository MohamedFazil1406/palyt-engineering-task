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

    if (qty.trim() === "" || !Number.isFinite(numericQty) || numericQty < 0) {
      alert("Quantity must be a non-negative number");
      return;
    }

    if (par.trim() === "" || !Number.isFinite(numericPar) || numericPar < 0) {
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
    setUnit("g");
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Add Ingredient</h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a new ingredient to the kitchen inventory
        </p>
      </div>

      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        {/* Ingredient name */}
        <div className="sm:col-span-2">
          <label
            htmlFor="ingredient-name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Ingredient name
          </label>

          <input
            id="ingredient-name"
            type="text"
            placeholder="e.g. Coriander"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Quantity
          </label>

          <input
            id="quantity"
            type="number"
            min="0"
            step="any"
            placeholder="0"
            value={qty}
            onChange={(event) => setQty(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {/* Unit */}
        <div>
          <label
            htmlFor="unit"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Unit
          </label>

          <select
            id="unit"
            value={unit}
            onChange={(event) => setUnit(event.target.value as Unit)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value="g">Grams (g)</option>

            <option value="kg">Kilograms (kg)</option>

            <option value="ml">Millilitres (ml)</option>
          </select>
        </div>

        {/* Par */}
        <div className="sm:col-span-2">
          <label
            htmlFor="par"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Par level
          </label>

          <input
            id="par"
            type="number"
            min="0"
            step="any"
            placeholder="Minimum preferred stock"
            value={par}
            onChange={(event) => setPar(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Dishes become unavailable when this ingredient falls below its par
            level.
          </p>
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Add Ingredient
          </button>
        </div>
      </form>
    </section>
  );
}
