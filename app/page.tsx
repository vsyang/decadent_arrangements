// ** Just playing with some things here. 

// import Link from "next/link";
// import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff7f3] text-[#2b1a16]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#9b5c4b]">
          Custom gifts • Sweet treats • Elegant arrangements
        </p>

        <h1 className="mb-6 text-5xl font-bold md:text-7xl">
          Decadent Arrangements
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-[#5f4a43]">
          Beautiful custom arrangements made for birthdays, celebrations,
          holidays, and special moments worth remembering.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#products"
            className="rounded-full bg-[#2b1a16] px-8 py-3 text-white"
          >
            View Arrangements
          </a>

          <a
            href="#contact"
            className="rounded-full border border-[#2b1a16] px-8 py-3"
          >
            Place an Order
          </a>
        </div>
      </section>
    </main>
  );
}
