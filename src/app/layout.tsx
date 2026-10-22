import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/main.scss";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Suryansh Yadav — Developer Portfolio",
  description:
    "Personal portfolio of Suryansh Yadav — B.Tech IT student at HNBGU exploring full-stack development, AI workflows, and thoughtful interface design.",
  keywords: [
    "Suryansh Yadav",
    "developer portfolio",
    "full-stack",
    "MERN",
    "AI automation",
    "UI/UX",
    "HNBGU",
  ],
  authors: [{ name: "Suryansh Yadav" }],
  openGraph: {
    title: "Suryansh Yadav — Developer Portfolio",
    description: "Part developer's workspace. Part creative archive. Always a work in progress.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
