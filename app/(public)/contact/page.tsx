import "@/app/globals.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";

import { cormorant, montserrat } from "@/app/ui/home/fonts";
import { Reveal } from "@/app/ui/helpers/Reveal";

export const metadata: Metadata = {
  title: "Contact Us | Decadent Arrangements",
  description:
    "Get in touch with Decadent Arrangements for custom charcuterie, event catering, and handcrafted culinary gifts.",
};

export default function ContactPage() {
  return (
    <main
      className={`${montserrat.className} min-h-screen overflow-hidden bg-[#0a0a0a] text-white`}
    >
      {/* =====================================================
          CONTACT HERO
      ====================================================== */}
      <section className="relative min-h-[560px] overflow-hidden bg-black text-white sm:min-h-[620px] lg:min-h-[680px]">
        <Image
          src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l003.webp"
          alt="A handcrafted Decadent Arrangements display"
          fill
          priority
          className="animate-cinematic-image-reveal object-cover object-center"
          sizes="100vw"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/60" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-16 sm:min-h-[620px] sm:px-10 lg:min-h-[680px] lg:px-14">
          <div className="max-w-4xl">
            <div className="animate-cinematic-fade-up mb-7 flex items-center gap-4">
              <div className="h-px w-12 bg-[#00BCD4]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-white/70 sm:text-xs">
                Let&apos;s Connect
              </p>
            </div>

            <h1
              className={`${cormorant.className} animate-cinematic-fade-up animation-delay-200 text-5xl font-medium leading-[0.92] tracking-[-0.025em] text-white sm:text-7xl lg:text-[6.5rem]`}
            >
              Bring your vision
              <span className="block italic text-white/65">to life.</span>
            </h1>

            <p className="animate-cinematic-fade-up animation-delay-600 mt-8 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              Have a custom event request, dietary question, or special
              celebration in mind? Reach out and let&apos;s begin creating
              something memorable.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT METHODS
      ====================================================== */}
      <section className="bg-[#f4f0ea] px-6 py-20 text-black sm:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-14 grid gap-10 border-b border-black/15 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#007C91]">
                  Get in Touch
                </p>

                <h2
                  className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-[#252525] sm:text-6xl`}
                >
                  Start the
                  <span className="block italic text-[#807973]">
                    conversation.
                  </span>
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-[#545454] sm:text-base">
                Share your event details, guest count, preferences, and any
                special requests. We&apos;ll help guide you toward the right
                arrangement.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px bg-black/20 lg:grid-cols-3">
            {/* Email */}
            <Reveal delay={100} className="h-full">
              <a
                href="mailto:decadentarrangements2023@gmail.com"
                className="group flex h-full min-h-72 flex-col bg-[#f4f0ea] p-8 transition duration-500 hover:bg-[#ebe5de]"
              >
                <div className="flex items-start justify-between gap-6">
                  <Mail className="h-8 w-8 text-[#007C91]" strokeWidth={1.25} />
                </div>

                <div className="mt-16">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#807973]">
                    Direct Email
                  </p>

                  <h3
                    className={`${cormorant.className} text-3xl font-medium text-[#252525]`}
                  >
                    Send an Inquiry
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#545454]">
                    Reach out regarding custom orders, private events, dietary
                    needs, or general questions.
                  </p>

                  <p className="mt-6 break-all text-xs font-semibold tracking-wide text-[#007C91]">
                    decadentarrangements2023@gmail.com
                  </p>
                </div>
              </a>
            </Reveal>

            {/* Instagram */}
            <Reveal delay={300} className="h-full">
              <a
                href="https://www.instagram.com/decadent_arrangements"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-72 flex-col bg-[#f4f0ea] p-8 transition duration-500 hover:bg-[#ebe5de]"
              >
                <div className="flex items-start justify-between gap-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-[#007C91]"
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

                <div className="mt-16">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#807973]">
                    Instagram
                  </p>

                  <h3
                    className={`${cormorant.className} text-3xl font-medium text-[#252525]`}
                  >
                    Follow the Creations
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#545454]">
                    View recent arrangements, follow daily creations, and send a
                    direct message.
                  </p>

                  <p className="mt-6 text-xs font-semibold tracking-wide text-[#007C91]">
                    @decadent_arrangements
                  </p>
                </div>
              </a>
            </Reveal>

            {/* Service Area */}
            <Reveal delay={500} className="h-full">
              <div className="flex h-full min-h-72 flex-col bg-[#f4f0ea] p-8">
                <div className="flex items-start justify-between gap-6">
                  <MapPin
                    className="h-8 w-8 text-[#007C91]"
                    strokeWidth={1.25}
                  />

                  <div className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="mt-16">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#807973]">
                    Service Area
                  </p>

                  <h3
                    className={`${cormorant.className} text-3xl font-medium text-[#252525]`}
                  >
                    Denver, Colorado
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#545454]">
                    Locally based and serving Denver and surrounding metro
                    communities.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          ORDER DETAILS
      ====================================================== */}
      <section className="grid bg-[#161616] lg:grid-cols-2">
        {/* Image */}
        <Reveal direction="right" className="h-full">
          <div className="relative min-h-[500px] lg:min-h-[680px]">
            <Image
              src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/small/s006.webp"
              alt="Custom charcuterie arrangement"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* Information */}
        <Reveal direction="left" delay={300} className="h-full">
          <div className="flex h-full items-center px-8 py-20 sm:px-14 lg:px-20">
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                Before You Order
              </p>

              <h2
                className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-white sm:text-6xl`}
              >
                Thoughtful preparation
                <span className="block italic text-white/55">takes time.</span>
              </h2>

              <p className="mt-8 text-base leading-8 text-white/60">
                Each arrangement is carefully planned, sourced, and handcrafted
                for your event. Advance notice helps ensure the best possible
                experience.
              </p>

              <div className="mt-10 border-y border-white/15 py-7">
                <div className="flex items-start gap-5">
                  <Clock
                    className="mt-1 h-6 w-6 shrink-0 text-[#00BCD4]"
                    strokeWidth={1.3}
                  />

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                      Order Lead Time
                    </p>

                    <p className="mt-3 text-sm leading-7 text-white/50">
                      Orders should be placed at least 10 days before your
                      requested event date.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/catalog"
                className="group mt-9 inline-flex items-center gap-4 border-b border-white pb-2 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:border-[#00BCD4] hover:text-[#00BCD4]"
              >
                Explore the Collection
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 lg:py-32">
        <Image
          src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l004.webp"
          alt=""
          fill
          className="scale-[1.10] object-cover opacity-45"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
              Begin Your Order
            </p>

            <h2
              className={`${cormorant.className} text-5xl font-medium leading-[0.95] text-white sm:text-7xl`}
            >
              Ready to create
              <span className="block italic text-white/60">
                something memorable?
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              Browse the collection, select your arrangement, and share the
              details that will make it personal.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <Link
              href="/catalog"
              className="group mt-10 inline-flex items-center justify-center gap-4 bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:bg-[#00BCD4]"
            >
              Start Your Custom Order
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
