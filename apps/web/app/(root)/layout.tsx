import { Toaster } from "sonner";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

// Define the Inter font with the "latin" subset
const inter = Inter({ subsets: ["latin"] });

// Define the metadata for the page
export const metadata: Metadata = {
    title: "WizePrompt",
    description: "",
};

/**
 * The root layout component for the application.
 * @param children The child components to render within the layout.
 * @returns The rendered layout component.
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): any {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
                    <main>{children}</main>
                    <Toaster position="top-center" richColors theme="dark" />
                </Providers>
            </body>
        </html>
    );
}
