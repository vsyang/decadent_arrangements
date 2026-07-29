import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function PoliciesSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <div className="grid gap-6 sm:grid-cols-[55px_1fr]">
        <span
          className={`${cormorant.className} text-2xl italic text-white border-1 border-[#00BCD4] h-10 bg-black rounded text-center`}
        >
          {number}
        </span>

        <div>
          <h2
            className={`${cormorant.className} mb-6 text-3xl font-medium text-black sm:text-4xl`}
          >
            {title}
          </h2>

          <div className="space-y-5 leading-8 text-black">{children}</div>
        </div>
      </div>
    </section>
  );
}
