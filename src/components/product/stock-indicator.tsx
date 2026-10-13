import { stockLabel, type StockState } from "@/lib/stock";

const dotColor: Record<StockState["status"], string> = {
  in_stock: "bg-success",
  low_stock: "bg-danger",
  sold_out: "bg-subtle",
};

export function StockIndicator({ state }: { state: StockState }) {
  return (
    <p className="flex items-center gap-2 text-caption">
      <span aria-hidden="true" className={`size-1.5 ${dotColor[state.status]}`} />
      <span className={state.status === "sold_out" ? "text-muted" : undefined}>
        {stockLabel(state)}
      </span>
    </p>
  );
}
