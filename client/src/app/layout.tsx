import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeAnalyzer AI - Intelligent Code Analysis & Visualization",
  description:
    "Transform your code into interactive data visualizations with AI-powered complexity scoring, suggestions, and insights. Supports 30+ programming languages with real-time analysis.",
  keywords: [
    "code analysis",
    "code complexity",
    "AI code review",
    "code visualization",
    "programming tools",
    "code metrics",
    "software quality",
    "Claude AI",
    "code optimization",
    "developer tools",
  ],
  authors: [{ name: "Zachary Fast" }],
  creator: "Zachary Fast",
  publisher: "Zachary Fast",
  openGraph: {
    title: "CodeAnalyzer AI - Intelligent Code Analysis & Visualization",
    description:
      "Transform your code into interactive data visualizations with AI-powered complexity scoring and insights.",
    url: "https://code-complexity-analyzer-indol.vercel.app",
    siteName: "CodeAnalyzer AI",
    images: [
      {
        url: "/og-image.png", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "CodeAnalyzer AI - Code Analysis Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeAnalyzer AI - Intelligent Code Analysis",
    description:
      "AI-powered code analysis with interactive visualizations and complexity scoring.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "developer tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
