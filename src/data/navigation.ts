export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "New In", href: "/collections/new-in" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Handbags", href: "/collections/bags" },
  { label: "Shoes", href: "/collections/shoes" },
  { label: "Jewelry", href: "/collections/jewelry" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Client Services",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns & exchanges", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of sale", href: "/terms" },
      { label: "Cookie settings", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];
