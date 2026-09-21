import type { Recipe, StockItem } from "../types";

import { getDishAvailability } from "../services/availability";

interface Props {
  recipes: Recipe[];
  stock: StockItem[];
  onOrder: (recipe: Recipe) => void;
}

export default function Menu({ recipes, stock, onOrder }: Props) {
  return (
    <section>
      <h2>Menu</h2>

      <div className="menu-list">
        {recipes.map((recipe) => {
          const availability = getDishAvailability(recipe, stock);

          return (
            <article className="menu-item" key={recipe.dish}>
              <h3>{recipe.dish}</h3>

              <p>₹{recipe.price}</p>

              <strong>
                {availability.available ? "Available" : "Unavailable"}
              </strong>

              {!availability.available && (
                <ul>
                  {availability.reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              )}

              <button
                disabled={!availability.available}
                onClick={() => onOrder(recipe)}
              >
                Order
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
