// app/page.tsx
import "@/app/globals.css";

import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import {
  ArrowRight,
  Gift,
  Heart,
  MapPin,
  PencilLine,
  Sparkles,
} from "lucide-react";
import { cormorant, cursive, montserrat } from "@/app/ui/home/fonts";
import {
  featuredArrangements,
  instagramImages,
  occasions,
} from "@/app/ui/home/homepage";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/app/ui/helpers/Reveal";

/* =========================================================
   HOMEPAGE
========================================================= */

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Logged-out users are sent to sign in first.
  const orderHref = session?.user?.id ? "/orders/new" : "/api/auth/signin";

  return (
    <main
      className={`${montserrat.className} min-h-screen overflow-hidden bg-[#0a0a0a] text-white`}
    >
      {/* =====================================================
          CINEMATIC HERO
      ====================================================== */}
      <section className="relative min-h-[780px] overflow-hidden bg-black lg:min-h-[calc(100vh-72px)]">
        {/* Hero */}
        <Image
          src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l009.webp"
          alt="Luxury custom grazing arrangement"
          fill
          priority
          loading="eager"
          className="animate-cinematic-image-reveal object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="relative z-10 mx-auto flex min-h-[780px] max-w-7xl items-center px-6 py-24 sm:px-10 lg:min-h-[calc(100vh-72px)] lg:px-14">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-4">
              <div className="h-px w-12 bg-[#00BCD4]" />

              <p className="animate-cinematic-fade-up text-[10px] font-medium uppercase tracking-[0.38em] text-white/75 sm:text-xs">
                Exclusive Charcuterie Arrangements
              </p>
            </div>

            {/* Main Head */}
            <h1
              className={`${cormorant.className} animate-cinematic-fade-up animation-delay-200 text-5xl font-medium leading-[0.92] tracking-[-0.025em] text-white sm:text-7xl lg:text-[6.6rem]`}
            >
              Curated for the
              <span className="block">moments worth</span>
              <span
                className={`${cursive.className} animate-handwritten-reveal mt-2 block origin-left scale-x-[1.04] px-6 pb-4 text-6xl font-normal leading-[1.15] text-[#00BCD4] text-center sm:text-8xl lg:text-[7.5rem]`}
              >
                Remembering.
              </span>
            </h1>

            <p className="animate-cinematic-fade-up animation-delay-600 mt-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              Custom grazing tables and handcrafted arrangements thoughtfully
              created in Denver for celebrations, gatherings, and meaningful
              moments.
            </p>

            {/* Hero buttons */}
            <div className="animate-cinematic-fade-up animation-delay-800 w-full mt-10 flex flex-col  gap-4 sm:flex-row">
              <Link
                href="/catalog"
                className="group inline-flex min-w-75 items-center justify-center gap-4 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-black transition duration-300 hover:bg-[#00BCD4]"
              >
                View the Collection
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>

              <Link
                href={orderHref}
                className="group inline-flex min-w-75 items-center justify-center gap-4 border border-white/70 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Start Your Order
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            {/* Business details */}
            <div className="mt-12 grid max-w-2xl gap-5 border-t border-white/20 pt-7 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Made with Care
                </p>

                <p className="mt-2 text-sm text-white/85">
                  Every detail matters
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Custom for You
                </p>

                <p className="mt-2 text-sm text-white/85">Designed your way</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Based in Denver
                </p>

                <p className="mt-2 text-sm text-white/85">
                  Locally handcrafted
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="bg-[#f4f0ea] px-6 py-24 text-black sm:px-10 lg:py-32">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.34em] text-[#007C91]">
                Decadent Arrangements
              </p>

              <h2
                className={`${cormorant.className} text-5xl font-medium leading-[0.95] tracking-tight text-[#252525] sm:text-6xl`}
              >
                Designed to be
                <span className="block italic">remembered.</span>
              </h2>
            </div>

            <div className="lg:border-l lg:border-black/15 lg:pl-14">
              <p className="max-w-2xl text-base leading-8 text-[#545454] sm:text-lg">
                Every arrangement is carefully designed to transform fresh
                ingredients, beautiful details, and thoughtful presentation into
                a centerpiece worthy of the occasion.
              </p>

              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-4 border-b border-black pb-2 text-xs font-semibold uppercase tracking-[0.17em] text-black transition hover:border-[#007C91] hover:text-[#007C91]"
              >
                Discover Our Story
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          FEATURED ARRANGEMENTS
      ====================================================== */}
      <section className="bg-[#0a0a0a] px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-col gap-8 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                  Featured Collection
                </p>

                <h2
                  className={`${cormorant.className} text-5xl font-medium leading-none text-white sm:text-6xl`}
                >
                  Our Most Loved Creations
                </h2>
              </div>

              <Link
                href="/catalog"
                className="group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
              >
                View All
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {featuredArrangements.map((arrangement, index) => (
              <Reveal key={arrangement.id} delay={index * 120}>
                <article
                  key={arrangement.id}
                  className="group relative min-h-[520px] overflow-hidden bg-black"
                >
                  {/* Product image */}
                  <Image
                    src={arrangement.image}
                    alt={arrangement.name}
                    fill
                    className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Image overlays */}
                  <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/5" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

                  {/* Product content */}
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#00BCD4]">
                      From {arrangement.price}
                    </p>

                    <h3
                      className={`${cormorant.className} text-3xl font-medium text-white`}
                    >
                      {arrangement.name}
                    </h3>

                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/65">
                      {arrangement.description}
                    </p>

                    <Link
                      href="/catalog"
                      className="mt-6 inline-flex items-center gap-3 border-b border-white/60 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                    >
                      View Arrangements
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          OCCASIONS
      ====================================================== */}
      <section className="relative overflow-hidden px-6 py-24 text-white sm:px-10 lg:py-32">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full scale-[1.30] object-cover object-center"
        >
          <source
            src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/movie/honey-on-cheese.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay so the text stays readable */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Foreground content */}
        <div className="relative z-10">
          <Reveal>
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 max-w-2xl">
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                  Perfect for Every Occasion
                </p>

                <h2
                  className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-white sm:text-6xl`}
                >
                  Made for life&apos;s
                  <span className="block italic text-white/70">
                    meaningful moments.
                  </span>
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {occasions.map((occasion, index) => {
                  const Icon = occasion.icon;

                  return (
                    <Reveal
                      key={occasion.name}
                      delay={index * 100}
                      className="h-full"
                    >
                      <div
                        className="
                          group flex min-h-44 h-full flex-col items-center justify-center gap-5
                          bg-black/20 p-6 text-center backdrop-blur-[2px]
                          transition duration-500 hover:bg-black/45
                        "
                      >
                        <Icon
                          className="h-8 w-8 text-[#00BCD4]"
                          strokeWidth={1.25}
                        />

                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                          {occasion.name}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="bg-black px-6 py-24 sm:px-10 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                  The Experience
                </p>

                <h2
                  className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-white sm:text-6xl`}
                >
                  Simple by design.
                  <span className="block italic text-white/60">
                    Exceptional in detail.
                  </span>
                </h2>
              </div>

              <div className="divide-y divide-white/15 border-y border-white/15">
                {/* Step 1 */}
                <Reveal delay={100}>
                  <div className="grid gap-6 py-8 sm:grid-cols-[70px_1fr]">
                    <span
                      className={`${cormorant.className} text-4xl italic text-[#00BCD4]`}
                    >
                      01
                    </span>

                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <Gift
                          className="h-5 w-5 text-white/60"
                          strokeWidth={1.25}
                        />

                        <h3
                          className={`${cormorant.className} text-3xl text-white`}
                        >
                          Choose
                        </h3>
                      </div>

                      <p className="max-w-xl text-sm leading-7 text-white/55">
                        Browse the collection and select the arrangement that
                        best reflects your celebration.
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Step 2 */}
                <Reveal delay={400}>
                  <div className="grid gap-6 py-8 sm:grid-cols-[70px_1fr]">
                    <span
                      className={`${cormorant.className} text-4xl italic text-[#00BCD4]`}
                    >
                      02
                    </span>

                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <PencilLine
                          className="h-5 w-5 text-white/60"
                          strokeWidth={1.25}
                        />

                        <h3
                          className={`${cormorant.className} text-3xl text-white`}
                        >
                          Personalize
                        </h3>
                      </div>

                      <p className="max-w-xl text-sm leading-7 text-white/55">
                        Select the size and share the thoughtful details that
                        will make your arrangement personal.
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Step 3 */}
                <Reveal delay={600}>
                  <div className="grid gap-6 py-8 sm:grid-cols-[70px_1fr]">
                    <span
                      className={`${cormorant.className} text-4xl italic text-[#00BCD4]`}
                    >
                      03
                    </span>

                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <Sparkles
                          className="h-5 w-5 text-white/60"
                          strokeWidth={1.25}
                        />

                        <h3
                          className={`${cormorant.className} text-3xl text-white`}
                        >
                          Celebrate
                        </h3>
                      </div>

                      <p className="max-w-xl text-sm leading-7 text-white/55">
                        Your arrangement is carefully handcrafted and prepared
                        for the moment it was created to celebrate.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          ABOUT JESSICA
      ====================================================== */}
      <section className="grid bg-[#161616] lg:grid-cols-2">
        {/* Jessica's photo */}
        <Reveal direction="right" className="h-full">
          <div className="relative min-h-[540px] lg:min-h-[760px]">
            <Image
              src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/jessica-prep.webp"
              alt="Jessica preparing a custom grazing arrangement"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* Jessica's story */}
        <Reveal direction="left" delay={350} className="h-full">
          <div className="flex items-center px-8 py-20 sm:px-14 lg:px-20">
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                Meet the Founder
              </p>

              <h2
                className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-white sm:text-6xl`}
              >
                A personal touch
                <span className="block italic text-white/60">
                  in every detail.
                </span>
              </h2>

              <p className="mt-8 text-base leading-8 text-white/60">
                Jessica custom designs and handcrafts every arrangement to bring
                people together, create meaningful memories, and make each
                celebration feel beautifully personal.
              </p>

              <div className="mt-10 space-y-5 border-y border-white/15 py-7">
                <div className="flex items-center gap-4">
                  <Sparkles
                    className="h-5 w-5 text-[#00BCD4]"
                    strokeWidth={1.3}
                  />

                  <p className="text-sm uppercase tracking-[0.12em] text-white/75">
                    Premium ingredients
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Heart className="h-5 w-5 text-[#00BCD4]" strokeWidth={1.3} />

                  <p className="text-sm uppercase tracking-[0.12em] text-white/75">
                    Handcrafted with care
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin
                    className="h-5 w-5 text-[#00BCD4]"
                    strokeWidth={1.3}
                  />

                  <p className="text-sm uppercase tracking-[0.12em] text-white/75">
                    Designed in Denver
                  </p>
                </div>
              </div>

              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-4 border-b border-white pb-2 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:border-[#00BCD4] hover:text-[#00BCD4]"
              >
                Read Jessica&apos;s Story
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          INSTAGRAM
      ====================================================== */}
      <section className="bg-[#f4f0ea] px-6 py-24 text-black sm:px-10 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#007C91]">
                  Follow Our Journey
                </p>

                <h2
                  className={`${cormorant.className} text-4xl font-medium text-[#252525] sm:text-5xl`}
                >
                  @decadent_arrangements
                </h2>
              </div>

              <a
                href="https://www.instagram.com/decadent_arrangements"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 border-b border-black pb-2 text-xs font-semibold uppercase tracking-[0.17em] transition hover:border-[#007C91] hover:text-[#007C91]"
              >
                Follow on Instagram
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {instagramImages.map((image, index) => (
                <Reveal key={image} delay={index * 150} className="h-full">
                  <a
                    href="https://www.instagram.com/decadent_arrangements"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block h-full aspect-[4/5] overflow-hidden bg-black"
                  >
                    <Image
                      src={image}
                      alt={`Decadent Arrangements creation ${index + 1}`}
                      fill
                      className="object-cover transition duration-[1000ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />

                    <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/25" />

                    <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 text-white transition duration-500 group-hover:translate-y-0">
                      <p className="text-[9px] uppercase tracking-[0.2em]">
                        View on Instagram
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          FINAL CALL TO ACTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 lg:py-32">
        <Image
          src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l010.webp"
          alt=""
          fill
          className="object-cover opacity-70"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/65" />

        <Reveal>
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
              Begin Your Order
            </p>

            <Reveal>
              <h2
                className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-white sm:text-7xl`}
              >
                Create something
                <span className="block italic text-white/65">
                  unforgettable.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Share the details of your celebration and begin creating an
                arrangement designed especially for the moment.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <Link
                href={orderHref}
                className="group mt-10 inline-flex items-center justify-center gap-4 bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:bg-[#00BCD4]"
              >
                Start Your Order
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
