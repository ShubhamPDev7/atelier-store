import Image from "next/image";
import Link from "next/link";

import { hero } from "@/data/catalog";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative aspect-4/5 max-h-[calc(100svh-var(--header-h)-2rem)] min-h-[28rem] w-full sm:aspect-16/10 lg:aspect-2/1">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="100vw"
          quality={80}
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-ink/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-page pb-10 text-paper md:pb-16">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="mt-3 heading-display">{hero.title}</h1>
            <Link href={hero.cta.href} className="btn btn-inverse mt-6 md:mt-8">
              {hero.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
