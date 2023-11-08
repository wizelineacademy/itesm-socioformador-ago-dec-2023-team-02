import type { Metadata } from "next";
import type { Tag } from "@prisma/client";
import ConversationSidebar from "@/components/user/conversationSidebar/organisms/conversation-sidebar";
import { getAllConversationsByUserId } from "@/lib/conversation";
import { getAllSidebarTagsByUserID } from "@/lib/tag";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";

export const metadata: Metadata = {
  title: "WizePrompt",
  description: "",
};

export default async function ConversationRootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<any> {
  const userId = 1; 
  const userConversations: SidebarConversation[] = ((await getAllConversationsByUserId(userId)).data || [])
  const userTags: Tag[] = ((await getAllSidebarTagsByUserID(userId)).data || [])
  
  return (
    <div className="flex flex-row">
      <ConversationSidebar userConversations={userConversations} userTags={userTags}/>
      <section className="w-full">
          {children}
      </section>
    </div>
  );
}