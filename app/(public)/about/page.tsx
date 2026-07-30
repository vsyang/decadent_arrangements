// app/(public)/about/page.tsx

import "@/app/globals.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { cormorant, cursive, montserrat } from "@/app/ui/home/fonts";

import { Reveal } from "@/app/ui/helpers/Reveal";

export const metadata: Metadata = {
  title: "About Us | Decadent Arrangements",
  description:
    "Meet Jessica, the creative mind behind Decadent Arrangements and its custom arrangements and handcrafted grazing tables.",
};

export default function AboutPage() {
  return (
    <main
      className={`${montserrat.className} min-h-screen overflow-hidden bg-[#0a0a0a] text-white`}
    >
      {/* =====================================================
          CINEMATIC ABOUT HERO
      ====================================================== */}
      <section className="relative min-h-[560px] overflow-hidden bg-black text-white sm:min-h-[620px] lg:min-h-[680px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/videos/jessica-prep.mp4" type="video/mp4" />
        </video>

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-16 sm:min-h-[620px] sm:px-10 lg:min-h-[680px] lg:px-14">
          <div className="max-w-3xl">
            <div className="animate-cinematic-fade-up mb-7 flex items-center gap-4">
              <div className="h-px w-12 bg-[#00BCD4]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-white/75 sm:text-xs">
                The Story Behind the Arrangements
              </p>
            </div>

            <h1
              className={`${cormorant.className} animate-cinematic-fade-up animation-delay-200 text-5xl font-medium leading-[0.92] tracking-[-0.025em] text-white sm:text-6xl lg:text-[5.8rem]`}
            >
              Created with purpose.
              <span className="block">Designed with</span>
              <span
                className={`${cursive.className} animate-handwritten-reveal mt-2 block origin-left scale-x-[1.04] px-6 pb-4 text-6xl font-normal leading-[1.15] text-[#00BCD4] text-center sm:text-8xl lg:text-[7.5rem]`}
              >
                Heart.
              </span>
            </h1>

            <p className="animate-cinematic-fade-up animation-delay-600 mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              Decadent Arrangements was created from a love of beautiful
              presentation, thoughtful details, and bringing people together
              around unforgettable food.
            </p>
          </div>
        </div>
      </section>
      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="bg-[#f4f0ea] px-6 py-24 text-black sm:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="mb-6 text-xs font-medium uppercase tracking-[0.34em] text-[#006a78]">
                  Our Beginning
                </p>

                <h2
                  className={`${cormorant.className} text-5xl font-medium leading-[0.95] tracking-tight text-[#252525] sm:text-6xl`}
                >
                  What began with
                  <span className="block italic">a love of creating.</span>
                </h2>
              </div>

              <div className="space-y-6 text-base leading-8 text-[#545454] sm:text-lg lg:border-l lg:border-black/15 lg:pl-14">
                <p>
                  Decadent Arrangements began with Jessica&apos;s passion for
                  culinary creativity, thoughtful gift-giving, and making
                  ordinary gatherings feel extraordinary.
                </p>

                <p>
                  What started as handcrafted arrangements for family and
                  friends grew into a business centered around premium
                  ingredients, custom presentation, and meaningful celebration.
                </p>

                <p>
                  Every arrangement is designed to feel personal. From intimate
                  birthdays and anniversaries to larger gatherings and grazing
                  tables, each order is carefully prepared to reflect the moment
                  it was created for.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          JESSICA STORY
      ====================================================== */}
      <section className="grid overflow-hidden bg-[#161616] lg:grid-cols-2">
        {/* Jessica image */}
        <Reveal direction="right" className="h-full">
          <div className="relative min-h-[560px] lg:min-h-[780px]">
            <Image
              src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/business-owner1.webp"
              alt="Jessica, founder of Decadent Arrangements"
              fill
              className="object-cover object-top transition duration-[1400ms] hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 border-t border-white/30 pt-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                Founder and Creative Designer
              </p>

              <p className={`${cormorant.className} mt-2 text-3xl text-white`}>
                Jessica
              </p>
            </div>
          </div>
        </Reveal>

        {/* Jessica */}
        <Reveal direction="left" delay={350} className="h-full">
          <div className="flex h-full items-center px-8 py-20 sm:px-14 lg:px-20">
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                Meet the Founder
              </p>

              <h2
                className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-white sm:text-6xl`}
              >
                Creativity in every layer.
                <span className="block italic text-white/60">
                  Intention in every detail.
                </span>
              </h2>

              <div className="mt-8 space-y-5 text-base leading-8 text-white/60">
                <p>
                  Jessica personally designs and handcrafts each arrangement,
                  balancing flavor, color, texture, and presentation to create
                  something that feels truly one of a kind.
                </p>

                <p>
                  Her goal is not simply to prepare food, but to create an
                  experience—something that becomes part of the celebration and
                  remains memorable long after the gathering ends.
                </p>
              </div>

              <div className="mt-10 space-y-5 border-y border-white/15 py-7">
                <div className="flex items-center gap-4">
                  <Sparkles
                    className="h-5 w-5 shrink-0 text-[#00BCD4]"
                    strokeWidth={1.3}
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/80">
                      Premium Ingredients
                    </p>

                    <p className="mt-1 text-sm text-white/45">
                      Carefully selected for quality, flavor, and presentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Heart
                    className="h-5 w-5 shrink-0 text-[#00BCD4]"
                    strokeWidth={1.3}
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/80">
                      Personally Handcrafted
                    </p>

                    <p className="mt-1 text-sm text-white/45">
                      Every arrangement receives thoughtful, individual care.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin
                    className="h-5 w-5 shrink-0 text-[#00BCD4]"
                    strokeWidth={1.3}
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/80">
                      Designed in Denver
                    </p>

                    <p className="mt-1 text-sm text-white/45">
                      Locally created for celebrations throughout the community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          BRAND VALUES
      ====================================================== */}
      <section className="bg-[#f4f0ea] px-6 py-24 text-black sm:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#006a78]">
                What Guides Us
              </p>

              <h2
                className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-[#252525] sm:text-6xl`}
              >
                Elevated presentation.
                <span className="block italic">Meaningful experiences.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid border-y border-black/15 md:grid-cols-3">
            <Reveal delay={100} className="h-full">
              <div className="flex h-full min-h-72 flex-col justify-between border-b border-black/15 p-8 md:border-b-0 md:border-r">
                <Heart className="h-8 w-8 text-[#007C91]" strokeWidth={1.2} />

                <div className="mt-16">
                  <h3
                    className={`${cormorant.className} text-3xl text-[#252525]`}
                  >
                    Personal Care
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#545454]">
                    Each order is approached thoughtfully and tailored to the
                    occasion, preferences, and vision of the customer.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} className="h-full">
              <div className="flex h-full min-h-72 flex-col justify-between border-b border-black/15 p-8 md:border-b-0 md:border-r">
                <Sparkles
                  className="h-8 w-8 text-[#007C91]"
                  strokeWidth={1.2}
                />

                <div className="mt-16">
                  <h3
                    className={`${cormorant.className} text-3xl text-[#252525]`}
                  >
                    Thoughtful Design
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#545454]">
                    Flavor, color, structure, and presentation are intentionally
                    balanced to create a complete visual experience.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={500} className="h-full">
              <div className="flex h-full min-h-72 flex-col justify-between p-8">
                <ShieldCheck
                  className="h-8 w-8 text-[#007C91]"
                  strokeWidth={1.2}
                />

                <div className="mt-16">
                  <h3
                    className={`${cormorant.className} text-3xl text-[#252525]`}
                  >
                    Dependable Service
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#545454]">
                    Clear communication and careful preparation help make the
                    ordering experience feel smooth from beginning to delivery.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          FULL-WIDTH BRAND STATEMENT
      ====================================================== */}
      <section className="relative min-h-[620px] overflow-hidden bg-black">
        <Image
          src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l008.webp"
          alt="A handcrafted Decadent Arrangements grazing display"
          fill
          className="object-cover opacity-80"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/4 via-black/40 to-black/65" />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center justify-center px-6 py-24 text-center sm:px-10">
          <Reveal>
            <div className="max-w-4xl">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                The Decadent Difference
              </p>

              <h2
                className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-white sm:text-7xl`}
              >
                More than an arrangement.
                <span className="block italic text-white/65">
                  Part of the memory.
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-white/60 sm:text-base">
                Every creation is designed to bring beauty, flavor, and a
                thoughtful sense of occasion to the moments that matter most.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          CALL TO ACTION
      ====================================================== */}
      <section className="bg-[#0a0a0a] px-6 py-24 sm:px-10 lg:py-32">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-12 border-y border-white/15 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                Create with Us
              </p>

              <h2
                className={`${cormorant.className} max-w-3xl text-5xl font-medium leading-[0.95] text-white sm:text-6xl`}
              >
                Let&apos;s create something
                <span className="block italic text-white/60">
                  worthy of the moment.
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href="/catalog"
                className="group inline-flex min-w-60 items-center justify-center gap-4 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-black transition duration-300 hover:bg-[#00BCD4]"
              >
                Explore the Collection
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>

              <Link
                href="/orders/new"
                className="group inline-flex min-w-60 items-center justify-center gap-4 border border-white/60 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-black"
              >
                Start Your Order
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
