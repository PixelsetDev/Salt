import { units } from './units.ts';

export function parseUnit(amount: number, unit: string, showNoUnit: boolean) {
  const found = units.find(u => u.short === unit);

  if (!found) return unit;

  const name = found.long;

  if (!showNoUnit && name === "No Unit") return "";

  if (amount > 1 && name !== "No Unit") {
    return `${name}s`;
  }

  return name;
}

export function parseAmount(amount: number) {
  const whole = Math.floor(amount);
  const decimal = amount - whole;

  let fraction = "";

  if (decimal === 0.25) fraction = "¼";
  else if (decimal === 0.5) fraction = "½";
  else if (decimal === 0.75) fraction = "¾";

  if (whole === 0) return fraction || amount.toString();
  if (fraction) return `${whole}${fraction}`;

  return amount.toString();
}