const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number | string) {
  console.log(amount);

  if (typeof amount === "string") {
    if (amount.length === 0) return "";

    amount = parseFloat(amount.replace(/[$,]/g, ""));

    if (isNaN(amount)) return CURRENCY_FORMATTER.format(0);

    return CURRENCY_FORMATTER.format(amount);
  }

  return CURRENCY_FORMATTER.format(amount);
}
