import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Olli Järvinen — Data & Business Analytics",
    template: "%s — Olli Järvinen",
  },
  description:
    "Portfolio of Olli Järvinen, MSc in business analytics, data, BI, and service operations.",
  metadataBase: new URL("https://ollijarvinen.github.io"),
  openGraph: {
    title: "Olli Järvinen — Data & Business Analytics",
    description:
      "Analytical work across data, business intelligence, and service operations.",
    type: "website",
  },
};

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>,
) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
