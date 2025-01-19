import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import AppLayout from './layer';
import './styles/globals.css';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Issues Explorer',
  description: 'Search and filter GitHub issues',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900`} style={{ margin: 0 }}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
