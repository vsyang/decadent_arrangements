"use client";

import { faqSections } from "@/app/lib/faq-data";
import Link from "next/link";
import { useState } from "react";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold">
          {question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center border border-black text-xl transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="pb-6 pr-12">
          <p className="leading-7 text-gray-700">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Help Center
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to common questions about ordering, food storage,
            delivery, cancellations, refunds, allergies, and more.
          </p>
        </header>

        {/* FAQ Sections */}
        <div className="space-y-16">
          {faqSections.map((section) => (
            <section key={section.title}>
              <div className="mb-6 border-b-2 border-black pb-4">
                <h2 className="text-2xl font-bold">
                  {section.title}
                </h2>
              </div>

              <div>
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

        {/* Contact CTA */}
        <section className="mt-20 border border-black p-8 sm:p-10">
          <h2 className="text-2xl font-bold">
            Still have questions?
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-gray-700">
            If you cannot find the answer you are looking for, please contact
            Decadent Arrangements. We will be happy to help with questions
            about your order, delivery, food requirements, cancellations, or
            other concerns.
          </p>

          <Link
            href="mailto:decadentarragements2023@gmail.com"
            className="mt-6 inline-block border border-black bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Contact Us
          </Link>

        </section>

        
      </div>
    </main>
  );
}