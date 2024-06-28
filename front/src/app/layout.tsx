import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import { SportProvider } from "@/context/SportContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canchitas Gol",
  description: "Reservá tu turno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SportProvider>
          <NavBar />
          {children}
          <Footer />
        </SportProvider>
      </body>
    </html>
  );
}
