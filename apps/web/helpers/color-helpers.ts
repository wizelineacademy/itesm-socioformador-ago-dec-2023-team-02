/**
 * Miscellaneous functions for working with colors represented as hex values of 3 or 6 elements.
 */

/**
 * Finds the relative luminance of a color, that is, how bright it is perceived to be. 
 * @param hexColor - A string representing a hexadecimal color value.
 * @returns A number, ranging from 0 to 1, where 1 indicates the highest level of perceived brightness. 
 */
export function colorLuminance(hexColor: string): number {
    const cleanedHexColor: string = hexColor.replace("#", "") 
    return cleanedHexColor.length === 6 ? colorLuminanceSixDigits(cleanedHexColor) : colorLuminanceThreeDigits(cleanedHexColor)
}

/**
 * Finds the relative luminance of a color, that is, how bright it is perceived to be.
 * @param hexColor - A string representing a hexadecimal color value, of six digits. 
 * @returns A number, ranging from 0 to 1, where 1 indicates the highest level of perceived brightness. 
 */
function colorLuminanceSixDigits(hexColor: string): number {
    const r: number = parseInt(hexColor.slice(0,2), 16) / 255
    const g: number = parseInt(hexColor.slice(2,4), 16) / 255
    const b: number = parseInt(hexColor.slice(4,6), 16) / 255 

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Finds the relative luminance of a color, that is, how bright it is perceived to be.
 * @param hexColor - A string representing a hexadecimal color value, of three digits. 
 * @returns A number, ranging from 0 to 1, where 1 indicates the highest level of perceived brightness. 
 */
function colorLuminanceThreeDigits(hexColor: string): number {
    const r: number = parseInt(hexColor[0], 16) / 255
    const g: number = parseInt(hexColor[1], 16) / 255
    const b: number = parseInt(hexColor[2], 16) / 255 

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function randomHexColor(): string {
    let color = "#"

    for (let i = 0; i < 6; i++){
        color += randomHexCharacter()
    }
    
    return color
}

export function randomHexCharacter(): string {
    return randomNumberBetween(0, 15).toString(16)
}

export function randomNumberBetween(min: number, max: number): number {
    return Math.round(Math.random() * Math.abs(max - min)) + min 
}