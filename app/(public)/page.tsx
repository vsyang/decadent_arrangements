// app/page.tsx

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

// Homepage products.
const featuredArrangements = [
  {
    id: 1,
    name: "Charcuterie Bouquet",
    description: "Sweet, beautiful, and elegant",
    price: "$675",
    image:
      "https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/small/s005.webp",
  },
  {
    id: 2,
    name: "Family Day Indulgence",
    description: "Rich, indulgent, and unforgettable",
    price: "$800",
    image:
      "https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/medium/m012.webp",
  },
  {
    id: 3,
    name: "Bahn Mi Night",
    description: "Cheerful, exciting, and delicious",
    price: "$675",
    image:
      "https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/small/s004.webp",
  },
  {
    id: 4,
    name: "Spooktacular",
    description: "Luxurious, elegant, and bold",
    price: "$1050",
    image:
      "https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l001.webp",
  },
];

// Occasions displayed on the homepage.
const occasions = [
  {
    name: "Birthdays",
    icon: "🎂",
  },
  {
    name: "Anniversaries",
    icon: "♡",
  },
  {
    name: "Graduations",
    icon: "🎓",
  },
  {
    name: "Holidays",
    icon: "✦",
  },
  {
    name: "Thank You",
    icon: "🎁",
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Send users to the sign-in page when they are not logged in. Logged-in users can go directly to the order form.
  const orderHref = session?.user?.id ? "/orders/new" : "/api/auth/signin";

  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#00BCD4]/10">
        {/* Decorative background circle */}
        <div className="absolute -right-32 top-20 h-[550px] w-[550px] rounded-full bg-[#00BCD4]/10 blur-sm" />

        {/* Decorative blurred shape */}
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#807973]/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
          {/* Hero text */}
          <div className="text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#807973] sm:text-sm">
              Custom gifts • Sweet treats • Elegant arrangements
            </p>

            <h1 className="mb-6 text-5xl font-semibold leading-[1.05] text-[#545454] sm:text-6xl lg:text-7xl">
              Thoughtful Gifts
              <span className="block">Made for Every</span>
              <span
                className={`${greatVibes.className} mt-2 block origin-center scale-x-185 text-[#007C91] text-6xl sm:text-7xl lg:text-8xl`}
              >
                Celebration
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-[#545454]/80 sm:text-lg lg:mx-0">
              Beautiful, handcrafted arrangements made with premium treats and a
              personal touch for birthdays, holidays, and every special moment.
            </p>

            {/* Hero buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/catalog"
                className="inline-flex min-w-52 items-center justify-center rounded-full bg-[#007C91] px-8 py-4 font-semibold text-white shadow-lg shadow-[#00BCD4]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#006778]"
              >
                Browse Arrangements
                <span className="ml-2">→</span>
              </Link>

              <Link
                href={orderHref}
                className="inline-flex min-w-52 items-center justify-center rounded-full border-2 border-[#545454] bg-white px-8 py-4 font-semibold text-[#545454] transition duration-300 hover:-translate-y-1 hover:border-[#007C91] hover:text-[#007C91]"
              >
                Start Your Order
              </Link>
            </div>

            {/* Small business highlights */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-[#545454] lg:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-lg text-[#007C91]">♡</span>
                <span>Made with care</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-[#007C91]">🎁</span>
                <span>Custom for you</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg text-[#007C91]">✦</span>
                <span>Made for every occasion</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="absolute h-[420px] w-[420px] rounded-full bg-[#00BCD4]/10 sm:h-[500px] sm:w-[500px]" />

            {/* Decorative sparkles */}
            <span className="absolute left-2 top-20 text-3xl text-[#007C91]">
              ✦
            </span>

            <span className="absolute right-8 top-5 text-2xl text-[#807973]">
              ✧
            </span>

            {/* Main product image */}
            <div
              className="relative z-10 h-[420px] w-full overflow-hidden rounded-full
              [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)]
              [-webkit-mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)]
              sm:h-[540px]"
            >
              <Image
                src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/small/s009.webp"
                alt="Custom bahn mi arrangement with flowers and treats"
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating photo card */}
            <div className="absolute -bottom-4 right-0 z-20 hidden rotate-3 rounded-3xl bg-white p-3 shadow-2xl sm:block">
              <div className="relative h-44 w-36 overflow-hidden rounded-2xl">
                <Image
                  src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/small/s006.webp"
                  alt="Love arrangement with bahn mi and sweet treats"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Curved visual divider */}
        <div className="absolute -bottom-12 left-[-5%] h-24 w-[110%] rounded-[50%] bg-white" />
      </section>

      {/* =====================================================
          FEATURED ARRANGEMENTS
      ====================================================== */}
      <section className="relative bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#007C91]">
              Featured Arrangements
            </p>

            <h2 className="text-4xl font-semibold text-[#545454] sm:text-5xl">
              Our Most Loved Creations
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#00BCD4]" />
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {featuredArrangements.map((arrangement) => (
              <article
                key={arrangement.id}
                className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-72 overflow-hidden bg-[#00BCD4]/5">
                  <Image
                    src={arrangement.image}
                    alt={arrangement.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="mb-2 text-xl font-semibold text-[#545454]">
                    {arrangement.name}
                  </h3>

                  <p className="mb-3 text-sm text-[#807973]">
                    {arrangement.description}
                  </p>

                  <p className="mb-5 text-sm font-medium text-[#545454]">
                    Starting at {arrangement.price}
                  </p>

                  <Link
                    href="/catalog"
                    className="inline-flex rounded-full border border-[#007C91] px-6 py-2 text-sm font-semibold text-[#007C91] transition hover:bg-[#00BCD4] hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/catalog"
              className="inline-flex rounded-full bg-[#007C91] px-8 py-3 font-semibold text-white transition hover:bg-[#006778]"
            >
              View All Arrangements
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          OCCASIONS SECTION
      ====================================================== */}
      <section className="bg-[#00BCD4]/5 px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#007C91]">
            Perfect for Every Occasion
          </p>

          <h2 className="mb-10 text-4xl font-semibold text-[#545454]">
            Celebrate Life&apos;s Special Moments
          </h2>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {occasions.map((occasion) => (
              <div
                key={occasion.name}
                className="flex min-h-36 flex-col items-center justify-center rounded-3xl bg-white px-4 py-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 text-4xl text-[#007C91]">
                  {occasion.icon}
                </div>

                <p className="font-semibold text-[#545454]">{occasion.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
    HOW IT WORKS
====================================================== */}
      <section className="relative overflow-hidden bg-white px-6 py-20">
        {/* Decorative background details */}
        <span className="absolute left-10 top-24 text-3xl text-[#00BCD4]/25">
          ♡
        </span>

        <span className="absolute left-20 bottom-16 text-2xl text-[#00BCD4]/20">
          ✦
        </span>

        <span className="absolute right-12 top-32 text-3xl text-[#00BCD4]/25">
          ♡
        </span>

        <span className="absolute right-24 bottom-12 text-2xl text-[#00BCD4]/20">
          ✧
        </span>

        <div className="relative mx-auto max-w-6xl">
          {/* Section heading */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#007C91]">
              How It Works
            </p>

            <h2 className="text-4xl font-semibold text-[#545454]">
              Simple. Easy. Meaningful.
            </h2>
          </div>

          {/* Steps */}
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#00BCD4]/10 text-4xl">
                  🎁
                </div>

                <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#007C91] text-sm font-bold text-white">
                  1
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-[#545454]">
                Choose
              </h3>

              <p className="max-w-[220px] text-sm leading-6 text-[#807973]">
                Browse our collection and pick your favorite arrangement.
              </p>
            </div>

            {/* Arrow between steps */}
            <div className="hidden items-center justify-center md:flex">
              <span className="text-3xl text-[#00BCD4]">→</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#00BCD4]/10 text-4xl text-[#007C91]">
                  ✎
                </div>

                <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#007C91] text-sm font-bold text-white">
                  2
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-[#545454]">
                Customize
              </h3>

              <p className="max-w-[220px] text-sm leading-6 text-[#807973]">
                Choose the size and add details to personalize your gift.
              </p>
            </div>

            {/* Arrow between steps */}
            <div className="hidden items-center justify-center md:flex">
              <span className="text-3xl text-[#00BCD4]">→</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#00BCD4]/10 text-4xl text-[#007C91]">
                  ♡
                </div>

                <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#007C91] text-sm font-bold text-white">
                  3
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-[#545454]">
                Celebrate
              </h3>

              <p className="max-w-[220px] text-sm leading-6 text-[#807973]">
                Your arrangement is handcrafted and prepared for the special
                moment.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative cyan corner shape */}
        <div className="absolute -bottom-24 -right-20 h-56 w-72 rotate-[-12deg] rounded-[50%] bg-[#00BCD4]/15" />
      </section>

      {/* =====================================================
          ABOUT JESSICA
      ====================================================== */}
      <section className="bg-[#807973]/10">
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
          {/* About image */}
          <div className="relative min-h-[540px] overflow-hidden rounded-3xl bg-white p-6">
            <Image
              src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/Jessica-prep.webp"
              alt="Jessica preparing a custom arrangement"
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* About content */}
          <div className="px-8 py-16 text-center sm:px-14 lg:text-left">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#007C91]">
              Made with Love
            </p>

            <h2 className="mb-6 text-4xl font-semibold text-[#545454]">
              A Note from Jessica
            </h2>

            <p className="mb-8 max-w-xl text-lg leading-8 text-[#545454]/80">
              Every arrangement is thoughtfully designed and handcrafted to
              bring joy, create memories, and make every moment a little more
              decadent.
            </p>

            <div className="mb-8 grid gap-4 text-left sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 text-sm font-medium text-[#545454] shadow-sm">
                <span className="mr-2 text-[#007C91]">✦</span>
                Premium ingredients
              </div>

              <div className="rounded-2xl bg-white p-4 text-sm font-medium text-[#545454] shadow-sm">
                <span className="mr-2 text-[#007C91]">♡</span>
                Handcrafted with care
              </div>

              <div className="rounded-2xl bg-white p-4 text-sm font-medium text-[#545454] shadow-sm">
                <span className="mr-2 text-[#007C91]">🎁</span>
                Custom made for you
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex rounded-full bg-[#007C91] px-7 py-3 font-semibold text-white transition hover:bg-[#006778]"
            >
              Learn More About Us
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          INSTAGRAM SECTION
      ====================================================== */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#007C91]">
              Follow Our Journey
            </p>

            <h2 className="mb-4 text-3xl font-semibold text-[#545454]">
              @decadent_arrangements
            </h2>

            <p className="mb-6 text-[#807973]">
              See our latest creations and behind-the-scenes moments.
            </p>

            <a
              href="https://www.instagram.com/decadent_arrangements"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-[#007C91] px-7 py-3 font-semibold text-white transition hover:bg-[#006778]"
            >
              Follow on Instagram
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              "https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l009.webp",
              "https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l010.webp",
              "https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l002.webp",
              "https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/large/l006.webp",
            ].map((image) => (
              <div
                key={image}
                className="relative aspect-square overflow-hidden rounded-3xl"
              >
                <Image
                  src={image}
                  alt={`Decadent Arrangements Instagram posted photo`}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CALL TO ACTION
      ====================================================== */}
      <section className="bg-[#007C91] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-semibold">
              Ready to send something unforgettable?
            </h2>

            <p className="mt-2 text-white/80">
              Place your order today and make someone&apos;s day extra special.
            </p>
          </div>

          <Link
            href={orderHref}
            className="rounded-full bg-white px-8 py-3 font-semibold text-[#007C91] transition hover:-translate-y-1 hover:shadow-xl"
          >
            Start Your Order
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
