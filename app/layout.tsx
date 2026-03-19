import type { Metadata } from "next";
import { Oswald, Sora } from "next/font/google";
import "./globals.css";

const heading = Oswald({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "700"] 
});

const body = Sora({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["300", "400", "600", "800"]
});

export const metadata: Metadata = {
  title: "Aderaf Entertainment Ventures | Cakes & Snacks Lagos",
  description: "Lagos premier destination for bespoke celebration cakes and gourmet snacks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}