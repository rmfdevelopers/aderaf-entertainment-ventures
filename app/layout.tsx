import type { Metadata } from "next";
import { Oswald, Sora } from "next/font/google";
import "./globals.css";

const headingFont = Oswald({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  variable: "--font-heading" 
});

const bodyFont = Sora({ 
  subsets: ["latin"],
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Aderaf Entertainment Ventures",
  description: "Artisanal cakes and delightful snacks crafted with local flair in Lagos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}