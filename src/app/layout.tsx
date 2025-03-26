import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tockit - A simple table of contents for React",
  description:
    "A lightweight, customizable table of contents component for React and Next.js applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
