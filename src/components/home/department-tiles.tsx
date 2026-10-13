import Image from "next/image";
import Link from "next/link";

import { departments } from "@/data/catalog";

export function DepartmentTiles() {
  return (
    <section className="section container-page">
      <div className="grid-editorial">
        {departments.map((department) => (
          <Link
            key={department.slug}
            href={`/collections/${department.slug}`}
            className="group relative block aspect-portrait media-well"
          >
            <Image
              src={department.image.src}
              alt={department.image.alt}
              fill
              sizes="(min-width: 48rem) 50vw, 100vw"
              quality={80}
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/50 to-transparent to-50%" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-center text-paper md:p-10">
              <h2 className="heading-section">{department.title}</h2>
              <span className="mt-3 inline-block eyebrow underline decoration-1 underline-offset-[0.35em]">
                Shop {department.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
