import type { Metadata } from 'next';
import { Oswald, Sora } from 'next/font/google';
import './globals.css';

const heading = Oswald({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700'] 
});

const body = Sora({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '600', '800']
});

export const metadata: Metadata = {
  title: 'Aderaf Entertainment Ventures | Artisan Cakes & Gourmet Snacks',
  description: 'Artisanally crafted cakes and gourmet snacks, baked fresh daily to elevate your celebrations in Lagos and beyond.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`${heading.variable} ${body.variable} font-sans antialiased bg-[#FF6B6B] text-white`}
        style={{
          // @ts-ignore
          '--primary': '#FF6B6B',
          '--secondary': '#FFE66D',
          '--accent': '#4ECDC4',
        }}
      >
        {children}
      </body>
    </html>
  );
}