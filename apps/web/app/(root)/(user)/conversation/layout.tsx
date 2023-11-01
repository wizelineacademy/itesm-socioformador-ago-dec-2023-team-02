import type { Metadata } from "next";
import ConversationSideBar from "@/components/user/conversationSidebar/molecules/conversation-sidebar";
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
      <ConversationSideBar sidebarConversations={sidebarConversations} sidebarTags={sidebarTags}/>
      <section className="main-container">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </section>
    </div>
  );
}