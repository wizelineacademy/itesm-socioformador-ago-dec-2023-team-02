"use client"; 

import { createContext, useReducer } from "react";
import { conversationsReducer, type ConversationsAction, sortConversationsByDate } from "@/helpers/sidebar-conversation-helpers";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";

export interface ConversationsContextShape {
    conversations: SidebarConversation[];
    conversationsDispatch: React.Dispatch<ConversationsAction>
}

export const ConversationsContext = createContext<ConversationsContextShape | null>(null)

interface ConversationsContextProviderProps {
    children: JSX.Element;
    initialConversations: SidebarConversation[];
}

export function ConversationsContextProvider({children, initialConversations}: ConversationsContextProviderProps): JSX.Element {
    const [conversations, conversationsDispatch] = useReducer(conversationsReducer, sortConversationsByDate(initialConversations))

    return (
        <ConversationsContext.Provider value={{conversations, conversationsDispatch}}>
            {children}
        </ConversationsContext.Provider>
    );
}