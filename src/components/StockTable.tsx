import type { StockItem } from "../types";

interface Props {
  stock: StockItem[];
}

export default function StockTable({ stock }: Props) {
  return (
    <section>
      <h2>Kitchen Stock</h2>

      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Par</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {stock.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>

              <td>
                {item.qty} {item.unit}
              </td>

              <td>
                {item.par} {item.unit}
              </td>

              <td>{item.qty < item.par ? "Below par" : "OK"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
