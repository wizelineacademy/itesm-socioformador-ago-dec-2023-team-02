/**
 * Various functions to operate on arrays of conversations or on instances of a conversation, this includes
 * deletion, editing, creation, and filtering.
 */

import type { Tag } from "@prisma/client";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import { arraysIntersect } from "./array-operations";

/**
 * Enum containing the various types of modifications one can perform to an array of conversations. 
 */
export enum ConversationActionType {
    Create,
    Delete,
    EditTitle,
    EditTags
}

/**
 * An action to be dispatched by the reducer function that manages the conversation state in the conversation sidebar. 
 */
export interface ConversationAction {
    type: ConversationActionType;
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
export function conversationReducer(state: SidebarConversation[], action: ConversationAction): SidebarConversation[] {
    switch (action.type) {
        case ConversationActionType.Create:
            if (action.conversation){
                return [action.conversation, ...state]
            }
            return state   
        case ConversationActionType.Delete:
            return state.filter(conversation => conversation.id !== action.conversationId) 
        case ConversationActionType.EditTitle:
            if (action.title){
                return state.map((conversation) => {
                    return conversation.id === action.conversationId ? editTitle(conversation, (action.title || conversation.title)): conversation
                })
            }
            return state   
        case ConversationActionType.EditTags:
            if (action.tags){
                return state.map((conversation) => {
                    return conversation.id === action.conversationId ? editTags(conversation, (action.tags || conversation.tags)) : conversation
                })
            }
            return state 
    }
}

export function editTitle(conversation: SidebarConversation, newTitle: string): SidebarConversation {
    return {...conversation, title: newTitle}
}

export function editTags(conversation: SidebarConversation, newTags: Tag[]): SidebarConversation {
    return {...conversation, tags: newTags}
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
export function filterConversations(conversations: SidebarConversation[], searchText: string, selectedTags: Tag[]): SidebarConversation[] {
    const cleanedSearchText: string = cleanString(searchText)
    return conversations.filter(({title, tags, active}) => {
        return (cleanedSearchText.length === 0 || findMatchRatio(cleanedSearchText, cleanString(title)) > 0.5) &&
        (selectedTags.length === 0 || arraysIntersect<Tag>(tags, selectedTags)) && active
    })
}

export function sortConversationsByDate(conversations: SidebarConversation[]): SidebarConversation[] {
    return [...conversations].sort((convA, convB) => convB.createdAt.getTime() - convA.createdAt.getTime());
}

/**
 * Prepares a string variable for string matching, by removing uppercase characters and whitespaces. 
 * @param str - The string variable to clean .
 * @returns A potentially modified string, removed of its uppercase characters and whitespaces. 
 */
function cleanString(str: string): string {
    return str.toLowerCase().replace(/\s/g, '')
}

function findMatchRatio(str1: string, str2: string): number {
    const minSize: number = str1.length < str2.length ? str1.length : str2.length
    return lcsSize(str1, str2) / minSize
}

function lcsSize(str1: string, str2: string): number {
    const lcs = Array.from(Array(str1.length + 1), () => new Array<number>(str2.length + 1).fill(0));
    let maxSize = 0 
    
    for (let row = 1; row <= str1.length; row++) {
        for (let col = 1; col <= str2.length; col++){
            lcs[row][col] = str1[row-1] === str2[col-1] ? 1 + lcs[row-1][col-1] : 0
            maxSize = lcs[row][col] > maxSize ? lcs[row][col] : maxSize
        }
    }

    return maxSize
}