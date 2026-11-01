import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";


const inter_tight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter_tight',
});

export const metadata: Metadata = {
  title: "Deepcrate.fm",
  description: "Discover niche musicc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter_tight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
