import type { SidebarTag } from "./sidebar-tag-types";

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
    tags: SidebarTag[]
    model: SidebarModel;
}

/**
 * Describes the information of a LLM, as required by the conversation sidebar interface of the application. 
 */
export interface SidebarModel {
    name: string;
    provider: SidebarProvider
}

/**
 * Describes the information of a LLM provider, as required by the conversation sidebar interface of the application. 
 */
export interface SidebarProvider {
    image: string;
}

// -- Misc functions --