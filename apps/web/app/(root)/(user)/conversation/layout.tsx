import "../../..globals.css";
import type { Metadata } from "next";
import LeftSidebar from "@/components/shared/left-sidebar";

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
    <main className="flex flex-row">
      <LeftSidebar />
      <section className="main-container">
        <div className="w-full max-w-4xl">{children}</div>
      </section>
    </main>
  );
}
