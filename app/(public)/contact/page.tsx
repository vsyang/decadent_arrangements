import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Clock, ArrowUpRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Decadent Arrangements",
  description: "Get in touch with us for bespoke charcuterie boards, event catering, and custom culinary gifts.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen max-w-full overflow-x-hidden bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors">
      <section className="mx-auto w-full max-w-7xl sm:px-6 py-8 md:py-20">

        <div className="mb-10 text-center md:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-[var(--color-honey)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Let&apos;s Connect
            </span>
          </div>

          <h1 className="mb-4 font-serif text-3xl font-extrabold text-[var(--color-primary)] sm:text-4xl md:text-6xl">
            Bring Your Vision to Life
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-muted-foreground)] md:text-lg">
            Have a custom event request, dietary questions, or want to collaborate on a special moment? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid w-full gap-8 lg:grid-cols-12 lg:items-center">

          <div className="relative w-full lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full max-w-full overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1000&auto=format&fit=crop"
                alt="Bespoke Charcuterie Arrangement"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl border border-white/20 bg-white/10 p-3 sm:p-5 backdrop-blur-md">
                <div className="flex items-center gap-3 text-white">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-white">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--color-honey-light)]">
                      Order Lead Time
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-stone-100">
                      24–48 hours advance booking recommended
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:col-span-7">

            {/* Email Card */}
            <a
              href="mailto:decadentarrangements2023@gmail.com"
              className="group relative w-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-bold text-[var(--color-primary)] sm:text-xl">
                      Direct Email
                    </h3>
                    <p className="mt-1 text-xs text-[var(--color-muted-foreground)] sm:text-sm">
                      For order inquiries and private events.
                    </p>

                    <p className="mt-2 text-xs font-semibold text-[var(--color-accent)] break-all sm:text-sm">
                      decadentarrangements2023@gmail.com
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--color-muted)]" />
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href="https://www.instagram.com/decadent_arrangements"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/30 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-honey-light)] text-[var(--color-honey)] transition-colors group-hover:bg-[var(--color-honey)] group-hover:text-white">
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
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-xl font-bold text-[var(--color-primary)]">
                      Instagram Gallery
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                      Follow our latest arrangements, daily creations, and DM us directly.
                    </p>
                    <p className="mt-3 font-semibold text-[var(--color-accent)] group-hover:underline">
                      @decadent_arrangements
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-accent)]" />
              </div>
            </a>

            {/* Service Area Card */}
            <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[var(--color-primary)]">
                    Local Service Area
                  </h3>
                  <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
                    Based in Denver, Colorado & surrounding Metro areas.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-12 md:mt-16 rounded-3xl border border-[var(--color-border)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] p-6 sm:p-8 text-center text-white shadow-xl md:p-12">
          <h2 className="font-serif text-2xl font-bold md:text-4xl">
            Ready to taste the art?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone-200 md:text-base">
            Select your items, customize dietary specifications, and schedule your delivery or pickup seamlessly.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/catalog"
              className="rounded-full bg-[var(--color-accent)] px-8 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:-translate-y-0.5"
            >
              Start Your Custom Order
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}