import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Ahmad Faris — Web Developer & IoT Engineer',
  description:
    'Portfolio of Ahmad Faris, a passionate developer specializing in Web Development and IoT Engineering.',
  keywords: ['Web Developer', 'IoT', 'React', 'Next.js', 'Portfolio', 'Ahmad Faris'],
  authors: [{ name: 'Ahmad Faris' }],
  openGraph: {
    title: 'Ahmad Faris — Web Developer & IoT Engineer',
    description: 'Portfolio of Ahmad Faris, specializing in Web Development and IoT Engineering.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-[var(--text-primary)] bg-[var(--bg)] selection:bg-[var(--accent)] selection:text-black transition-colors duration-500`}
      >
        {/* SVG Noise Overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.035] mix-blend-overlay">
          <svg className="h-full w-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
