
import { encode } from "gpt-tokenizer";

/**
 * Calculates the credits required for a given number of tokens, based on the model and whether the message was user-created or output by the model.
 * @param tokens The number of tokens to calculate credits for.
 * @param model The OpenAI model being used.
 * @param isInput Whether the message was user-created or output by the model.
 * @param size Image resolution necessary to calculate credits for image models.
 * @returns The number of credits required for the given number of tokens.
 */
export function calculateCredits(tokens: number, model: string, isInput: boolean, size?: string): number {
    // Checks if the message was user created or output by the model to determine the price
    let price: number
    if (model === "dalle") {
        if (size === "256x256")
            return Number(process.env.NEXT_PUBLIC_DALLE_256)
        else if (size === "512x512")
            return Number(process.env.NEXT_PUBLIC_DALLE_512)
        else if (size === "1024x1024")
            return Number(process.env.NEXT_PUBLIC_DALLE_1024)
        else
            return 0.00
    } else if (isInput) {
        price = model === "gpt-3.5-turbo" ? Number(process.env.NEXT_PUBLIC_GPT_35_INPUT) : Number(process.env.NEXT_PUBLIC_GPT_4_INPUT)
    } else {
        price = model === "gpt-3.5-turbo" ? Number(process.env.NEXT_PUBLIC_GPT_35_OUTPUT) : Number(process.env.NEXT_PUBLIC_GPT_4_OUTPUT)
    }
    // GPT pricing per 1000 tokens
    return (tokens / 1000) * price
}

/**
 * Calculates the number of tokens for a given input string.
 * @param input The input string to calculate tokens for.
 * @returns The number of tokens in the input string.
 */
export function calculateTokens(input: string): number {
    const tokens: number[] = encode(input)
    return tokens.length
}