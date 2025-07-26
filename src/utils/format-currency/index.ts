export function formatCurrency(
  amount: number,
  locale = "en-US",
  currency = "USD"
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}
export function formatCurrencyWithCommas(num: number | string): string {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
