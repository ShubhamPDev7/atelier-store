// Editorial storefront content (hero, merchandising tiles, story, services).
// Products and categories live in Postgres; read them through src/lib/catalog.ts.

import type { ImageAsset } from "@/lib/catalog";
import { unsplash } from "@/lib/unsplash";

export type EditorialTile = {
  slug: string;
  title: string;
  image: ImageAsset;
};

export const hero = {
  eyebrow: "Autumn – Winter 2026",
  title: "The Quiet Season",
  cta: { label: "Discover the collection", href: "/collections/autumn-winter" },
  image: {
    src: unsplash("1539109136881-3be0616acf4b", 2400),
    alt: "A woman in a pale blue coat standing in a cathedral square",
  },
};

export const departments: EditorialTile[] = [
  {
    slug: "women",
    title: "Women",
    image: {
      src: unsplash("1485968579580-b6d095142e6e"),
      alt: "A woman in a dark plaid coat walking down a city street",
    },
  },
  {
    slug: "men",
    title: "Men",
    image: {
      src: unsplash("1617137968427-85924c800a22"),
      alt: "A man in a tailored navy suit outside a glass building",
    },
  },
];

export const categories: EditorialTile[] = [
  {
    slug: "ready-to-wear",
    title: "Ready-to-Wear",
    image: {
      src: unsplash("1558769132-cb1aea458c5e", 1000),
      alt: "Neutral knitwear and blouses hanging on a rail",
    },
  },
  {
    slug: "outerwear",
    title: "Outerwear",
    image: {
      src: unsplash("1483985988355-763728e1935b", 1000),
      alt: "A woman in a burgundy coat and sunglasses carrying shopping bags",
    },
  },
  {
    slug: "bags",
    title: "Handbags",
    image: {
      src: unsplash("1524498250077-390f9e378fc0", 1000),
      alt: "A woman carrying a dark green leather tote with a striped strap",
    },
  },
  {
    slug: "leather",
    title: "Leather",
    image: {
      src: unsplash("1520975954732-35dd22299614", 1000),
      alt: "A man in a black leather jacket crouching on a rooftop ledge",
    },
  },
];

export const story = {
  eyebrow: "The Tailoring Edit",
  title: "Soft shoulders, sharp lines",
  body: "Unstructured jackets in brushed wool and camel cashmere, cut to move with you from morning meetings to late dinners.",
  cta: { label: "Explore tailoring", href: "/collections/tailoring" },
  image: {
    src: unsplash("1552374196-1ab2a1c593e8", 1800),
    alt: "A man in a camel blazer seated on a wooden stool",
  },
};

export const services = [
  {
    title: "Complimentary shipping",
    body: "Free express delivery on every order, with tracking from atelier to door.",
  },
  {
    title: "Returns within 30 days",
    body: "Changed your mind? Return or exchange any piece free of charge.",
  },
  {
    title: "Signature packaging",
    body: "Every order arrives wrapped and ready to give, with a handwritten note on request.",
  },
];
