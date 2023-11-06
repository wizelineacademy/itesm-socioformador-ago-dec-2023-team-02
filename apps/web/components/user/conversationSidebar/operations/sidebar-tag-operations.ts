/**
 * Various  functions for operating on arrays of Tag objects. 
 */

import type { SidebarTag } from "@/types/sidebar-tag-types";
import { isValidTagColor, isValidTagName } from "@/types/tag-types";
import { addItem, editItemWithId, removeItemWithId } from "@/components/shared/operations/array-operations";
import { cleanString, findMatchRatio } from "../../../shared/operations/string-operations";

export enum TagsActionTypes {
    Create,
    Delete,
    Edit,
    ReplaceAll
}

export interface TagsAction {
    type: TagsActionTypes;
    tag: SidebarTag
    tags?: SidebarTag[];
}

export function tagsReducer(state: SidebarTag[], action: TagsAction): SidebarTag[] {
    switch (action.type){
        case TagsActionTypes.Create:
            return addItem<SidebarTag>(state, action.tag)
        case TagsActionTypes.Delete:
            return removeItemWithId<SidebarTag>(state, action.tag)
        case TagsActionTypes.Edit:
            return editItemWithId<SidebarTag>(state, action.tag)
        case TagsActionTypes.ReplaceAll:
            return action.tags || state
    }
}

export function editTagName(tag: SidebarTag, newName: string): SidebarTag {
    return {...tag, name: isValidTagName(newName) ? newName : tag.name}
}

export function editTagColor(tag: SidebarTag, newColor: string): SidebarTag {
    return {...tag, color: isValidTagColor(newColor) ? newColor : tag.color}
}

export function editTag(tag: SidebarTag, newName: string, newColor: string): SidebarTag {
    return {
        ...tag,
        name: isValidTagName(newName) ? newName : tag.name,
        color: isValidTagColor(newColor) ? newColor : tag.color,
    }
}


export function filterTags(tags: SidebarTag[], searchText: string): SidebarTag[] {
    const cleanedSearchText: string = cleanString(searchText)
    return tags.filter(({name}) => (
        searchText.length === 0 || findMatchRatio(cleanString(name), cleanedSearchText) > 0.5
    ))
}

export function tagsAreEqual(tagA: SidebarTag, tagB: SidebarTag): boolean {
    return tagA.id === tagB.id && tagA.name === tagB.name && tagA.color === tagB.color 
}

export function mapTagIdsToTags(tagIds: number[], tags: SidebarTag[]): SidebarTag[] {
    const builtTags: SidebarTag[] = []
    tagIds.forEach((tagId) => {
        const correspondingTag: SidebarTag | undefined = tags.find((tag) => tag.id === tagId)

        if (correspondingTag){
            builtTags.push(correspondingTag)
        }
    })

    return builtTags
} 

export function sortTagsByName(tags: SidebarTag[]): SidebarTag[] {
    return [...tags].sort((tag1, tag2) => tag1.name.localeCompare(tag2.name))
}