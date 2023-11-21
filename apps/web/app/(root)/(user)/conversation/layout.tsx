import type { Metadata } from "next";
import type { Tag, User } from "@prisma/client";
import { Suspense } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import ConversationSidebar from "@/components/user/conversationSidebar/organisms/conversation-sidebar";
import { getAllConversationsByUserId } from "@/lib/conversation";
import { getAllSidebarTagsByUserID } from "@/lib/tag";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import { getAllModelsWithProvider } from "@/lib/model";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";
import { PrismaUserContextProvider } from "@/context/prisma-user-context";
import { getUserbyAuthID } from "@/lib/user";
import { Skeleton } from "@/components/ui/skeleton";
import { ConversationsContextProvider } from "@/context/conversations-context";

export const metadata: Metadata = {
  title: "WizePrompt",
  description: "",
};

function SidebarSuspense(): JSX.Element {
  return (
    <div className="h-screen w-screen">
      <div className="w-[256px] absolute h-screen bg-black items-center justify-between flex flex-col top-0 left-0 index-10">
        <div>
          <div className="mb-[20px] flex mt-[12px]">
            <Skeleton className="w-[172px] h-[40px]" />
            <Skeleton className="w-[40px] h-[40px] ml-[12px]" />
          </div>
          <div className="mb-[20px] flex">
            <Skeleton className="w-[172px] h-[40px]" />
            <Skeleton className="w-[40px] h-[40px] ml-[12px]" />
          </div>
          <div className="w-full bg-[#262626] h-[1px] mb-[20px]" />
          <Skeleton className="w-[216px] h-[40px]" />
        </div>
        <div className="mt-[20px] px-[16px] pb-[12px] items-center flex flex-row w-full justify-between">
          <div className="flex flex-row items-center w-full">
            <Skeleton className="!w-[40px] h-[40px] rounded-full " />
            <div className="w-full ml-2">
              <Skeleton className="w-[110px] h-[15px] rounded-full mb-[5px]" />
              <Skeleton className="w-[70px] h-[11px] rounded-full" />
            </div>
          </div>
          <Skeleton className="w-[20px] h-[15px] rounded-full" />
        </div>
      </div>
      <div className="flex flex-col w-screen justify-between items-center h-screen ">
        <div className="h-[64px] w-full p-[24px] flex justify-between items-center border-b border-[#262626]">
          <div className="w-[256px]" />
          <Skeleton className="h-[36px] w-[106px] rounded-md ml-[25px]" />
          <Skeleton className="h-[40px] w-[106px] rounded-md" />
        </div>
        <div className="flex pl-[256px] w-screen flex-col items-center justify-center mb-[16px]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-cente">
              <Skeleton className="h-[68px] w-[436px] rounded-md" />
              <Skeleton className="h-[48px] w-[48px] ml-[8px] rounded-md" />
            </div>
            <Skeleton className="w-[250px] h-[15px] rounded-full mt-[5px]" />
          </div>
          <Skeleton className="absolute bottom-[100px] right-[20px] w-[32px] h-[32px] rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default async function ConversationRootLayout({children}: {children: React.ReactNode}): Promise<any> {
  const { user } = (await getSession()) || {};

  //If no user, redirect to login
  if (!user) {
    redirect("/api/auth/login");
  }

  //get user from database
  const userAuthID: string = user.sub;
  const prismaUser: User | null = (await getUserbyAuthID(userAuthID)).data ?? null;
  //const userId: number = prismaUser.id;

  const userConversations: SidebarConversation[] = prismaUser 
    ? (await getAllConversationsByUserId(prismaUser.id)).data || []
    : [];
  const userTags: Tag[] = prismaUser
    ? (await getAllSidebarTagsByUserID(prismaUser.id)).data || []
    : [];
  const models: ModelWithProvider[] = prismaUser
    ? (await getAllModelsWithProvider()).data || []
    : [];

  return (
    <Suspense fallback={<SidebarSuspense />}>
      <PrismaUserContextProvider prismaUser={prismaUser}>
        <ConversationsContextProvider initialConversations={userConversations}>
          <div className="flex flex-row">
            <ConversationSidebar models={models} userTags={userTags}/>
            <section className="w-full">
              {children}
            </section>
          </div>
        </ConversationsContextProvider>
      </PrismaUserContextProvider>
    </Suspense>
  );
}
