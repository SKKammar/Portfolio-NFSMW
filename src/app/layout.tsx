import type { Metadata, Viewport } from 'next';
import { Permanent_Marker, Oswald } from 'next/font/google';
import './globals.css';

const marker = Permanent_Marker({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400'],
});

const oswald = Oswald({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Santosh K Kammar — Most Wanted Developer',
    template: '%s | Santosh K Kammar',
  },
  description:
    'WANTED: Software Engineer building production-grade backend systems, AI-powered solutions, and scalable full-stack applications. Last seen in Rockport City.',
  keywords: [
    'Santosh K Kammar',
    'Software Engineer',
    'Java',
    'Spring Boot',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Backend Developer',
    'Full Stack Developer',
    'NFS Most Wanted',
  ],
  authors: [{ name: 'Santosh K Kammar' }],
  creator: 'Santosh K Kammar',
  openGraph: {
    title: 'Santosh K Kammar — Most Wanted Developer',
    description:
      'WANTED: Software Engineer • Backend Developer • Full Stack Developer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santosh K Kammar — Most Wanted Developer',
    description:
      'WANTED: Software Engineer • Backend Developer • Full Stack Developer',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${marker.variable} ${oswald.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
