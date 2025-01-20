import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { ReactQueryProvider } from './providers';
import './internal/styles/globals.css';

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
        <ReactQueryProvider>
          <div className="m-auto box-border grid w-2/3 grid-cols-2 gap-x-6 p-8">
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
