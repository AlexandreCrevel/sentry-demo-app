import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sentry Demo App',
  description: "A demonstration of Sentry's capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <nav className='bg-gray-800 text-white p-4'>
          <div className='container mx-auto'>
            <ul className='flex space-x-4'>
              <li>
                <Link href='/' className='hover:text-gray-300'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/client-errors' className='hover:text-gray-300'>
                  Client Errors
                </Link>
              </li>
              <li>
                <Link href='/server-errors' className='hover:text-gray-300'>
                  Server Errors
                </Link>
              </li>
              <li>
                <Link href='/performance' className='hover:text-gray-300'>
                  Performance
                </Link>
              </li>
              <li>
                <Link href='/user-tracking' className='hover:text-gray-300'>
                  User Tracking
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className='container mx-auto p-4'>{children}</main>
      </body>
    </html>
  );
}
