import type { Metadata } from "next";
import { Oswald, Sora } from "next/font/google";
import "./globals.css";

const heading = Oswald({ subsets: ["latin"], variable: "--font-heading" });
const body = Sora({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Aderaf Entertainment Ventures | Lagos Artisan Bakery",
  description: "Artisan bakery specializing in bespoke cakes and gourmet pastries in Lagos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}