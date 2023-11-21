import type { Group, User } from "@prisma/client";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import GroupSidebar from "@/components/admin/groupSidebar/organisms/group-sidebar";
import { GroupsContextProvider } from "@/context/groups-context";
import { getAllGroups } from "@/lib/group";
import { sortGroups } from "@/helpers/group-helpers";
import { getUserbyAuthID } from "@/lib/user";
import { PrismaUserContextProvider } from "@/context/prisma-user-context";

export default async function AdminRootLayout({children}: {children: React.ReactNode;}): Promise<any> {  
  const { user } = (await getSession()) || {};

  //If no user, redirect to login
  if (!user) {
    redirect("/api/auth/login");
  }

  //get user from database
  const userAuthID: string = user.sub;
  const prismaUser: User | null = (await getUserbyAuthID(userAuthID)).data ?? null;

  const allUsersGroupId = 1
  const initialGroups: Group[] = sortGroups((await getAllGroups()).data || [], allUsersGroupId)

  return (
    <PrismaUserContextProvider prismaUser={prismaUser}>
        <GroupsContextProvider initialGroups={initialGroups}>
          <div className="flex flex-row">
            <GroupSidebar/>
            <section className="w-full h-full">
              {children}
            </section>
          </div>
     </GroupsContextProvider>
    </PrismaUserContextProvider>
  );
}