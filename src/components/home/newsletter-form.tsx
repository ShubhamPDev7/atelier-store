"use client";

import { useState } from "react";

// UI only: no subscription backend is wired up yet.
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p role="status" className="mt-8 text-body-lg">
        Thank you. You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      className="mt-8 flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Email address"
        className="h-12 w-full border sm:flex-1 border-line bg-paper px-4 text-body placeholder:text-muted focus:border-ink focus:outline-none"
      />
      <button type="submit" className="btn btn-primary">
        Subscribe
      </button>
    </form>
  );
}
