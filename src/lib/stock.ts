export const LOW_STOCK_THRESHOLD = 3;

export type StockState =
  | { status: "in_stock" }
  | { status: "low_stock"; remaining: number }
  | { status: "sold_out" };

export function getStockState(stock: number): StockState {
  if (stock <= 0) return { status: "sold_out" };
  if (stock <= LOW_STOCK_THRESHOLD) return { status: "low_stock", remaining: stock };
  return { status: "in_stock" };
}

export function stockLabel(state: StockState): string {
  switch (state.status) {
    case "in_stock":
      return "In stock";
    case "low_stock":
      return `Only ${state.remaining} left`;
    case "sold_out":
      return "Sold out";
  }
}
