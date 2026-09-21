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

  function save(item: StockItem) {
    const newQty = Number(qty);
    const newPar = Number(par);

    if (
      !Number.isFinite(newQty) ||
      !Number.isFinite(newPar) ||
      newQty < 0 ||
      newPar < 0
    ) {
      alert("Quantity and par must be non-negative numbers");

      return;
    }

    onUpdate(item.name, newQty, newPar);

    setEditingName(null);
  }

  const filteredStock = stock.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <section>
      <h2>Kitchen Stock</h2>

      <input
        type="search"
        placeholder="Search ingredients"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Par</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStock.map((item) => {
            const editing = editingName === item.name;

            return (
              <tr key={item.name}>
                <td>{item.name}</td>

                <td>
                  {editing ? (
                    <input
                      type="number"
                      min="0"
                      value={qty}
                      onChange={(event) => setQty(event.target.value)}
                    />
                  ) : (
                    `${item.qty} ${item.unit}`
                  )}
                </td>

                <td>
                  {editing ? (
                    <input
                      type="number"
                      min="0"
                      value={par}
                      onChange={(event) => setPar(event.target.value)}
                    />
                  ) : (
                    `${item.par} ${item.unit}`
                  )}
                </td>

                <td>{item.qty < item.par ? "Below par" : "OK"}</td>

                <td>
                  {editing ? (
                    <>
                      <button onClick={() => save(item)}>Save</button>

                      <button onClick={() => setEditingName(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(item)}>Edit</button>
                  )}

                  <button onClick={() => onDelete(item.name)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
