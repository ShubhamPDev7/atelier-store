import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { getStockState } from "@/lib/stock";

type ProductCardProps = {
  product: Product;
  /** `sizes` attribute for the image; defaults to the grid-products layout. */
  sizes?: string;
};

export function ProductCard({
  product,
  sizes = "(min-width: 80rem) 25vw, (min-width: 48rem) 33vw, 50vw",
}: ProductCardProps) {
  const [image] = product.images;
  const soldOut = getStockState(product.stock).status === "sold_out";
  const badge = soldOut ? "Sold out" : product.badge;

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="media-well aspect-product">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            quality={80}
            className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${soldOut ? "opacity-60" : ""}`}
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-paper px-2 py-1 eyebrow">
              {badge}
            </span>
          )}
        </div>
        <div className="mt-3 space-y-0.5 pr-2 md:mt-4">
          <p className="text-caption text-muted">{product.category.name}</p>
          <h3 className="text-body underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-current">
            {product.name}
          </h3>
          <p className="text-caption">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
