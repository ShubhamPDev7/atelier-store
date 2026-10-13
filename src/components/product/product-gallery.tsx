"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import type { ImageAsset } from "@/lib/catalog";

/**
 * Mobile/tablet: edge-to-edge swipeable carousel with position indicator.
 * Desktop (lg+): the same images stacked vertically at full column width.
 */
export function ProductGallery({ images }: { images: ImageAsset[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }

  function goTo(index: number) {
    const track = trackRef.current;
    track?.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="-mx-(--gutter) lg:mx-0">
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        aria-label="Product images"
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-(--grid-gap-x) lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <li
            key={image.src}
            className="relative aspect-product w-full shrink-0 snap-start media-well"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={index === 0}
              sizes="(min-width: 64rem) 60vw, 100vw"
              quality={80}
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 lg:hidden">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === active}
              onClick={() => goTo(index)}
              className="p-1.5"
            >
              <span
                className={`block h-px w-6 transition-colors ${index === active ? "bg-ink" : "bg-line"}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
