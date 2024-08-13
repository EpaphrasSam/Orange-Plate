import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Dashboard",
  description: "Restaurant Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex max-sm:flex-col gap-4">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
