"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1A1A2E" }}>
          Something went wrong
        </h1>
        <p
          style={{
            marginTop: "1rem",
            color: "#64748B",
            maxWidth: "28rem",
          }}
        >
          An unexpected error occurred. Please try again.
        </p>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: "#C4453A",
              color: "white",
              borderRadius: "9999px",
              padding: "0.75rem 1.5rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              border: "1px solid #d1d5db",
              color: "#1A1A2E",
              borderRadius: "9999px",
              padding: "0.75rem 1.5rem",
              fontWeight: 500,
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
