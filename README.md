# Palyt Kitchen Inventory

A small kitchen inventory and menu availability application built for the Palyt Engineering Intern take-home task.

The application connects kitchen stock with the restaurant menu. When stock changes or a dish is ordered, menu availability updates automatically based on ingredient par levels.

## Features

- View all kitchen ingredients
- Search ingredients
- Add new ingredients
- Edit stock quantity
- Edit par levels
- Delete unused ingredients
- Prevent deletion of ingredients used by recipes
- Display live menu availability
- Place dish orders
- Deduct recipe ingredients from stock
- Automatically update menu availability after orders
- Handle unit conversion between kilograms and grams
- Display reasons when dishes are unavailable
- Unit tests for availability, stock deduction, and unit conversion

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest

No backend or database is used. Stock is kept in React state for the duration of the session.

## Getting Started

### Requirements

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Run the application

```bash
npm run dev
```

Vite will print the local development URL, typically:

```text
http://localhost:5173
```

### Run tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Production build

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
│   ├── AddIngredientForm.tsx
│   ├── Menu.tsx
│   └── StockTable.tsx
│
├── data/
│   ├── recipes.json
│   └── stock.json
│
├── services/
│   ├── availability.ts
│   ├── availability.test.ts
│   ├── order.ts
│   └── order.test.ts
│
├── types/
│   └── index.ts
│
├── utils/
│   ├── units.ts
│   └── units.test.ts
│
├── App.tsx
└── main.tsx
```

## How Availability Works

A dish is unavailable when any ingredient required by its recipe is below that ingredient's par level.

For example:

```text
Cashews stock: 300g
Par level:     250g
```

Shahi Paneer Korma uses:

```text
40g Cashews
```

After one order:

```text
300g - 40g = 260g
```

The dish remains available because the stock is still above par.

After a second order:

```text
260g - 40g = 220g
```

Since:

```text
220g < 250g
```

dishes using Cashews become unavailable.

Restocking Cashews above the par level makes those dishes available again.

## Unit Conversion

Stock and recipes do not always use the same units.

For example, Paneer may be stored as:

```text
1.4kg
```

while a recipe may require:

```text
180g
```

Before deducting stock, quantities are converted into compatible units.

```text
1.4kg = 1400g

1400g - 180g = 1220g

1220g = 1.22kg
```

The application currently supports:

- `kg`
- `g`
- `ml`

Weight and volume units cannot be converted into each other.

## Design Decisions

### Ingredient identity

The supplied JSON files do not contain ingredient IDs.

Ingredients are therefore matched using their `name`.

Because names act as identifiers, duplicate ingredient names are not allowed.

### Missing ingredients

Some recipe ingredients are not present in the supplied stock data.

For example:

- Cumin Seeds
- Refined Flour

A dish that requires an ingredient missing from stock is considered unavailable.

This avoids allowing an order when the kitchen is not tracking a required ingredient.

### Deleting ingredients

An ingredient can be deleted only when no recipe currently depends on it.

For example, an unused ingredient such as Bay Leaves can be removed.

If an ingredient such as Cashews is used by recipes, deletion is blocked and the application shows which dishes depend on it.

I chose this behavior to avoid leaving recipes with broken ingredient references.

### Validation

The application rejects:

- Empty ingredient names
- Duplicate ingredient names
- Negative quantities
- Negative par levels
- Empty quantity values
- Empty par values
- Invalid numeric values

Zero is allowed for both stock quantity and par level.

## Order Safety

Menu availability and the ability to fulfil an order are treated as related but separate checks.

The supplied availability rule is based on par level.

However, an order should never reduce stock below zero.

Before deducting ingredients, the application checks whether enough physical stock exists to prepare the recipe.

## Testing

Vitest is used to test the core business logic.

Tests cover:

- kg to g conversion
- g to kg conversion
- invalid unit conversions
- dish availability above par
- dish unavailability below par
- missing stock ingredients
- ingredient deduction after an order
- menu availability changing after stock falls below par
- multiple dishes reacting to a shared ingredient falling below par

The tests focus on the business logic rather than testing every UI interaction.

## Manual Verification

In addition to automated tests, I manually verified the main browser flow:

1. Load the stock list.
2. Edit ingredient quantity.
3. Edit par level.
4. Search ingredients.
5. Add a new ingredient.
6. Delete an unused ingredient.
7. Attempt to delete an ingredient used by a recipe.
8. Place a dish order.
9. Confirm the correct recipe quantities are deducted.
10. Confirm menu availability updates.
11. Restock an ingredient.
12. Confirm affected dishes become available again.

## If I Had Another Day

I would consider adding:

- Persistent storage so changes survive page refreshes
- Better inline form validation instead of browser alerts
- Confirmation dialogs for destructive actions
- More accessibility improvements
- Additional edge-case tests
- Better handling of larger unit families
- More detailed stock movement history

## AI Usage

I used ChatGPT to discuss architecture, review implementation ideas, help structure the tests, and improve the UI styling.

I reviewed the final implementation and can explain the code and design decisions used in the project.
