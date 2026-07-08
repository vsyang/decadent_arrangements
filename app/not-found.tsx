// src/app/not-found.tsx

import Link from "next/link";

// This page is shown when the user visits a route that does not exist.

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center text-[#545454]">
      {/* Large 404 number */}
      <h1 className="mb-4 text-6xl font-bold text-[#03989e]">404</h1>

      {/* Main page not found message */}
      <h2 className="mb-3 text-3xl font-semibold text-[#545454]">
        Page Not Found
      </h2>

      {/* Short explanation for the user */}
      <p className="mb-6 max-w-md text-[#807973]">
        Sorry, the page you are looking for does not exist or may have been
        moved.
      </p>

      {/* Button that sends the user back to the home page */}
      <Link
        href="/"
        className="rounded-md bg-[#03989e] px-6 py-3 font-semibold text-[#ffffff] hover:opacity-90"
      >
        Back to Home
      </Link>
    </main>
  );
}
