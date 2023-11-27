/**
 * User-defined TypeScript interfaces and validation functions related to the model Tag. 
 * @packageDocumentation
 */

// -- Types -- 
/**
 * Represents the updated information for a tag.
 */
export interface TagUpdateData {
    idUser?: number; 
    name?: string;
    color?: string;
}

export interface TagCreateData {
    idUser: number; 
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
    if (tagData.name && !isValidTagName(tagData.name)){
        return false
    } 

    if (tagData.color && !isValidTagColor(tagData.color)){
        return false 
    }

    return true 
}

/**
 * Determines whether a given string is a valid tag name. 
 * @param name - A string that potentialy holds a valid tag name. 
 * @returns A boolean value that indicates whether the given string is a valid tag name.
 */
export function isValidTagName(name: string): boolean {
    return name.length > 0 // Más validación podría ser añadida. 
}

/**
 * Determines whether or not a string represents a valid hex color value, that is: begins with the numeral symbol, 
 * followed by 3 o 6 hexadecimal digits. 
 * @param color - A string whose adherence to the previous syntax is tested. 
 * @returns A boolean value that indicates whether the given string is a valid representation of color. 
 */
export function isValidTagColor(color: string): boolean {
    return /^(?:#[0-9A-Fa-f]{3}(?:[0-9A-Fa-f]{3})?)$/.test(color) // Color is represented with a hexadecimal number of 3 or 6 digits. 
}

/**
 * Type-guard that determines if an object implements the interface TagUpdateData. 
 * @param obj - An object whose adherence to TagUpdateData will be tested. 
 * @returns A boolean value that indicates whether or not the given obj implements TagUpdateData. 
 */
export function isTagUpdateData(obj: any): obj is TagUpdateData {
    return (
        typeof obj === 'object' && 
        (obj.idUser === undefined || typeof obj.idUser === 'number') && 
        (obj.name === undefined || typeof obj.name === 'string') && 
        (obj.color === undefined || typeof obj.color === 'string') 
    );
}

/**
 * Type-guard that determines if an object implements the interface TagCreateData. 
 * @param obj - An object whose adherence to TagCreateData will be tested. 
 * @returns A boolean value that indicates whether or not the given obj implements TagCreateData. 
 */
export function isTagCreateData(obj: any): obj is TagCreateData {
    return (
      typeof obj === 'object' &&
      typeof obj.name === 'string' &&
      typeof obj.color === 'string'
    );
}

// -- Transformation -- 
export function normalizeTagCreateData(tagData: TagCreateData): TagCreateData {
    return {
        idUser: tagData.idUser,
        name: tagData.name.trim(), 
        color: tagData.color.trim(), 
    }
}

export function normalizeTagUpdateData(tagData: TagUpdateData): TagUpdateData {
    return {
        idUser: tagData.idUser,
        name: tagData.name?.trim(), 
        color: tagData.color?.trim(), 
    }
}