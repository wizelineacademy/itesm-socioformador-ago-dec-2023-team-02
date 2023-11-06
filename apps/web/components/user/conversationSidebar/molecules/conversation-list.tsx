import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import type { ConversationsAction } from "../operations/sidebar-conversation-operations";
import { ConversationCard } from "./conversation-card";

interface ConversationListProps {
    conversations: SidebarConversation[];
    conversationsDispatch: (action: ConversationsAction) => void;
}

export function ConversationList({conversations, conversationsDispatch}: ConversationListProps): JSX.Element {
    const [selectedConversation, setSelectedConversation] = useState<number | null>(conversations.length > 0 ? conversations[0].id : null)
    const router: AppRouterInstance = useRouter()

    const handleConversationClick: (conversationId: number) => void = (conversationId) => {
        router.push(`/conversation/${conversationId}`)
        setSelectedConversation(conversationId)
    }

    if (conversations.length === 0){
        return (
            <div className="w-full border-t-1 border-neutral-800 flex flex-col justify-center items-center">
                <p className="text-neutral-300 p-4">No items to display</p>
            </div>
        ); 
    }
    
    return (
        <div className="overflow-x-hidden overflow-y-auto w-full">
            <div className="space-y-2 w-full">
            {conversations.map(conversation => 
                <ConversationCard
                    conversation={conversation}
                    conversationsDispatch={conversationsDispatch}
                    isSelected={selectedConversation === conversation.id}
                    key={conversation.id}
                    onClick={()=>{handleConversationClick(conversation.id)}}
                />  
            )}
            </div>
        </div>
    ); 
}