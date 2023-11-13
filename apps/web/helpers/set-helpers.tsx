/**
 * Various generic functions for operating on sets without side-effects. 
 */


/**
 * Adds a new item to the given set. If the item is already present in the set, no changes are made. 
 * @param itemToAdd - The item to add to the set. 
 * @param set - A JavaScript set, to which the item will be added. 
 * @returns An new set, containing the given item. 
 */
export function addItemToSet<T>(itemToAdd: T, set: Set<T>): Set<T> {
    const setCopy: Set<T> = new Set<T>(set)
    setCopy.add(itemToAdd)
    return setCopy
}

/**
 * Removes an item from the given set. If the item isn't present in the set, no changes are made. 
 * @param itemToRemove - The item to remove from the set. 
 * @param set - A JavaScript set, from which the item will be removed. 
 * @returns An new set, removed of the given item. 
 */
export function removeItemFromSet<T>(itemToRemove: T, set: Set<T>): Set<T> {
    const setCopy: Set<T> = new Set<T>(set)
    setCopy.delete(itemToRemove)
    return setCopy
}

/**
 * Converts a JavaScript set into an array. 
 * @param set - A JavaScript set to transform into an array.
 * @returns An array holding the items present in the given set. 
 */
export function setToArray<T>(set: Set<T>): T[] {
    return Array.from(set)
}

/**
 * Determines whether two sets are equal. 
 * @param setA - A set to compare to setB. 
 * @param setB - A set to compare to setA. 
 * @returns A boolean value that indicates if the two given sets have the same items.
 */
export function setsAreEqual<T>(setA: Set<T>, setB: Set<T>): boolean {
   return setA.size === setB.size && Array.from(setA).every((setItem) => setB.has(setItem))
}