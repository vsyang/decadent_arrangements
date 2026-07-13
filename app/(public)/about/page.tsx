// app/(public)/about/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            Our Story
          </p>

          <h1 className="mb-5 text-4xl font-bold text-primary md:text-6xl">
            About Decadent Arrangements
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted">
            Thoughtfully designed arrangements created to make birthdays,
            holidays, celebrations, and special moments even more memorable.
          </p>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-primary/10">
            <Image
              src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/coming-soon.webp"
              alt="Jessica, owner of Decadent Arrangements"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">
              Meet the Owner
            </p>

            <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
              Creativity Made Personal
            </h2>

            <div className="space-y-5 leading-7 text-muted">
              <p>
                Decadent Arrangements was created from a love of creativity,
                delicious treats, and thoughtful gift-giving.
              </p>

              <p>
                Each arrangement is carefully designed to reflect the occasion
                and the person receiving it. From birthdays and anniversaries to
                holidays and meaningful surprises, every order is made with care
                and attention to detail.
              </p>

              <p>
                Our goal is to create something beautiful, memorable, and unique
                for every customer.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/catalog"
                className="rounded-full bg-primary px-8 py-3 text-center font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                View Arrangements
              </Link>

              <Link
                href="/order"
                className="rounded-full border border-primary px-8 py-3 text-center font-medium text-primary transition-colors hover:bg-primary/5"
              >
                Place an Order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
