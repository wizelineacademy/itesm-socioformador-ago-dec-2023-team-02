/**
 * Various  functions for operating on arrays of Tag objects. 
 */

import type { Tag } from "@prisma/client";
import { isValidTagColor, isValidTagName } from "@/types/tag-types";
import { cleanString, findMatchRatio } from "./string-helpers";
import { addItem, editItemWithId, removeItemWithId } from "./array-helpers";

/**
 * Enum containing the various types of modifications one can perform to an array of tags. 
 */
export enum TagsActionTypes {
    Create,
    Delete,
    Edit,
    ReplaceAll
}

/**
 * An action to be dispatched by the reducer function that manages the tags state.
 */
export interface TagsAction {
    type: TagsActionTypes;
    tag: Tag
    tags?: Tag[];
}

/**
 * Reducer function that encapsulates all logic related to the manipulation of a tag array state. 
 * @param state - An array of tags.  
 * @param action - The action dispatched by the reducer. Indicates the type of modification to perform to the tag
 * array state. 
 * @returns An updated tag array state. 
 */
export function tagsReducer(state: Tag[], action: TagsAction): Tag[] {
    switch (action.type){
        case TagsActionTypes.Create:
            return addItem<Tag>(action.tag, state)
        case TagsActionTypes.Delete:
            return removeItemWithId<Tag>(action.tag, state)
        case TagsActionTypes.Edit:
            return editItemWithId<Tag>(action.tag, state)
        case TagsActionTypes.ReplaceAll:
            return action.tags || state
    }
}

/**
 * Modifies the name of a tag.
 * @param tag - A tag whose name will be edited. 
 * @param newName - The new name the tag will be edited with. 
 * @returns A new tag, that has as name newName. 
 */
export function editTagName(tag: Tag, newName: string): Tag {
    return {...tag, name: isValidTagName(newName) ? newName : tag.name}
}

/**
 * Modifies the color of a tag.
 * @param tag - A tag whose color will be edited. 
 * @param newColor - The new color the tag will be edited with (represented as a string hex value).
 * @returns A new tag, that has as color newColor. 
 */
export function editTagColor(tag: Tag, newColor: string): Tag {
    return {...tag, color: isValidTagColor(newColor) ? newColor : tag.color}
}

/**
 * Modifies the name and color properties of a tag. 
 * @param tag - A tag whose name and color will be edited. 
 * @param newName - The new name the tag will be edited with. 
 * @param newColor - The new color the tag will be edited with (represented as a string hex value).
 * @returns A new tag, that has as name newName, and as color newColor.
 */
export function editTag(tag: Tag, newName: string, newColor: string): Tag {
    return {
        ...tag,
        name: isValidTagName(newName) ? newName : tag.name,
        color: isValidTagColor(newColor) ? newColor : tag.color,
    }
}

/**
 * Filters the given array of tags, by their name. 
 * @param tags - An array of tags to filter by their name. 
 * @param searchText - A string to search in each tag name. 
 * @returns A new tag array, where each item's name was found to contain, at least partially, the content of 
 * searchText.
 */
export function filterTags(tags: Tag[], searchText: string): Tag[] {
    const cleanedSearchText: string = cleanString(searchText)
    return tags.filter(({name}) => (
        searchText.length === 0 || findMatchRatio(cleanString(name), cleanedSearchText) > 0.5
    ))
}

/**
 * Indicates whether two tag objects are identical.
 * @param tagA - A tag object, to compare with tagB.
 * @param tagB - A tag object, to compare with tagA.
 * @returns A boolean value that indicates whether two tag objects are identical.
 */
export function tagsAreEqual(tagA: Tag, tagB: Tag): boolean {
    return tagA.id === tagB.id && tagA.name === tagB.name && tagA.color === tagB.color && tagA.idUser === tagB.idUser
}


/**
 * Creates an array of tags that holds every tag in tags whose id is present in tagsIds. 
 * @param tagIds - An array of tag ids, the resulting array tag will potentially contain a tag object with this id.
 * @param tags - An array of tags to filter, only those whose id is found in tagIds persist. 
 * @returns A new tag array, the result of filtering tags with tagIds.
 */
export function mapTagIdsToTags(tagIds: number[], tags: Tag[]): Tag[] {
    const builtTags: Tag[] = []
    tagIds.forEach((tagId) => {
        const correspondingTag: Tag | undefined = tags.find((tag) => tag.id === tagId)

        if (correspondingTag){
            builtTags.push(correspondingTag)
        }
    })

    return builtTags
} 

/**
 * Sortss an array of tags by their name, alphabetically. 
 * @param tags - An array of tags to sort by their name.
 * @returns A new sorted tag array. 
 */
export function sortTagsByName(tags: Tag[]): Tag[] {
    return [...tags].sort((tag1, tag2) => tag1.name.localeCompare(tag2.name))
}