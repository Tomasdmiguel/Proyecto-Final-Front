import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import { SportProvider } from "@/context/SportContext";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reserva Gol",
  description: "Reservá tu turno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon2.jpg" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <SportProvider>
            <NavBar />
            {children}
            <Footer />
          </SportProvider>
        </UserProvider>
      </body>
    </html>
  );
}
