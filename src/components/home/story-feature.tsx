import Image from "next/image";
import Link from "next/link";

import { story } from "@/data/catalog";

export function StoryFeature() {
  return (
    <section className="grid bg-surface lg:grid-cols-2">
      <div className="relative aspect-portrait md:aspect-4/3 lg:aspect-auto lg:min-h-[44rem]">
        <Image
          src={story.image.src}
          alt={story.image.alt}
          fill
          sizes="(min-width: 64rem) 50vw, 100vw"
          quality={80}
          className="object-cover object-[50%_15%]"
        />
      </div>
      <div className="flex items-center px-(--gutter) py-14 md:py-20 lg:px-16 xl:px-24">
        <div className="max-w-md">
          <p className="eyebrow text-muted">{story.eyebrow}</p>
          <h2 className="mt-4 heading-display">{story.title}</h2>
          <p className="mt-6 text-body-lg text-muted">{story.body}</p>
          <Link href={story.cta.href} className="btn btn-secondary mt-8">
            {story.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
