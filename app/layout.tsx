import type { Metadata } from "next";
import { Oswald, Sora } from "next/font/google";
import "./globals.css";

const heading = Oswald({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-heading" });
const body = Sora({ subsets: ["latin"], weight: ["300", "400", "600", "800"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Aderaf Entertainment Ventures | Crafting Moments",
  description: "A premium Lagos-based venture specializing in artisanal cakes, gourmet snacks, and bespoke confectionery.",
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