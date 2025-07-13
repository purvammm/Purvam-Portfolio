import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Purvam Prajapati - Portfolio",
  description: "Computer Science Engineer | AI/ML Researcher | Full Stack Developer",
  keywords: "Purvam Prajapati, Computer Science Engineer, AI/ML Researcher, Full Stack Developer, Portfolio",
  authors: [{ name: "Purvam Prajapati" }],
  creator: "Purvam Prajapati",
  openGraph: {
    title: "Purvam Prajapati - Portfolio",
    description: "Computer Science Engineer | AI/ML Researcher | Full Stack Developer",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body
        className="font-sans antialiased"
        style={{
          color: '#1f2937',
          minHeight: '100vh',
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        {children}
      </body>
    </html>
  );
}
