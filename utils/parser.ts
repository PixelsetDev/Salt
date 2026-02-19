export function parseUnit(amount:number, unit:string) {
  if (unit === 'tbsp') {
    return `Tablespoon${amount > 1 ? 's':''}`;
  } else if (unit === 'tsp') {
    return `Teaspoon${amount > 1 ? 's':''}`;
  } else if (unit === 'mug') {
    return `${String(unit).charAt(0).toUpperCase() + String(unit).slice(1)}${amount > 1 ? 's':''}`
  } else {
    return unit;
  }
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