/**
 * Various functions to operate on string variables. 
 */

/**
 * Prepares a string variable for string matching, by removing uppercase characters and whitespaces. 
 * @param str - The string variable to clean. 
 * @returns A potentially modified string, removed of its uppercase characters and whitespaces. 
 */
export function cleanString(str: string): string {
    return str.toLowerCase().replace(/\s/g, '')
}

/**
 * Determines to what degree, from 0 to 1, two strings are similar. The function measures how similar two string are with 
 * the following expression: (length of the largest common substring between the two) / (length of the smallest of the two strings). 
 * @param str1 - A string variable whose degree of similarity will be measured with str2. 
 * @param str2 - A string variable whose degree of similarity will be measured with str1. 
 * @returns A number that indicates how similar the given strings are; ranges from 0 to 1. 
 */
export function findMatchRatio(str1: string, str2: string): number {
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
export function lcsSize(str1: string, str2: string): number {
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

/**
 * Removes from a string, if present, every whitespace found at its start. 
 * @param str - A string whose leading whitespaces will be removed.
 * @returns A new string, removed of its leading whitespaces.
 */
export function trimLeadingSpaces(str: string): string {
    return str.replace(/^\s+/, "")
}

export function imposeMaxLength(str: string, maxLength: number): string {
    return str.length <= maxLength ? str : str.slice(0, maxLength)
}