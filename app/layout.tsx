import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideBar from '@components/doc/SideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='relative flex'>
        <SideBar />
        <main className='prose ml-[256px] flex min-h-screen flex-1 flex-col gap-8 p-24'>{children}</main>
      </body>
    </html>
  );
}
