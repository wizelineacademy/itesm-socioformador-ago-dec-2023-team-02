/**
 * Various functions to operate on arrays of conversations or on instances of a conversation, this includes
 * deletion, editing, creation, and filtering.
 */

import type { Tag } from "@prisma/client";
import type { SidebarConversation, SidebarConversationModel } from "@/types/sidebar-conversation-types";
import type { SidebarModel } from "@/types/moder-with-provider-types";
import { containsAllElements } from "./array-helpers";
import { cleanString, findMatchRatio } from "./string-helpers";

/**
 * Enum containing the various types of modifications one can perform to an array of conversations. 
 */
export enum ConversationsActionType {
    Create,
    Delete,
    EditTitle,
    EditTags
}

/**
 * An action to be dispatched by the reducer function that manages the conversation state in the conversation sidebar. 
 */
export interface ConversationsAction {
    type: ConversationsActionType;
    conversationId: number;
    title?: string;
    tags?: Tag[];
    conversation?: SidebarConversation; 
}

/**
 * Reducer function that encapsulates all logic related to the manipulation of a conversation array state. 
 * @param state - An array of conversations.  
 * @param action - The action dispatched by the reducer. Indicates the type of modification to perform to the conversation
 * array state. 
 * @returns An updated conversation array state. 
 */
export function conversationsReducer(state: SidebarConversation[], action: ConversationsAction): SidebarConversation[] {
    switch (action.type) {
        case ConversationsActionType.Create:
            if (action.conversation){
                return [action.conversation, ...state]
            }
            return state   
        case ConversationsActionType.Delete:
            return state.filter(conversation => conversation.id !== action.conversationId) 
        case ConversationsActionType.EditTitle:
            if (action.title){
                return state.map((conversation) => {
                    return conversation.id === action.conversationId && action.title ? editConversationTitle(conversation, action.title) : conversation
                })
            }
            return state   
        case ConversationsActionType.EditTags:
            if (action.tags){
                return state.map((conversation) => {
                    return conversation.id === action.conversationId && action.tags ? editConversationTags(conversation, action.tags) : conversation
                })
            }
            return state 
    }
}

/**
 * Modifies the title of a conversation.
 * @param conversation - A conversation whose title will be edited. 
 * @param newTitle - The new title the conversation will be edited with. 
 * @returns A new conversation, that has as title newTitle. 
 */
export function editConversationTitle(conversation: SidebarConversation, newTitle: string): SidebarConversation {
    return {...conversation, title: newTitle}
}

/**
 * Modifies the array of tags associated to the given conversation. 
 * @param conversation - A conversation whose array of tags will be edited. 
 * @param newTags - An array containing the new tag objects the given conversation will be associated to. 
 * @returns A new conversation, that has as array of tags newTags. 
 */
export function editConversationTags(conversation: SidebarConversation, newTags: Tag[]): SidebarConversation {
    return {...conversation, tags: newTags}
}

export function editConversationModel(conversation: SidebarConversation, newModel: SidebarConversationModel): SidebarConversation {
    return {...conversation, model: newModel}
}

export function sidebarModelToSidebarConversationModel(sidebarModel: SidebarModel): SidebarConversationModel {
    return {
        id: sidebarModel.id,
        name: sidebarModel.name,
        provider: {
            id: sidebarModel.provider.id,
            image: sidebarModel.provider.image,
        }
    }
}

/**
 * Filters an array of conversations, according to a search text that is matched against the conversations' titles, and an 
 * array of selected tags, matched against the array of tags associated to each conversation.  
 * @param conversations - An array of conversations.  
 * @param searchText - A string to match against the titles of the conversations contained in the conversations array. 
 * @param selectedTags - An array of tags selected by the user for filtering. A conversation is filtered out is it doesnt contain
 * any of the tags found in in selectedTags. 
 * @returns A filtered array of conversations. 
 */
export function filterConversations(conversations: SidebarConversation[], searchText: string, selectedTags: Set<number>): SidebarConversation[] {
    const cleanedSearchText: string = cleanString(searchText)
    const selectedTagsArray: number[] = Array.from(selectedTags) 
    return conversations.filter(({title, tags, active}) => {
        return (cleanedSearchText.length === 0 || findMatchRatio(cleanedSearchText, cleanString(title)) > 0.5) &&
        (selectedTags.size === 0 || containsAllElements<number>(tags.map(tag => tag.id), selectedTagsArray)) && active
    })
}

/**
 * Sorts an array of conversations by their creation date, in descending order; that is, newest conversations are placed first. 
 * @param conversations - An array of conversations to sort by creation date.  
 * @returns A sorted array of conversations. 
 */
export function sortConversationsByDate(conversations: SidebarConversation[]): SidebarConversation[] {
    return [...conversations].sort((convA, convB) => convB.createdAt.getTime() - convA.createdAt.getTime());
}

/**
 * Creates a set for the given conversation's array of tags, where each item is a tag's id. 
 * @param conversation - A conversation, holding an array of tags.
 * @returns A set that comprises the ids of the tags associated to the given conversation. 
 */
export function buildTagSet(conversation: SidebarConversation): Set<number> {
    return new Set<number>(conversation.tags.map(tag => tag.id))
}

/**
 * Determines if a given string represents a valid conversation (chat) title. 
 * @param title - The potential title of a converation with a model. 
 * @returns A boolean that indicates whether the given title is valid.
 */
export function isValidConversationName(name: string): boolean {
    return name.length > 0
}
