import GroupSidebar from "@/components/admin/groupSidebar/organisms/group-sidebar";
import { GroupsContextProvider } from "@/context/groups-context";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Define the Inter font with the "latin" subset
const inter = Inter({ subsets: ["latin"] });

// Define the metadata for the page
export const metadata: Metadata = {
    title: "WizePrompt",
    description: "",
};


export default function AdminRootLayout({children}: {children: React.ReactNode;}): any {  
  return (
    <body className={inter.className}>
    <GroupsContextProvider>
        <div className="flex flex-row">
          <GroupSidebar/>
          <section className="w-full h-full">
            {children}
          </section>
        </div>
    </GroupsContextProvider>
    </body>
  );
}