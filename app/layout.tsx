import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIF Store - Compra y venta",
  description: "Plataforma de compra y venta entre compañeros de la FIF - UAQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
