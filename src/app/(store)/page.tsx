import { CategoryGrid } from "@/components/home/category-grid";
import { DepartmentTiles } from "@/components/home/department-tiles";
import { Hero } from "@/components/home/hero";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { SectionHeading } from "@/components/home/section-heading";
import { StoryFeature } from "@/components/home/story-feature";
import { ProductCard } from "@/components/product/product-card";
import { services } from "@/data/catalog";
import { getAccessories, getNewArrivals } from "@/lib/catalog";

export default async function HomePage() {
  const [newArrivals, accessories] = await Promise.all([getNewArrivals(), getAccessories()]);

  return (
    <>
      <Hero />

      <DepartmentTiles />

      <section className="section container-page pt-0">
        <SectionHeading
          eyebrow="Just landed"
          title="New Arrivals"
          link={{ label: "View all", href: "/collections/new-in" }}
        />
        <div className="grid-products">
          {newArrivals.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <StoryFeature />

      <CategoryGrid />

      <section className="section container-page pt-0">
        <SectionHeading
          eyebrow="Finishing touches"
          title="The Accessories Edit"
          link={{ label: "Shop accessories", href: "/collections/accessories" }}
        />
        <div className="rail">
          {accessories.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              sizes="(min-width: 80rem) 25vw, (min-width: 48rem) 33vw, 70vw"
            />
          ))}
        </div>
      </section>

      <section className="hairline-t">
        <ul className="container-page grid gap-10 py-12 text-center md:grid-cols-3 md:py-16">
          {services.map((service) => (
            <li key={service.title}>
              <h2 className="eyebrow">{service.title}</h2>
              <p className="mx-auto mt-3 max-w-xs text-muted">{service.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section bg-surface">
        <div className="container-narrow text-center">
          <h2 className="heading-section">Stay in touch</h2>
          <p className="mt-4 text-muted">
            Be the first to hear about new collections, private events and
            stories from the atelier.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
