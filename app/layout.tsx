import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AeroBot | Asistente de Familiarización",
  description: "Asistente técnico AeroBot basado en documentación de familiarización de aeronaves."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}
