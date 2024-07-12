const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number | string) {
  if (typeof amount === "string") {
    amount = parseFloat(amount.replace(/[$,]/g, ""));

    if (isNaN(amount)) return CURRENCY_FORMATTER.format(0);

    return CURRENCY_FORMATTER.format(amount);
  }

  return CURRENCY_FORMATTER.format(amount);
}
