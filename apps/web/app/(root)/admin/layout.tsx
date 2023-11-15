import GroupSidebar from "@/components/admin/groupSidebar/organisms/group-sidebar";
import { GroupsContextProvider } from "@/context/groups-context";

export default function AdminRootLayout({children}: {children: React.ReactNode;}): any {  
  return (
    <GroupsContextProvider>
        <div className="flex flex-row">
          <GroupSidebar/>
          <section>
            {children}
          </section>
        </div>
    </GroupsContextProvider>
  );
}