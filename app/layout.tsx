import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Recollect - Your Personal Idea Surfaces',
  description: 'Capture and surface ideas for how to spend your free time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
