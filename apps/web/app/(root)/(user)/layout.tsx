import "../../globals.css";
import type { Metadata } from "next";
import Topbar from "@/components/shared/topbar";
import LeftSidebar from "@/components/shared/left-sidebar";
import Bottombar from "@/components/shared/bottom-bar";

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
    <>
      <Topbar />
      <main className="flex flex-row">
        <LeftSidebar />
        <section className="main-container">
          <div className="w-full max-w-4xl">{children}</div>
        </section>
      </main>

      <Bottombar />
    </>
  );
}
