

export function addItemToSet<T>(itemToAdd: T, set: Set<T>): Set<T> {
    const setCopy: Set<T> = new Set<T>(set)
    setCopy.add(itemToAdd)
    return setCopy
}

export function removeItemFromSet<T>(itemToRemove: T, set: Set<T>): Set<T> {
    const setCopy: Set<T> = new Set<T>(set)
    setCopy.delete(itemToRemove)
    return setCopy
}