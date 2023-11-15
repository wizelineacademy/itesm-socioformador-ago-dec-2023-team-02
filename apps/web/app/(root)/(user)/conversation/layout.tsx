import type { Metadata } from "next";
import type { Tag, User } from "@prisma/client";
import ConversationSidebar from "@/components/user/conversationSidebar/organisms/conversation-sidebar";
import { getAllConversationsByUserId } from "@/lib/conversation";
import { getAllSidebarTagsByUserID } from "@/lib/tag";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import { getAllModelsWithProvider } from "@/lib/model";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserbyAuthID } from "@/lib/user";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "WizePrompt",
  description: "",
};

export default async function ConversationRootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<any> {

  const { user } = (await getSession()) || {};

  //If no user, redirect to login
  if(!user){
    redirect("/api/auth/login");
  }

  //get user from database
  const userAuthID: string = user.sub;
  const currUser: User = ((await getUserbyAuthID(userAuthID)).data || {} as User);
  const userId: number = currUser.id;

  const userConversations: SidebarConversation[] = ((await getAllConversationsByUserId(userId)).data || [])
  const userTags: Tag[] = ((await getAllSidebarTagsByUserID(userId)).data || [])
  const models: ModelWithProvider[] = ((await getAllModelsWithProvider()).data || [])
  
  return (
    <div className="flex flex-row">
      <ConversationSidebar models={models} userConversations={userConversations} userTags={userTags}/>
      <section className="w-full">
          {children}
      </section>
    </div>
  );
}