import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Award, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Decadent Arrangements",
  description: "Meet Vanessa Yang, the creative mind behind Decadent Arrangements, crafting artisanal charcuterie and bespoke culinary gifts.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen max-w-full overflow-x-hidden bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-20">

        <div className="mb-12 text-center md:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-[var(--color-honey)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Our Story & Passion
            </span>
          </div>

          <h1 className="mb-4 font-serif text-4xl font-extrabold text-[var(--color-primary)] sm:text-5xl md:text-6xl">
            About Decadent Arrangements
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-muted-foreground)] md:text-lg">
            Thoughtfully designed arrangements created to transform birthdays, celebrations, holidays, and spontaneous moments into delicious, unforgettable memories.
          </p>
        </div>

        <div className="grid w-full items-center gap-12 lg:grid-cols-12">

          <div className="relative w-full lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[var(--color-accent)] via-[var(--color-honey)] to-[var(--color-secondary)] opacity-30 blur-lg" />

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
                <Image
                  src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/business-owner1.webp"
                  alt="Vanessa Yang, Founder of Decadent Arrangements"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover object-top filter contrast-[1.02] transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col lg:col-span-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Meet the Artist
            </p>

            <h2 className="mb-6 font-serif text-3xl font-extrabold text-[var(--color-primary)] sm:text-4xl">
              Crafting Edible Works of Art
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-[var(--color-muted-foreground)]">
              <p>
                Decadent Arrangements was born out of a genuine passion for culinary creativity, artisanal flavors, and the joy of elevated gift-giving. What started as handcrafted treats for family and friends evolved into a dedicated catering experience designed to bring people together.
              </p>

              <p>
                Every board, box, and arrangement is curated by hand using high-quality cheeses, premium cured meats, seasonal fruits, and sweet delicacies. From intimate anniversaries and milestone birthdays to grand corporate events, each order receives meticulous attention to detail.
              </p>

              <p>
                Our mission goes beyond serving food—we aim to deliver an authentic visual and gastronomic surprise that leaves a lasting impression on you and your guests.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-4">
                <Heart className="mb-2 h-5 w-5 text-[var(--color-accent)]" />
                <h3 className="font-serif text-sm font-bold text-[var(--color-primary)]">Handmade Care</h3>
                <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">Tailored meticulously to your event specifications.</p>
              </div>

              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-4">
                <Award className="mb-2 h-5 w-5 text-[var(--color-honey)]" />
                <h3 className="font-serif text-sm font-bold text-[var(--color-primary)]">Fresh Ingredients</h3>
                <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">Selected daily for maximum flavor and presentation.</p>
              </div>

              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-4">
                <ShieldCheck className="mb-2 h-5 w-5 text-[var(--color-secondary)]" />
                <h3 className="font-serif text-sm font-bold text-[var(--color-primary)]">Seamless Service</h3>
                <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">Reliable order tracking and delivery scheduling.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/catalog"
                className="rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-center font-medium text-[var(--color-primary-foreground)] shadow-md transition-all duration-300 hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:-translate-y-0.5"
              >
                Explore Catalog
              </Link>

              <Link
                href="/orders/new"
                className="rounded-full border-2 border-[var(--color-accent)] px-8 py-3.5 text-center font-medium text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white hover:shadow-md hover:-translate-y-0.5"
              >
                Place Custom Order
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}