import { Toaster } from "sonner";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WizePrompt",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): any {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div id="app-root">{children}</div>
            <Toaster position="top-center" richColors theme="light" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
