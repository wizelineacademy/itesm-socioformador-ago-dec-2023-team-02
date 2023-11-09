/**
 * Various  functions for operating on arrays of Tag objects. 
 */

import type { Tag } from "@prisma/client";
import { isValidTagColor, isValidTagName } from "@/types/tag-types";
import { cleanString, findMatchRatio } from "./string-helpers";
import { addItem, editItemWithId, removeItemWithId } from "./array-helpers";

export enum TagsActionTypes {
    Create,
    Delete,
    Edit,
    ReplaceAll
}

export interface TagsAction {
    type: TagsActionTypes;
    tag: Tag
    tags?: Tag[];
}

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

export function editTagName(tag: Tag, newName: string): Tag {
    return {...tag, name: isValidTagName(newName) ? newName : tag.name}
}

export function editTagColor(tag: Tag, newColor: string): Tag {
    return {...tag, color: isValidTagColor(newColor) ? newColor : tag.color}
}

export function editTag(tag: Tag, newName: string, newColor: string): Tag {
    return {
        ...tag,
        name: isValidTagName(newName) ? newName : tag.name,
        color: isValidTagColor(newColor) ? newColor : tag.color,
    }
}


export function filterTags(tags: Tag[], searchText: string): Tag[] {
    const cleanedSearchText: string = cleanString(searchText)
    return tags.filter(({name}) => (
        searchText.length === 0 || findMatchRatio(cleanString(name), cleanedSearchText) > 0.5
    ))
}

export function tagsAreEqual(tagA: Tag, tagB: Tag): boolean {
    return tagA.id === tagB.id && tagA.name === tagB.name && tagA.color === tagB.color && tagA.idUser === tagB.idUser
}

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

export function sortTagsByName(tags: Tag[]): Tag[] {
    return [...tags].sort((tag1, tag2) => tag1.name.localeCompare(tag2.name))
}