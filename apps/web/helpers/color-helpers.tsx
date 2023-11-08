
export function colorLuminance(hexColor: string): number {
    const cleanedHexColor: string = hexColor.replace("#", "") 
    return cleanedHexColor.length === 6 ? colorLuminanceSixDigits(cleanedHexColor) : colorLuminanceThreeDigits(cleanedHexColor)
}

function colorLuminanceSixDigits(hexColor: string): number {
    const r: number = parseInt(hexColor.slice(0,2), 16) / 255
    const g: number = parseInt(hexColor.slice(2,4), 16) / 255
    const b: number = parseInt(hexColor.slice(4,6), 16) / 255 

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function colorLuminanceThreeDigits(hexColor: string): number {
    const r: number = parseInt(hexColor[0], 16) / 255
    const g: number = parseInt(hexColor[1], 16) / 255
    const b: number = parseInt(hexColor[2], 16) / 255 

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}