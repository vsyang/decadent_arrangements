"use client";

import { faqSections } from "@/app/lib/faq-data";
import { cormorant, montserrat } from "@/app/ui/home/fonts";
import { ChevronDown, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={`${cormorant.className} text-2xl font-medium leading-tight text-white transition group-hover:text-[#00BCD4] sm:text-3xl`}
        >
          {question}
        </span>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 text-white transition duration-300 group-hover:border-[#00BCD4] group-hover:text-[#00BCD4]">
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={1.5}
          />
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <p className="max-w-3xl pb-7 pr-4 text-sm leading-8 text-white/60 sm:pr-16 sm:text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main
      className={`${montserrat.className} min-h-screen overflow-hidden bg-[#0a0a0a] text-white`}
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-white/10 bg-black px-6 py-24 sm:px-10 lg:py-32">
        {/* Decorative background */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#00BCD4]/10 blur-[120px]" />

        <div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-[#007C91]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-7 flex items-center gap-4">
            <div className="h-px w-12 bg-[#00BCD4]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-white/60 sm:text-xs">
              Help Center
            </p>
          </div>

          <h1
            className={`${cormorant.className} max-w-4xl text-5xl font-medium leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl`}
          >
            Frequently Asked
            <span className="block italic text-white/55">Questions.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-8 text-white/60 sm:text-base">
            Find answers to common questions about ordering, food storage,
            delivery, cancellations, refunds, allergies, and more.
          </p>
        </div>
      </section>

      {/* =====================================================
          FAQ CONTENT
      ====================================================== */}
      <section className="px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-24">
            {faqSections.map((section, sectionIndex) => (
              <section
                key={section.title}
                className="grid gap-10 lg:grid-cols-[230px_1fr]"
              >
                {/* Section heading */}
                <div>
                  <p
                    className={`${cormorant.className} mb-3 text-3xl italic text-[#00BCD4]`}
                  >
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </p>

                  <h2
                    className={`${cormorant.className} text-4xl font-medium leading-tight text-white`}
                  >
                    {section.title}
                  </h2>

                  <div className="mt-6 h-px w-16 bg-white/20" />
                </div>

                {/* Questions */}
                <div className="border-t border-white/15">
                  {section.faqs.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CTA
      ====================================================== */}
      <section className="bg-[#f4f0ea] px-6 py-20 text-black sm:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 border border-black/15 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:p-16">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#007C91]">
                Need More Help?
              </p>

              <h2
                className={`${cormorant.className} text-4xl font-medium leading-none text-[#252525] sm:text-5xl`}
              >
                Still have questions?
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-8 text-[#545454] sm:text-base">
                If you cannot find the answer you are looking for, please
                contact Decadent Arrangements. We will be happy to help with
                questions about your order, delivery, food requirements,
                cancellations, or other concerns.
              </p>
            </div>

            <Link
              href="mailto:decadentarrangements2023@gmail.com"
              className="group inline-flex min-w-56 items-center justify-center gap-4 bg-black px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#00BCD4] hover:text-black"
            >
              Contact Us
              <Mail
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
