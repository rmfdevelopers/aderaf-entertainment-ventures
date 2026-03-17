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
  title: 'Aderaf Entertainment Ventures | Artisan Bakery Lagos',
  description: 'Artisan bakery specializing in bespoke cakes, gourmet pastries, and premium savory snacks in Lagos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} font-sans bg-[#FF5733] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}