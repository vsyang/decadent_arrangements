// ** Just playing with some things here. 

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">
          Custom gifts • Sweet treats • Elegant arrangements
        </p>

        <h1 className="mb-6 text-5xl font-bold md:text-7xl text-primary">
          Decadent Arrangements
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-muted">
          Beautiful custom arrangements made for birthdays, celebrations,
          holidays, and special moments worth remembering.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/catalog"
            className="rounded-full bg-primary text-primary-foreground px-8 py-3 font-medium transition-opacity hover:opacity-90"
          >
            View Arrangements
          </Link>

          <Link
            href="/order"
            className="rounded-full border border-primary text-primary px-8 py-3 font-medium transition-colors hover:bg-primary/5"
          >
            Place an Order
          </Link>
        </div>
      </section>
    </main>
  );
}