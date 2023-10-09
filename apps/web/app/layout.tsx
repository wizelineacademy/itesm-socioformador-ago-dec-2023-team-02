import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "WizePrompt ChatGPT Demo",
  description:
    "A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
