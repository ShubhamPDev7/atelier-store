import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/home/section-heading";
import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { StockIndicator } from "@/components/product/stock-indicator";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { getStockState } from "@/lib/stock";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const stock = getStockState(product.stock);
  const soldOut = stock.status === "sold_out";
  const related = await getRelatedProducts(product);
  const categoryHref = `/collections/${product.category.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    category: product.category.name,
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: soldOut
        ? "https://schema.org/OutOfStock"
        : stock.status === "low_stock"
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="container-page">
        <nav aria-label="Breadcrumb" className="py-4 md:py-6">
          <ol className="flex flex-wrap items-center gap-2 text-caption text-muted">
            <li>
              <Link href="/" className="link-quiet hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryHref} className="link-quiet hover:text-ink">
                {product.category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12 xl:gap-20">
          <ProductGallery images={product.images} />

          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <div className="max-w-lg">
              <p className="eyebrow text-muted">{product.category.name}</p>
              <h1 className="mt-3 heading-section">{product.name}</h1>
              <p className="mt-4 text-body-lg">{formatPrice(product.price)}</p>

              <div className="mt-6">
                <StockIndicator state={stock} />
              </div>

              {/* UI only: the bag/cart is not implemented yet. */}
              <button type="button" className="btn btn-primary btn-block mt-6" disabled={soldOut}>
                {soldOut ? "Sold out" : "Add to bag"}
              </button>
              {soldOut && (
                <p className="mt-3 text-caption text-muted">
                  This piece is currently unavailable. New stock arrives regularly.
                </p>
              )}

              <ul className="mt-8 space-y-2 text-caption text-muted">
                <li>Complimentary express shipping</li>
                <li>Free returns and exchanges within 30 days</li>
              </ul>

              <div className="mt-10 hairline-t">
                <ProductAccordion title="Description" defaultOpen>
                  <p>{product.description}</p>
                </ProductAccordion>
                <ProductAccordion title="Details & care">
                  <ul className="list-disc space-y-1.5 pl-4 marker:text-subtle">
                    {product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </ProductAccordion>
                <ProductAccordion title="Shipping & returns">
                  <p>
                    Orders ship within 1–2 business days with complimentary express
                    delivery. Unworn pieces can be returned or exchanged free of charge
                    within 30 days of delivery.
                  </p>
                </ProductAccordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section container-page">
          <SectionHeading title="You May Also Like" />
          <div className="grid-products">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
