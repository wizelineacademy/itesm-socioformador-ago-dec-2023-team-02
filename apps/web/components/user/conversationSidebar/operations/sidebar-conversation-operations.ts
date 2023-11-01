/**
 * Various functions to operate on arrays of conversations or on instances of a conversation, this includes
 * deletion, editing, creation, and filtering.
 */

import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import { containsAllElements } from "./array-operations";

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
    tags?: SidebarTag[];
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
                    return conversation.id === action.conversationId && action.title ? editConversationTitle(conversation, action.title) : conversation
                })
            }
            return state   
        case ConversationActionType.EditTags:
            if (action.tags){
                return state.map((conversation) => {
                    return conversation.id === action.conversationId && action.tags ? editConversationTags(conversation, action.tags) : conversation
                })
            }
            return state 
    }
}

/**
 * Modifies the title of a conversation, without modifying the given conversation.  
 * @param conversation - A conversation whose title will be edited. 
 * @param newTitle - The new title the conversation will be edited with. 
 * @returns A new, edited conversation, that has as title newTitle. 
 */
export function editConversationTitle(conversation: SidebarConversation, newTitle: string): SidebarConversation {
    return {...conversation, title: newTitle}
}

/**
 * Modifies the array of tags associated to the given conversation. 
 * @param conversation - A conversation whose array of tags will be edited. 
 * @param newTags - An array containing the new tag objects the given conversation will be associated to. 
 * @returns A new, edited conversation, that has as array of tags newTags. 
 */
export function editConversationTags(conversation: SidebarConversation, newTags: SidebarTag[]): SidebarConversation {
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
export function filterConversations(conversations: SidebarConversation[], searchText: string, selectedTags: SidebarTag[]): SidebarConversation[] {
    const cleanedSearchText: string = cleanString(searchText)
    return conversations.filter(({title, tags, active}) => {
        return (cleanedSearchText.length === 0 || findMatchRatio(cleanedSearchText, cleanString(title)) > 0.5) &&
        (selectedTags.length === 0 || containsAllElements<number>(tags.map(tag => tag.id), selectedTags.map(tag => tag.id))) && active
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
 * Prepares a string variable for string matching, by removing uppercase characters and whitespaces. 
 * @param str - The string variable to clean. 
 * @returns A potentially modified string, removed of its uppercase characters and whitespaces. 
 */
function cleanString(str: string): string {
    return str.toLowerCase().replace(/\s/g, '')
}

/**
 * Determines to what degree, from 0 to 1, two strings are similar. The function measures how similar two string are with 
 * the following expression: (length of the largest common substring between the two) / (length of the smallest of the two strings). 
 * @param str1 - A string variable whose degree of similarity will be measured with str2. 
 * @param str2 - A string variable whose degree of similarity will be measured with str1. 
 * @returns A number that indicates how similar the given strings are; ranges from 0 to 1. 
 */
function findMatchRatio(str1: string, str2: string): number {
    const minSize: number = str1.length < str2.length ? str1.length : str2.length
    return lcsSize(str1, str2) / minSize
}

/**
 * Finds the length of the longest common substring between str1 and str2, applying dynamic programming, in O(n*m) time, 
 * where n = str1.length and m = str2.length.
 * @param str1 - A string variable whose longest common substring with str2 will be found. 
 * @param str2 - A string variable whose longest common substring with str1 will be found. 
 * @returns The number of characters comprising the longest common substring between str1 and str2. 
 */
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