import "../../../globals.css";
import type { Metadata } from "next";
import type { Tag } from "@prisma/client";
import ConversationSideBar from "@/components/user/conversationSidebar/molecules/conversation-sidebar";
import { getAllConversationsByUserId } from "@/lib/conversation";
import { getAllTagsByUserID } from "@/lib/tag";
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
  const userTags: Tag[] = ((await getAllTagsByUserID(userId)).data || [])
  
  return (
    <div className="flex flex-row">
      <ConversationSideBar userConversations={userConversations} userTags={userTags}/>
      <section className="main-container">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </section>
    </div>
  );
}
