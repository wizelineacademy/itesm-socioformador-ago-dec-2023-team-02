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
    tags: { id: number }[]; // Assuming tags are identified by their ID
    parameters: JSON; // Optional, if you have specific parameters for the conversation
    active: boolean; // Optional, defaults to true based on your schema
    useGlobalParameters: boolean; // New parameter to decide whether to use global parameters
}

/**
 * Represents the updated information for a conversation.
 */
export interface ConversationUpdateData {
    tags?: Tag[]; // Array of tags associated with the conversation.
    title?: string; //The updated title of the conversation.
  }

// -- Validation -- 