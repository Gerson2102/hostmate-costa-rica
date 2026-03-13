"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-4 text-muted max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-primary-dark text-white rounded-full px-6 py-3 font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border border-gray-300 text-foreground rounded-full px-6 py-3 font-medium hover:bg-gray-50 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
