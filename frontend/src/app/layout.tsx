import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "./_components/SiteHeader";
import ScrollReset from "./_components/ScrollReset";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chattr · Приватный мессенджер",
  description:
    "Безопасный мессенджер Chattr для iOS. Никакого сбора данных, никакой слежки. Просто общение.",
  icons: {
    icon: "/app-icon.png",
    apple: "/apple-touch-icon.png",
  },
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('chattr_theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ScrollReset />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
