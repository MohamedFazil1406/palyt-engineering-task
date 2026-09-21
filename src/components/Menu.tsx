import type { Recipe, StockItem } from "../types";

import { getDishAvailability } from "../services/availability";

interface Props {
  recipes: Recipe[];
  stock: StockItem[];
  onOrder: (recipe: Recipe) => void;
}

export default function Menu({ recipes, stock, onOrder }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Menu</h2>

        <p className="mt-1 text-sm text-slate-500">
          Live dish availability based on kitchen stock
        </p>
      </div>

      <div className="space-y-4">
        {recipes.map((recipe) => {
          const availability = getDishAvailability(recipe, stock);

          return (
            <article
              key={recipe.dish}
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {recipe.dish}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    ₹{recipe.price}
                  </p>
                </div>

                {availability.available ? (
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Available
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                    Unavailable
                  </span>
                )}
              </div>

              {!availability.available && (
                <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
                  <p className="mb-1 text-xs font-semibold text-red-700">
                    Why unavailable
                  </p>

                  <ul className="space-y-1">
                    {availability.reasons.map((reason) => (
                      <li key={reason} className="text-xs text-red-600">
                        • {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                disabled={!availability.available}
                onClick={() => onOrder(recipe)}
                className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                {availability.available
                  ? "Order Dish"
                  : "Currently Unavailable"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
