import type { Group } from "@prisma/client";
import GroupSidebar from "@/components/admin/groupSidebar/organisms/group-sidebar";
import { GroupsContextProvider } from "@/context/groups-context";
import { getAllGroups } from "@/lib/group";
import { sortGroups } from "@/helpers/group-helpers";

export default async function AdminRootLayout({children}: {children: React.ReactNode;}): Promise<any> {  
  const allUsersGroupId = 1
  const initialGroups: Group[] = sortGroups((await getAllGroups()).data || [], allUsersGroupId)

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