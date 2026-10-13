const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Formats a price stored in minor units (cents). */
export function formatPrice(cents: number): string {
  return usd.format(cents / 100);
}
