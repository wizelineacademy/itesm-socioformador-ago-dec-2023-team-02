import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import type { ConversationAction } from "../operations/sidebar-conversation-operations";
import { ConversationCard } from "./conversation-card";

interface ConversationListProps {
    conversations: SidebarConversation[];
    dispatch: (action: ConversationAction) => void;
}

export function ConversationList({conversations, dispatch}: ConversationListProps): JSX.Element {
    const [selectedConversation, setSelectedConversation] = useState<number | null>(conversations.length > 0 ? conversations[0].id : null)
    const router: AppRouterInstance = useRouter()

    const handleConversationClick: (conversationId: number) => void = (conversationId) => {
        router.push(`/conversation/${conversationId}`)
        setSelectedConversation(conversationId)
    }
    
    return (
        <div className="overflow-x-hidden overflow-y-auto w-full">
            <div className="space-y-2 w-full">
            {conversations.map(conversation => 
                <ConversationCard
                    conversation={conversation}
                    dispatch={dispatch}
                    isSelected={selectedConversation === conversation.id}
                    key={conversation.id}
                    onClick={()=>{handleConversationClick(conversation.id)}}
                />  
            )}
            </div>
        </div>
    ); 
}