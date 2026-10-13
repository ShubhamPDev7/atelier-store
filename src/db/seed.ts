// Loads the sample catalog. Idempotent: rows are upserted by slug.
// Run with `npm run db:seed` after `npm run db:migrate`.

import { config } from "dotenv";
import { sql } from "drizzle-orm";

config({ path: [".env.local", ".env"] });

async function main() {
  // Imported after dotenv so DATABASE_URL is set when the client is created.
  const { db } = await import("./index");
  const { categories, products } = await import("./schema");
  const { seedCategories, seedProducts } = await import("./seed-data");

  const categoryRows = await db
    .insert(categories)
    .values(seedCategories.map((category, index) => ({ ...category, sortOrder: index })))
    .onConflictDoUpdate({
      target: categories.slug,
      set: {
        name: sql`excluded.name`,
        sortOrder: sql`excluded.sort_order`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: categories.id, slug: categories.slug });

  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  // Newest first: each product is one minute older than the one before it.
  const now = Date.now();
  const productValues = seedProducts.map((product, index) => {
    const categoryId = categoryIds.get(product.category);
    if (categoryId === undefined) {
      throw new Error(`Unknown category "${product.category}" for product ${product.slug}`);
    }
    return {
      slug: product.slug,
      categoryId,
      name: product.name,
      description: product.description,
      details: product.details,
      images: product.images,
      priceCents: product.price,
      stock: product.stock,
      badge: product.badge ?? null,
      createdAt: new Date(now - index * 60_000),
    };
  });

  await db
    .insert(products)
    .values(productValues)
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        categoryId: sql`excluded.category_id`,
        name: sql`excluded.name`,
        description: sql`excluded.description`,
        details: sql`excluded.details`,
        images: sql`excluded.images`,
        priceCents: sql`excluded.price_cents`,
        stock: sql`excluded.stock`,
        badge: sql`excluded.badge`,
        createdAt: sql`excluded.created_at`,
        updatedAt: sql`now()`,
      },
    });

  console.log(`Seeded ${categoryRows.length} categories and ${productValues.length} products.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
