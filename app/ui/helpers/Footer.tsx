import "@/app/globals.css";

import logo from "@/public/images/Decadentarrangements_logo.png";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // md:py-6 py-2 text-center text-xs text-muted-foreground
    <footer className="bg-stone-900 text-stone-300 font-sans border-t border-stone-800 md:mb-0 mb-16">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-6 md:pt-16 flex flex-col">
        <div className="flex items-center space-x-2 flex flex-col justfy-center text-center">
          <div className="overflow-hidden border border-2 rounded-full h-21 w-21">
            <Image
              src={logo}
              alt="Decadent Arrangements Logo"
              placeholder="blur"
              width={120}
              height={120}
              className=" bg-white border border-2 border-white scale-210"
            />
          </div>

          <span className="text-2xl font-bold text-[#00BCD4] tracking-wide leading-none w-full uppercase pt-2">
            Decadent Arrangements
          </span>
          <div className="h-px bg-white/80 w-full mt-4" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-12 md:pb-16 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 justify-items-center text-center md:text-left">
        {/* Brand and hours for attention*/}
        <div className="space-y-4 w-full pl-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-100 mb-4">
            Contact
          </h3>
          {/* Socials */}
          <div className="space-y-2 w-full justify-items-center">
            {/* Instagram */}
            <div className="flex space-x-2 text-xs ml-auto mr-auto md:ml-0">
              <a
                href="https://www.instagram.com/decadent_arrangements"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-[#00BCD4] transition-colors flex items-center gap-2"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-[#007C91]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span>@decadent_arrangements</span>
              </a>
            </div>
            {/* Email */}
            <div className="flex space-x-2 text-xs ml-auto mr-auto md:ml-0">
              <a
                href="mailto:decadentarrangements2023@gmail.com"
                className="text-stone-400 hover:text-[#00BCD4] transition-colors flex items-center gap-2"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-[#007C91]" />
                <span>decadentarragements2023@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="pt-2 text-xs text-stone-400">
            <p className="font-semibold text-stone-200">Business Hours:</p>
            <p>Mon to Sat: 8:00 AM - 7:00 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="w-full pl-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-100 mb-4">
            Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/catalog"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Our Catalog
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="hover:text-[#00BCD4] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/orders/new"
                className="hover:underline hover:decoration-white transition-colors font-medium text-[#00BCD4]/90"
              >
                Place an Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer service */}
        <div className="w-full pl-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-100 mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm mb-4">
            <li>
              <Link
                href="/faqs"
                className="hover:text-[#00BCD4] transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/faqs#Cancellations&Refunds"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Cancellations & Refunds
              </Link>
            </li>
            <li>
              <Link
                href="/faqs#FoodStorage&Care"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Food Storage & Care
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom legal line */}
      <div className="bg-stone-950 text-xs text-stone-500 border-t border-stone-800/60">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            &copy; {currentYear}{" "}
            <span className="text-stone-400 font-medium">
              Decadent Arrangements
            </span>
            . All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:underline">
              Cookies Policy
            </Link>
          </div>
          {/* Payment methods */}
          <div className="flex space-x-2 text-stone-400 font-mono tracking-wider font-bold">
            <span className="uppercase border border-stone-800 px-1.5 py-0.5 rounded bg-stone-900">
              Venmo
            </span>
            <span className="border border-stone-800 px-1.5 py-0.5 rounded bg-stone-900">
              Paypal
            </span>
            <span className="border border-stone-800 px-1.5 py-0.5 rounded bg-stone-900">
              Zelle
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
