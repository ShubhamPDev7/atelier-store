// Catalog reads for the storefront. Every query is cached and tagged "products";
// call revalidateTag("products") after changing catalog data.

import { desc, eq, inArray, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { categories, products, type ImageAsset } from "@/db/schema";

export type { ImageAsset };

export type Category = {
  slug: string;
  name: string;
};

export type Product = {
  slug: string;
  name: string;
  category: Category;
  /** Price in minor units (cents). */
  price: number;
  /** Units available to sell. Drives the stock state (see src/lib/stock.ts). */
  stock: number;
  /** First image is the primary image used on product cards. */
  images: [ImageAsset, ...ImageAsset[]];
  description: string;
  details: string[];
  badge?: string;
};

/** Category slugs shown in "The Accessories Edit" on the homepage. */
const ACCESSORY_CATEGORY_SLUGS = ["shoes", "jewelry", "eyewear", "small-leather-goods"];

const productColumns = {
  slug: products.slug,
  name: products.name,
  priceCents: products.priceCents,
  stock: products.stock,
  images: products.images,
  description: products.description,
  details: products.details,
  badge: products.badge,
  categorySlug: categories.slug,
  categoryName: categories.name,
};

function selectProducts() {
  return db
    .select(productColumns)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id));
}

type ProductRow = Awaited<ReturnType<typeof selectProducts>>[number];

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: { slug: row.categorySlug, name: row.categoryName },
    price: row.priceCents,
    stock: row.stock,
    images: row.images,
    description: row.description,
    details: row.details,
    badge: row.badge ?? undefined,
  };
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const [row] = await selectProducts().where(eq(products.slug, slug)).limit(1);
  return row && toProduct(row);
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}

/** Most recently added products first. */
export async function getNewArrivals(limit = 8): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const rows = await selectProducts().orderBy(desc(products.createdAt)).limit(limit);
  return rows.map(toProduct);
}

export async function getAccessories(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const rows = await selectProducts()
    .where(inArray(categories.slug, ACCESSORY_CATEGORY_SLUGS))
    .orderBy(desc(products.createdAt));
  return rows.map(toProduct);
}

/** Same-category products first, then others, excluding the given product. */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return queryRelatedProducts(product.slug, product.category.slug, limit);
}

async function queryRelatedProducts(
  slug: string,
  categorySlug: string,
  limit: number,
): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const rows = await selectProducts()
    .where(ne(products.slug, slug))
    .orderBy(desc(sql`${categories.slug} = ${categorySlug}`), desc(products.createdAt))
    .limit(limit);
  return rows.map(toProduct);
}
