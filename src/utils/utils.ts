import type { Unit } from "../types/index";

type UnitKind = "weight" | "volume";

function getUnitKind(unit: Unit): UnitKind {
  switch (unit) {
    case "kg":
    case "g":
      return "weight";

    case "ml":
      return "volume";
  }
}

export function toBaseUnit(qty: number, unit: Unit): number {
  switch (unit) {
    case "kg":
      return qty * 1000;

    case "g":
    case "ml":
      return qty;
  }
}

export function fromBaseUnit(qty: number, unit: Unit): number {
  switch (unit) {
    case "kg":
      return qty / 1000;

    case "g":
    case "ml":
      return qty;
  }
}

export function convertQuantity(
  qty: number,
  fromUnit: Unit,
  toUnit: Unit,
): number {
  if (getUnitKind(fromUnit) !== getUnitKind(toUnit)) {
    throw new Error(`Cannot convert ${fromUnit} to ${toUnit}`);
  }

  const baseQuantity = toBaseUnit(qty, fromUnit);

  return fromBaseUnit(baseQuantity, toUnit);
}
