// src/components/home/HeroParallax.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroParallaxProps {
    isAuthenticated: boolean;
}

export function HeroParallax({ isAuthenticated }: HeroParallaxProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const yImageLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const yImageRight = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

    return (
        <div
            ref={containerRef}
            className="relative min-h-[90vh] w-full overflow-hidden bg-[var(--color-background)] px-6 py-12 md:py-20 flex items-center justify-center"
        >
            {/* 🎬 VIDEO BACKGROUND (Visible únicamente en Mobile/Tablet hasta 'md') */}
            <div className="absolute inset-0 z-0 block md:hidden overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover opacity-35"
                >
                    <source src="/videos/hero_home.mp4" type="video/mp4" />
                </video>

                {/* Dynamic Dark Gradient Overlay: Garantiza la legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/80 via-[var(--color-background)]/40 to-[var(--color-background)]" />
            </div>

            {/* 🔮 Capas de Paralaje de Fondo (Visibles de 'md' en adelante) */}
            <motion.div
                style={{ y: yImageLeft }}
                className="absolute -left-12 top-20 hidden w-64 md:block lg:w-80 opacity-90 pointer-events-none z-0"
            >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-xl rotate-[-4deg]">
                    <Image
                        src="https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop"
                        alt="Artisanal Charcuterie Arrangement"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 to-transparent" />
                </div>
            </motion.div>

            <motion.div
                style={{ y: yImageRight }}
                className="absolute -right-12 bottom-10 hidden w-64 md:block lg:w-80 opacity-90 pointer-events-none z-0"
            >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-2xl rotate-[6deg]">
                    <Image
                        src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
                        alt="Gourmet Dessert & Cheese Tray"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/30 to-transparent" />
                </div>
            </motion.div>

            {/* ✦ Hero Content animado */}
            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="relative z-10 max-w-3xl text-center flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/90 backdrop-blur-sm px-4 py-1.5 shadow-sm"
                >
                    <span className="h-2 w-2 rounded-full bg-[var(--color-honey)] animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                        Custom Gifts • Sweet Treats • Elegant Arrangements
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mb-6 font-serif text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl text-[var(--color-primary)] leading-[1.05]"
                >
                    Decadent <br className="hidden sm:inline" />
                    <span className="italic font-normal text-[var(--color-accent)]">Arrangements</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mb-10 max-w-xl text-lg text-[var(--color-muted-foreground)] leading-relaxed md:text-xl font-medium"
                >
                    Beautiful bespoke charcuterie boards, gourmet desserts, and custom culinary creations tailored for birthdays, celebrations, and unforgettable moments.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col gap-4 sm:flex-row items-center justify-center w-full sm:w-auto"
                >
                    <Link
                        href="/catalog"
                        className="w-full sm:w-auto rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-9 py-4 font-medium transition-all duration-300 hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-center"
                    >
                        Explore Catalog
                    </Link>

                    <Link
                        href={isAuthenticated ? "/orders/new" : "/api/auth/signin"}
                        className="w-full sm:w-auto rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] px-9 py-4 font-medium transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-center bg-white/50 backdrop-blur-sm sm:bg-transparent"
                    >
                        Place an Order
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}