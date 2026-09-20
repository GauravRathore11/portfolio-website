import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gaurav Rathore — Portfolio",
    template: "%s — Gaurav Rathore",
  },
  description:
    "Portfolio of Gaurav Rathore, Software Engineer at JMAN Group, Chennai — backend services, REST APIs, Next.js/TypeScript applications, Azure and Databricks.",
  keywords: [
    "Gaurav Rathore",
    "portfolio",
    "software engineer",
    "JMAN Group",
    "Next.js",
    "TypeScript",
    "Azure",
    "Databricks",
  ],
};

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong theme. Mirrors the logic in ThemeProvider.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("site-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}