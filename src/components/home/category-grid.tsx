import Image from "next/image";
import Link from "next/link";

import { categories } from "@/data/catalog";

import { SectionHeading } from "./section-heading";

export function CategoryGrid() {
  return (
    <section className="section container-page">
      <SectionHeading eyebrow="Explore" title="Shop by Category" />
      <ul className="grid grid-cols-2 gap-x-(--grid-gap-x) gap-y-8 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/collections/${category.slug}`} className="group block">
              <div className="aspect-portrait media-well">
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes="(min-width: 64rem) 25vw, 50vw"
                  quality={80}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-center eyebrow link-quiet group-hover:decoration-current">
                {category.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
