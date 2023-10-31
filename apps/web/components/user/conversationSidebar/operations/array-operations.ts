
export function addItem<T>(items: T[], itemToAdd: T): T[] {
    return [...items, itemToAdd]
}

export function removeItem<T>(items: T[], itemToRemove: T): T[] {
    return items.filter(item => item !== itemToRemove)
}

export function removeItemWithId<T extends {id: number}>(items: T[], itemToRemove: T): T[] {
    return items.filter(({id}) => id !== itemToRemove.id)
}

export function arraysIntersect<T>(items1: T[], items2: T[]): boolean {
    const items2Set: Set<T> = new Set<T>(items2)
    return items1.some(item => items2Set.has(item))
}

export function containsAllElements<T>(array: T[], of: T[]): boolean {
    const arraySet: Set<T> = new Set<T>(array)
    return of.every(element => arraySet.has(element))
}