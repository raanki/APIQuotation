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

export const metadata = {
    title: "Quotations",
    description: "Random Quotation App",
}

const script = `
    (function() {
        var h = Math.floor(Math.random() * 360);
        var color = "hsl(" + h + ", 70%, 90%)";
        document.body.style.backgroundColor = color;
    })();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const h = Math.floor(Math.random() * 360);
    const color = `hsl(${h}, 70%, 90%)`;

    return (
        <html lang="fr">
        <head />
        <body style={{ backgroundColor: color }}>
        {children}
        </body>
        </html>
    )
}

