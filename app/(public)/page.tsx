// app/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { HeroParallax } from "@/components/home/HeroParallax";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session?.user?.id);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] overflow-hidden">
      {/* Hero Section con Paralaje e Interacciones */}
      <HeroParallax isAuthenticated={isAuthenticated} />

      {/* Feature Showcase: Elevando la percepción de la marca */}
      <section className="relative z-20 border-t border-[var(--color-border)] bg-[var(--color-surface)] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold md:text-5xl text-[var(--color-primary)] mb-4">
              Crafted with Passion & Precision
            </h2>
            <p className="text-[var(--color-muted)] max-w-2xl mx-auto text-base md:text-lg">
              Every arrangement is an edible work of art designed to bring people together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-8 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[var(--color-honey-light)] text-[var(--color-honey)] flex items-center justify-center font-bold text-xl mb-6">
                🧀
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-3">
                Artisanal Selection
              </h3>
              <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed">
                Premium cheeses, cured meats, fresh fruits, and handpicked delicacies arranged for optimal taste pairing.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-8 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[var(--color-honey-light)] text-[var(--color-honey)] flex items-center justify-center font-bold text-xl mb-6">
                🎁
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-3">
                Custom Tailored
              </h3>
              <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed">
                Customized according to your event, dietary preferences, or special celebrations.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-8 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[var(--color-honey-light)] text-[var(--color-honey)] flex items-center justify-center font-bold text-xl mb-6">
                🚚
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-3">
                Scheduled Delivery
              </h3>
              <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed">
                Seamless online ordering with exact date and time selection for local pickup or direct delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}