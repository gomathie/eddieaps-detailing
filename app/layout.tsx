import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Eddie APS Detailing | Premium Mobile & Stationed Auto Detailing',
  description: 'Premium mobile and stationed auto detailing services. Restore your vehicle\'s shine with expert care, convenience, and eco-friendly products.',
  keywords: ['mobile car detailing', 'auto detailing', 'car detailing near me', 'paint correction'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <AppHeader />
          {children}
          <AppFooter />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
