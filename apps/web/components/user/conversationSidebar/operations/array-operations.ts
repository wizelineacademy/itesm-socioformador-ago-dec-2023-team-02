/**
 * Various generic functions for operating on arrays without side-effects. 
 */

/**
 * Places the given item at the end of the given array. 
 * @param items - An array to which a value will be appended. 
 * @param itemToAdd - The item to place at the end of the given array. 
 * @returns An new array, containing in its last position itemToAdd. 
 */
export function addItem<T>(items: T[], itemToAdd: T): T[] {
    return [...items, itemToAdd]
}

/**
 * Removes the given item from the given array. 
 * @param items - An array from which an item will be removed. 
 * @param itemToRemove - The item to remove from the array. 
 * @returns An new array, removed of itemToRemove. If itemToRemove isn't contained by items, returns a copy of
 * the items array. 
 */
export function removeItem<T>(items: T[], itemToRemove: T): T[] {
    return items.filter(item => item !== itemToRemove)
}

/**
 * Removes the given item from the given array, under the condition that the item to remove and the items of the 
 * array to modify are objects that have as a property an id of type number. 
 * @param items - An array from which an item will be removed. 
 * @param itemToRemove - The item to remove from the array. 
 * @returns An new array, removed of itemToRemove. If itemToRemove isn't contained by items, returns a copy of
 * the items array. 
 */
export function removeItemWithId<T extends {id: number}>(items: T[], itemToRemove: T): T[] {
    return items.filter(({id}) => id !== itemToRemove.id)
}

/**
 * Determines if there is an intersection between the items of the given pair of arrays. 
 * @param items1 - An array of elements of any type. 
 * @param items2 - An array of elements of any type. 
 * @returns A boolean value that indicates whether or not there is at least one common item between the arrays. 
 */
export function arraysIntersect<T>(items1: T[], items2: T[]): boolean {
    const items2Set: Set<T> = new Set<T>(items2)
    return items1.some(item => items2Set.has(item))
}

/**
 * Determines if an array (array) contains each of the elements of another array (of). 
 * @param array - A source array on which the membership of all items of 'of' will be analyzed. 
 * @param of - An array whose elements must all be present in array. 
 * @returns A boolean value that indicates whether or not the given array contains each of the elements of the 'of' array. 
 */
export function containsAllElements<T>(array: T[], of: T[]): boolean {
    const arraySet: Set<T> = new Set<T>(array)
    return of.every(element => arraySet.has(element))
}