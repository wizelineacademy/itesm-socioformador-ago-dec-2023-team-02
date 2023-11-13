import type { Tag } from "@prisma/client";

// -- Types --
/**
 * Alternative version of the prisma-defined Conversation type, contains model and tags as a properties. Meant to be used 
 * within the conversation sidebar of the user interface. 
 */
export interface SidebarConversation {
    id: number;
    title: string;
    createdAt: Date;
    active: boolean;
    tags: Tag[]
    model: SidebarConversationModel;
}

/**
 * Describes the information of a LLM, as required by the conversation sidebar interface of the application. 
 */
export interface SidebarConversationModel {
    id: number;
    name: string;
    provider: SidebarConversationProvider
}

/**
 * Describes the information of a LLM provider, as required by the conversation sidebar interface of the application. 
 */
export interface SidebarConversationProvider {
    id: number;
    image: string;
}

// -- Misc functions --