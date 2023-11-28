import type { Tag } from "@prisma/client";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import { ConversationCard } from "./conversation-card";

interface ConversationListProps {
    selectedConversation: number | null;
    userTags: Tag[];
    userConversations: SidebarConversation[];
    onConversationPress: (conversationId: number) => void;
}

export function ConversationList({selectedConversation, userTags, userConversations, onConversationPress}: ConversationListProps): JSX.Element {
    const handleConversationPress: (conversationId: number) => void = (conversationId) => {
        onConversationPress(conversationId)
    }

    if (userConversations.length === 0){
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <p id="no-items" className="text-neutral-300 p-4">No items to display</p>
            </div>
        ); 
    }
    
    return (
        <div className="overflow-x-hidden overflow-y-auto w-full h-full scrollbar-hide">
            <div className="flex flex-col space-y-2 w-full scrollbar-hide">
            {userConversations.map(conversation => 
                <ConversationCard
                    conversation={conversation}
                    isSelected={selectedConversation === conversation.id}
                    key={conversation.id}
                    onClick={()=>{handleConversationPress(conversation.id)}}
                    userTags={userTags}
                />  
            )}
            </div>
        </div>
    ); 
}