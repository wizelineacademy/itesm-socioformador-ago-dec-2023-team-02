import type { Metadata } from "next";
import ConversationSidebar from "@/components/user/conversationSidebar/organisms/conversation-sidebar";
import { getAllConversationsByUserId } from "@/lib/conversation";
import { getAllSidebarTagsByUserID } from "@/lib/tag";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import type { SidebarTag } from "@/types/sidebar-tag-types";

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
  const sidebarConversations: SidebarConversation[] = ((await getAllConversationsByUserId(userId)).data || [])
  const sidebarTags: SidebarTag[] = ((await getAllSidebarTagsByUserID(userId)).data || [])
  
  return (
    <div className="flex flex-row">
      <ConversationSidebar sidebarConversations={sidebarConversations} sidebarTags={sidebarTags}/>
      <section className="w-full">
          {children}
      </section>
    </div>
  );
}