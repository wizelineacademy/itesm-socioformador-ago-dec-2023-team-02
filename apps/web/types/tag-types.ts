/**
 * User-defined TypeScript interfaces and validation functions related to the model Tag. 
 * @packageDocumentation
 */

// -- Types -- 
/**
 * Represents the updated information for a tag.
 */
export interface TagUpdateData {
    name?: string;
    color?: string;
}

export interface TagCreateData {
    name: string;
    color: string;
}

export type TagData = TagUpdateData | TagCreateData

// -- Validation -- 
/**
 * Validates that the given tag of type TagInput is valid. 
 * @param tag - A TagInput object whose properties will be validated. 
 * @returns A boolean value that indicates whether or not the given tag is valid. 
 */
export function isValidTag(tagData: TagData): boolean {
    if (tagData.name && isValidTagName(tagData.name)){
        return false
    } 

    if (tagData.color && isValidTagColor(tagData.color)){
        return false 
    }

    return true 
}

export function isValidTagName(name: string): boolean {
    return name.length > 0 // Más validación podría ser añadida. 
}

export function isValidTagColor(color: string): boolean {
    return /^#[0-9a-fA-F]{6}$/.test(color) // Color is represented with a hexadecimal number of 6 digits. 
}

// -- Transformation -- 
export function normalizeTagCreateData(tagData: TagCreateData): TagCreateData {
    return {
        name: tagData.name.trim(), 
        color: tagData.color.trim(), 
    }
}

export function normalizeTagUpdateData(tagData: TagUpdateData): TagUpdateData {
    return {
        name: tagData.name?.trim(), 
        color: tagData.color?.trim(), 
    }
}