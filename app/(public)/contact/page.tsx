// app/(public)/contact/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
};

// Contact Us page component.
export default function ContactPage() {
  return (
    // Main page container.
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            Let&apos;s Connect
          </p>

          <h1 className="mb-5 text-4xl font-bold text-primary md:text-6xl">
            Contact Us
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted">
            Have a question or want to learn more about a custom arrangement?
            Please feel free to reach out to us using one of the options below.
          </p>
        </div>

        {/* Contact information cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {/* Email card */}
          <a
            href="mailto:decadentarrangements2023@gmail.com"
            className="group rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Mail className="h-6 w-6" />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-primary">Email</h2>

            <p className="break-words text-sm text-muted group-hover:text-accent">
              decadentarrangements2023@gmail.com
            </p>
          </a>

          {/* Instagram card */}
          <a
            href="https://www.instagram.com/decadent_arrangements"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="5" ry="5" />

                <circle cx="12" cy="12" r="4" />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="0.5"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>

            <h2 className="mb-2 text-xl font-semibold text-primary">
              Instagram
            </h2>

            <p className="text-sm text-muted group-hover:text-accent">
              @decadent_arrangements
            </p>
          </a>

          {/* Service area card */}
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <MapPin className="h-6 w-6" />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-primary">
              Service Area
            </h2>
            <p className="text-sm text-muted">Based in Denver, Colorado</p>
          </div>
        </div>

        {/* Call-to-action section underneath the contact cards. */}
        <div className="mt-14 text-center">
          <p className="mb-5 text-muted">
            Ready to begin planning your arrangement?
          </p>

          {/* Links the visitor to the order page. */}
          <Link
            href="/order"
            className="inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Start an Order
          </Link>
        </div>
      </section>
    </main>
  );
}
