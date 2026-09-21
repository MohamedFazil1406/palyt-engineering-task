import { useState } from "react";

import type { StockItem } from "../types";

interface Props {
  stock: StockItem[];

  onUpdate: (name: string, qty: number, par: number) => void;

  onDelete: (name: string) => void;
}

export default function StockTable({ stock, onUpdate, onDelete }: Props) {
  const [editingName, setEditingName] = useState<string | null>(null);

  const [qty, setQty] = useState("");
  const [par, setPar] = useState("");
  const [search, setSearch] = useState("");

  function startEdit(item: StockItem) {
    setEditingName(item.name);
    setQty(String(item.qty));
    setPar(String(item.par));
  }

  function cancelEdit() {
    setEditingName(null);
    setQty("");
    setPar("");
  }

  function save(item: StockItem) {
    const newQty = Number(qty);
    const newPar = Number(par);

    if (
      qty.trim() === "" ||
      par.trim() === "" ||
      !Number.isFinite(newQty) ||
      !Number.isFinite(newPar) ||
      newQty < 0 ||
      newPar < 0
    ) {
      alert("Quantity and par must be non-negative numbers");

      return;
    }

    onUpdate(item.name, newQty, newPar);

    cancelEdit();
  }

  const filteredStock = stock.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Kitchen Stock
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage ingredient quantities and par levels
          </p>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="search"
            placeholder="Search ingredients..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Ingredient</th>

              <th className="px-5 py-3">Quantity</th>

              <th className="px-5 py-3">Par</th>

              <th className="px-5 py-3">Status</th>

              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredStock.map((item) => {
              const editing = editingName === item.name;

              const belowPar = item.qty < item.par;

              return (
                <tr key={item.name} className="transition hover:bg-slate-50">
                  {/* Ingredient */}
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">
                      {item.name}
                    </div>

                    <div className="mt-0.5 text-xs text-slate-400">
                      Unit: {item.unit}
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="px-5 py-4 text-slate-600">
                    {editing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={qty}
                          onChange={(event) => setQty(event.target.value)}
                          className="w-24 rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        />

                        <span className="text-xs text-slate-400">
                          {item.unit}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium">
                        {item.qty} {item.unit}
                      </span>
                    )}
                  </td>

                  {/* Par */}
                  <td className="px-5 py-4 text-slate-600">
                    {editing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={par}
                          onChange={(event) => setPar(event.target.value)}
                          className="w-24 rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        />

                        <span className="text-xs text-slate-400">
                          {item.unit}
                        </span>
                      </div>
                    ) : (
                      `${item.par} ${item.unit}`
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    {belowPar ? (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                        Below par
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        In stock
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {editing ? (
                        <>
                          <button
                            onClick={() => save(item)}
                            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
                          >
                            Save
                          </button>

                          <button
                            onClick={cancelEdit}
                            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(item)}
                          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Edit
                        </button>
                      )}

                      <button
                        onClick={() => onDelete(item.name)}
                        className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredStock.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center">
                  <p className="text-sm font-medium text-slate-600">
                    No ingredients found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try a different search term.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-3">
        <p className="text-xs text-slate-500">
          Showing {filteredStock.length} of {stock.length} ingredients
        </p>
      </div>
    </section>
  );
}
