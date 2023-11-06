/**
 * User-defined TypeScript interfaces and validation functions related to the model Conversation. 
 * @packageDocumentation
 */

import type { Tag } from "@prisma/client";

// -- Types --
/**
 * Represents the creation information for a conversation.
 */
export interface ConversationCreateData {
    idUser: number;
    idModel: number;
    title: string;
}

interface Parameters {
    userContext?: string;
    responseContext?: string;
    temperature?: number;
    size?: string;
}

/**
 * Represents the parameters of a conversation.
 */
interface Parameters {
    userContext: string;
    responseContext: string;
    temperature: number;
  }

/**
 * Represents the updated information for a conversation.
 */
export interface ConversationUpdateData {
    tags?: Tag[]; // Array of tags associated with the conversation.
    title?: string; //The updated title of the conversation.
    parameters?: Parameters //The updated parameters of the conversation.
}

// -- Validation -- 