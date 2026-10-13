// Sample catalog loaded by `npm run db:seed`. Array order is newest first: the seed
// staggers created_at so "New Arrivals" (newest 8) matches the original selection.

import { unsplash, unsplashDetail } from "@/lib/unsplash";
import type { ImageAsset } from "@/db/schema";

export type SeedCategory = { slug: string; name: string };

export type SeedProduct = {
  slug: string;
  name: string;
  /** Category slug. */
  category: string;
  price: number;
  stock: number;
  images: [ImageAsset, ...ImageAsset[]];
  description: string;
  details: string[];
  badge?: string;
};

export const seedCategories: SeedCategory[] = [
  { slug: "ready-to-wear", name: "Ready-to-wear" },
  { slug: "bags", name: "Handbags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "jewelry", name: "Jewelry" },
  { slug: "eyewear", name: "Eyewear" },
  { slug: "small-leather-goods", name: "Small leather goods" },
];

export const seedProducts: SeedProduct[] = [
  {
    slug: "woven-leather-tote",
    name: "Woven Leather Tote",
    category: "bags",
    price: 248000,
    stock: 6,
    badge: "New",
    images: [
      {
        src: unsplash("1598532163257-ae3c6b2524b6", 1400),
        alt: "Cognac woven leather tote with a gold chain strap",
      },
      {
        src: unsplashDetail("1598532163257-ae3c6b2524b6", 0.45, 0.55),
        alt: "Close-up of the hand-woven leather and gold chain",
      },
    ],
    description:
      "A soft, slouchy tote hand-woven from wide strips of cognac calfskin. A gold-tone chain strap sits over the shoulder, and the unlined body folds flat when empty.",
    details: [
      "Hand-woven calfskin leather",
      "Gold-tone chain shoulder strap",
      "Magnetic top closure, one interior zip pocket",
      "W 40 × H 28 × D 12 cm; strap drop 22 cm",
      "Made in Italy",
    ],
  },
  {
    slug: "satin-bomber-jacket",
    name: "Satin Bomber Jacket",
    category: "ready-to-wear",
    price: 365000,
    stock: 2,
    images: [
      {
        src: unsplash("1591047139829-d91aecb6caea", 1400),
        alt: "Terracotta satin bomber jacket on a hanger",
      },
      {
        src: unsplashDetail("1591047139829-d91aecb6caea", 0.4, 0.75),
        alt: "Close-up of the welt pocket and ribbed hem",
      },
    ],
    description:
      "A relaxed bomber in fluid satin with a soft sheen, dyed a warm terracotta. Ribbed trims at the collar, cuffs and hem keep the silhouette clean, with a utility pocket on the sleeve.",
    details: [
      "Shell 100% recycled polyamide satin; lining 100% cupro",
      "Two-way front zip, ribbed collar, cuffs and hem",
      "Side welt pockets and one interior pocket",
      "Relaxed fit — take your usual size",
      "Dry clean only",
    ],
  },
  {
    slug: "structured-satchel",
    name: "Structured Satchel",
    category: "bags",
    price: 312000,
    stock: 12,
    badge: "New",
    images: [
      {
        src: unsplash("1594223274512-ad4803739b7c", 1400),
        alt: "Teal leather satchel with a gold clasp",
      },
      {
        src: unsplashDetail("1594223274512-ad4803739b7c", 0.6, 0.65),
        alt: "Close-up of the pebbled leather and gold push-lock",
      },
    ],
    description:
      "An architectural satchel in pebbled calfskin, dyed a deep lagoon teal. A single top handle and detachable strap allow it to be carried by hand or worn across the body.",
    details: [
      "Pebbled calfskin leather",
      "Gold-finish push-lock closure",
      "Detachable, adjustable shoulder strap",
      "Suede-lined interior with card slots",
      "W 28 × H 20 × D 11 cm",
    ],
  },
  {
    slug: "silk-jogger",
    name: "Silk Jogger",
    category: "ready-to-wear",
    price: 128000,
    stock: 0,
    images: [
      {
        src: unsplash("1594633312681-425c7b97ccd1", 1400),
        alt: "Blush silk trousers with cuffed ankles",
      },
      {
        src: unsplashDetail("1594633312681-425c7b97ccd1", 0.5, 0.8),
        alt: "Close-up of the gathered ankle cuffs",
      },
    ],
    description:
      "Fluid sand-washed silk shaped into an easy jogger. Gathered cuffs and patch pockets give an off-duty ease that dresses up with a heel or down with a loafer.",
    details: [
      "100% sand-washed silk",
      "Elasticated waist with internal drawcord",
      "Front patch pockets, gathered ankle cuffs",
      "Model is 177 cm and wears size S",
      "Dry clean only",
    ],
  },
  {
    slug: "suede-derby",
    name: "Suede Derby",
    category: "shoes",
    price: 98000,
    stock: 3,
    images: [
      {
        src: unsplash("1560343090-f0409e92791a", 1400),
        alt: "Green suede brogue derby shoe",
      },
      {
        src: unsplashDetail("1560343090-f0409e92791a", 0.55, 0.55),
        alt: "Close-up of the brogue perforations on the toe",
      },
    ],
    description:
      "A brogue derby in velvety sage suede, built on a softly rounded last. A leather sole with a rubber heel insert keeps it grounded for everyday wear.",
    details: [
      "Calf suede upper, leather lining",
      "Leather sole with rubber heel insert",
      "Blake-stitched construction",
      "True to size",
      "Made in Portugal",
    ],
  },
  {
    slug: "crochet-poncho",
    name: "Crochet Poncho",
    category: "ready-to-wear",
    price: 156000,
    stock: 1,
    badge: "Limited",
    images: [
      {
        src: unsplash("1434389677669-e08b4cac3105", 1400),
        alt: "Cream crochet poncho with fringe on a hanger",
      },
      {
        src: unsplashDetail("1434389677669-e08b4cac3105", 0.5, 0.5),
        alt: "Close-up of the open crochet stitch",
      },
    ],
    description:
      "Hand-crocheted in ecru cotton with an open, airy stitch and a long fringed hem. Made in a limited run by a small workshop of artisans.",
    details: [
      "100% organic cotton",
      "Hand-crocheted; each piece varies slightly",
      "V-neck with fringed hem",
      "One size",
      "Hand wash cold, dry flat",
    ],
  },
  {
    slug: "pebbled-mini-satchel",
    name: "Pebbled Mini Satchel",
    category: "bags",
    price: 215000,
    stock: 9,
    images: [
      {
        src: unsplash("1605733513597-a8f8341084e6", 1400),
        alt: "Dove grey pebbled leather mini satchel with gold buckles",
      },
      {
        src: unsplashDetail("1605733513597-a8f8341084e6", 0.6, 0.55),
        alt: "Close-up of the pebbled grain and gold buckle strap",
      },
    ],
    description:
      "A compact satchel in dove grey pebbled calfskin, with twin buckle straps over a flap front. Carry it by the top handle or clip on the strap to wear it crossbody.",
    details: [
      "Pebbled calfskin leather",
      "Twin buckle straps with gold-tone hardware",
      "Top handle and detachable crossbody strap",
      "W 22 × H 16 × D 8 cm",
      "Made in Italy",
    ],
  },
  {
    slug: "essential-cotton-tee",
    name: "Essential Cotton Tee",
    category: "ready-to-wear",
    price: 49000,
    stock: 40,
    images: [
      {
        src: unsplash("1521572163474-6864f9cf17ab", 1400),
        alt: "Plain white cotton t-shirt",
      },
      {
        src: unsplashDetail("1521572163474-6864f9cf17ab", 0.5, 0.2),
        alt: "Close-up of the ribbed crew neckline",
      },
    ],
    description:
      "The white tee, refined. Long-staple cotton jersey with a dense, smooth hand and a narrow ribbed neckline that keeps its shape wash after wash.",
    details: [
      "100% long-staple cotton jersey",
      "Ribbed crew neckline",
      "Regular fit",
      "Machine wash cold",
      "Made in Portugal",
    ],
  },
  {
    slug: "floral-satin-pump",
    name: "Floral Satin Pump",
    category: "shoes",
    price: 112000,
    stock: 0,
    images: [
      {
        src: unsplash("1543163521-1bf539c55dd2", 1400),
        alt: "Floral satin stiletto pumps",
      },
      {
        src: unsplashDetail("1543163521-1bf539c55dd2", 0.45, 0.6),
        alt: "Close-up of the floral print on satin",
      },
    ],
    description:
      "A pointed stiletto pump in printed duchess satin, with a botanical motif in cobalt, rose and leaf green. A cushioned insole makes the 100 mm heel easier to wear.",
    details: [
      "Duchess satin upper, leather lining",
      "100 mm stiletto heel",
      "Leather sole",
      "Runs small — consider half a size up",
      "Made in Italy",
    ],
  },
  {
    slug: "sculpted-hoop-earrings",
    name: "Sculpted Hoop Earrings",
    category: "jewelry",
    price: 72000,
    stock: 15,
    images: [
      {
        src: unsplash("1617038220319-276d3cfab638", 1400),
        alt: "Gold sculpted hoop earrings",
      },
      {
        src: unsplashDetail("1617038220319-276d3cfab638", 0.55, 0.6),
        alt: "Close-up of the twisted gold hoop",
      },
    ],
    description:
      "Chunky twisted hoops in recycled gold vermeil, light enough for all-day wear. A hinged clasp closes securely and sits flush against the lobe.",
    details: [
      "18k gold vermeil on recycled sterling silver",
      "Hinged snap closure",
      "Diameter 2.4 cm",
      "Sold as a pair",
      "Avoid contact with water and perfume",
    ],
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    category: "eyewear",
    price: 54000,
    stock: 7,
    images: [
      {
        src: unsplash("1511499767150-a48a237f0083", 1400),
        alt: "Round gold-frame sunglasses with green lenses",
      },
      {
        src: unsplashDetail("1511499767150-a48a237f0083", 0.5, 0.45),
        alt: "Close-up of the bridge and bottle-green lenses",
      },
    ],
    description:
      "A fine round frame in brushed gold titanium with bottle-green mineral lenses. Adjustable nose pads and spring hinges give a light, secure fit.",
    details: [
      "Titanium frame, mineral glass lenses",
      "100% UVA/UVB protection",
      "Adjustable nose pads, spring hinges",
      "Lens width 49 mm",
      "Includes leather case and cloth",
    ],
  },
  {
    slug: "leather-bifold-wallet",
    name: "Leather Bifold Wallet",
    category: "small-leather-goods",
    price: 46000,
    stock: 20,
    images: [
      {
        src: unsplash("1627123424574-724758594e93", 1400),
        alt: "Brown leather bifold wallet",
      },
      {
        src: unsplashDetail("1627123424574-724758594e93", 0.55, 0.5),
        alt: "Close-up of the burnished leather grain",
      },
    ],
    description:
      "A slim bifold in vegetable-tanned leather that darkens and softens with use. Hand-burnished edges and a minimal layout keep it thin in a pocket.",
    details: [
      "Vegetable-tanned cowhide",
      "Six card slots, one note compartment",
      "Hand-burnished edges",
      "W 11 × H 9 cm closed",
      "Made in Spain",
    ],
  },
  {
    slug: "polished-lace-up",
    name: "Polished Lace-Up",
    category: "shoes",
    price: 104000,
    stock: 2,
    images: [
      {
        src: unsplash("1614252235316-8c857d38b5f4", 1400),
        alt: "Close-up of a brown polished leather lace-up shoe",
      },
      {
        src: unsplashDetail("1614252235316-8c857d38b5f4", 0.6, 0.6),
        alt: "Close-up of the textured leather vamp",
      },
    ],
    description:
      "A classic lace-up in hand-polished chestnut calfskin with a subtly textured vamp. Goodyear-welted so it can be resoled for years to come.",
    details: [
      "Hand-polished calfskin upper",
      "Goodyear-welted leather sole",
      "Leather lining and insole",
      "True to size",
      "Made in England",
    ],
  },
];
