import type { Metadata } from "next";
import { Sora, DM_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import { StoreProvider } from "@/context/StoreContext";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "NoRush Pay | India's Fastest Retail Checkout",
  description: "Skip every queue. Scan, tap, and walk out. NoRush Pay combines UPI, biometrics, and AI into the world's most frictionless in-store payment experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmMono.variable}`}>
        <Background />
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
