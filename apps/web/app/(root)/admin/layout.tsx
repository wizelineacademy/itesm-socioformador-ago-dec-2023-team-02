import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Define the Inter font with the "latin" subset
const inter = Inter({ subsets: ["latin"] });

// Define the metadata for the page
export const metadata: Metadata = {
    title: "WizePrompt",
    description: "",
};


export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}): any {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
  