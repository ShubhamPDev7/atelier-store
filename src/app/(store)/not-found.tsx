import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section container-narrow text-center">
      <p className="eyebrow text-muted">Error 404</p>
      <h1 className="mt-4 heading-section">This page could not be found</h1>
      <p className="mt-4 text-muted">
        The piece or page you are looking for may have moved or is no longer available.
      </p>
      <Link href="/" className="btn btn-secondary mt-8">
        Return home
      </Link>
    </section>
  );
}
