import type { Metadata } from 'next';
import Header from '@/components/Header';
import HeaderBar from '@/components/HeaderBar';
import Footer from '@/components/Footer';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'Elite Path - Your Travel Destination',
  description: 'Book tours, hotels, holidays, visas, and cruises with Elite Path',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeaderBar />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
