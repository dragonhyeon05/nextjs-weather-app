// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Aplikasi cuaca dibuat dengan Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Atribut 'suppressHydrationWarning' penting saat menggunakan next-themes
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* --- PERBAIKAN: Hapus tag <link> untuk CSS Leaflet --- */}
        {/* CSS Leaflet sekarang diimpor langsung di dalam komponen WeatherMap */}
      </head>
      {/* ⬇️ PERUBAHAN DI SINI: Ditambahkan 'overflow-x-hidden' */}
      <body className={`${inter.className} antialiased overflow-x-hidden`}> 
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}