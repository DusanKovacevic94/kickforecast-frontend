import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Condensed, Roboto, Nanum_Pen_Script } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-condensed",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const nanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nanum",
});

export const metadata: Metadata = {
  title: "KickForecast - Football Predictions",
  description: "Expert football predictions and analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.variable} ${roboto.variable} ${nanum.variable} min-h-screen bg-background text-foreground antialiased`}>
        <Navbar />
        <main className="container mx-auto px-6 md:px-12 py-8 max-w-xl">
          {children}
        </main>
      </body>
    </html>
  );
}
