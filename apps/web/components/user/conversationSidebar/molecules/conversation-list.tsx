import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import type { Tag } from "@prisma/client";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import type { ConversationsAction } from "@/helpers/sidebar-conversation-helpers";
import { ConversationCard } from "./conversation-card";

interface ConversationListProps {
    userTags: Tag[];
    userConversations: SidebarConversation[];
    conversationsDispatch: (action: ConversationsAction) => void;
}

export function ConversationList({userTags, userConversations, conversationsDispatch}: ConversationListProps): JSX.Element {
    const [selectedConversation, setSelectedConversation] = useState<number | null>(userConversations.length > 0 ? userConversations[0].id : null)
    const router: AppRouterInstance = useRouter()

    const handleConversationClick: (conversationId: number) => void = (conversationId) => {
        router.push(`/conversation/${conversationId}`)
        setSelectedConversation(conversationId)
    }

    if (userConversations.length === 0){
        return (
            <div className="w-full border-t-1 border-neutral-800 flex flex-col justify-center items-center">
                <p className="text-neutral-300 p-4">No items to display</p>
            </div>
        ); 
    }
    
    return (
        <div className="overflow-x-hidden overflow-y-auto w-full scrollbar-hide">
            <div className="flex flex-col space-y-2 w-full scrollbar-hide">
            {userConversations.map(conversation => 
                <ConversationCard
                    conversation={conversation}
                    conversationsDispatch={conversationsDispatch}
                    isSelected={selectedConversation === conversation.id}
                    key={conversation.id}
                    onClick={()=>{handleConversationClick(conversation.id)}}
                    userTags={userTags}
                />  
            )}
            </div>
        </div>
    ); 
}