import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'The Terminal Times - Linux Blog',
  description: 'Your source for Linux tutorials, distro reviews, and command-line tips',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0f1219] text-white">
        {children}
      </body>
    </html>
  );
} 