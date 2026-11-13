import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mora | Encontre o lugar ideal para chamar de seu",
  description:
    "Encontre casas, apartamentos, terrenos e outras oportunidades para comprar ou alugar. Seu próximo lugar começa no Mora.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className={geist.className}>{children}</body>
    </html>
  );
}
