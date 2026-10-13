import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  link?: { label: string; href: string };
};

export function SectionHeading({ eyebrow, title, link }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
      <div>
        {eyebrow && <p className="mb-3 eyebrow text-muted">{eyebrow}</p>}
        <h2 className="heading-section">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="btn btn-ghost shrink-0 decoration-transparent hover:decoration-current"
        >
          {link.label}
          <ArrowRightIcon />
        </Link>
      )}
    </div>
  );
}
