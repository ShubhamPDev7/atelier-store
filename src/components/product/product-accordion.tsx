import type { ReactNode } from "react";

type ProductAccordionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

/** Native <details> disclosure: works without JavaScript. */
export function ProductAccordion({ title, defaultOpen, children }: ProductAccordionProps) {
  return (
    <details open={defaultOpen} className="group hairline-b">
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 eyebrow [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden="true" className="relative size-3">
          <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-current transition-transform group-open:scale-y-0" />
        </span>
      </summary>
      <div className="pb-6 text-muted">{children}</div>
    </details>
  );
}
