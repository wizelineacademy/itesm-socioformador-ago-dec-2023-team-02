
import { encode } from 'gpt-tokenizer';

/**
 * Calculates the credits required for a given number of tokens, based on the model and whether the message was user-created or output by the model.
 * @param tokens The number of tokens to calculate credits for.
 * @param model The GPT model being used.
 * @param isInput Whether the message was user-created or output by the model.
 * @returns The number of credits required for the given number of tokens.
 */
export function calculateCredits(tokens: number, model: string, isInput: boolean): number {
    // Checks if the message was user created or output by the model to determine the price
    let price: number
    if (isInput) {
        price = model === 'gpt-3.5-turbo' ? Number(process.env.NEXT_PUBLIC_GPT_35_INPUT) : Number(process.env.NEXT_PUBLIC_GPT_4_INPUT)
    } else {
        price = model === 'gpt-3.5-turbo' ? Number(process.env.NEXT_PUBLIC_GPT_35_OUTPUT) : Number(process.env.NEXT_PUBLIC_GPT_4_OUTPUT)
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