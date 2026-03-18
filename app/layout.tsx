import { Oswald, Sora } from 'next/font/google';
import './globals.css';

const heading = Oswald({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '700'] });
const body = Sora({ subsets: ['latin'], variable: '--font-body', weight: ['300', '400', '600', '800'] });

export const metadata = {
  title: 'Aderaf Entertainment Ventures | Lagos Premier Bakery',
  description: 'Bespoke cakes and artisanal snacks for Lagos celebrations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}