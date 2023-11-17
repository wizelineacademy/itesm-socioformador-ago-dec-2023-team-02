import type { Group } from "@prisma/client";
import GroupSidebar from "@/components/admin/groupSidebar/organisms/group-sidebar";
import { GroupsContextProvider } from "@/context/groups-context";
import { getAllGroups } from "@/lib/group";

export default async function AdminRootLayout({children}: {children: React.ReactNode;}): Promise<any> {  
  const initialGroups: Group[] = (await getAllGroups()).data || []

  return (
    <GroupsContextProvider initialGroups={initialGroups}>
        <div className="flex flex-row">
          <GroupSidebar/>
          <section className="w-full h-full">
            {children}
          </section>
        </div>
    </GroupsContextProvider>
  );
}