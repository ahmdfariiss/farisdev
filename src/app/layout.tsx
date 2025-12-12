import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio | Web Developer & IoT Enthusiast",
  description: "Personal portfolio website of a passionate Computer Science student specializing in Web Development and IoT",
  keywords: ["Web Developer", "IoT", "React", "Next.js", "Portfolio", "Computer Science"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio | Web Developer & IoT Enthusiast",
    description: "Personal portfolio website of a passionate Computer Science student specializing in Web Development and IoT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
