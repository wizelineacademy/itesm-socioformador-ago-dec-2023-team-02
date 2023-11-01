import type { Message as WizepromptMessage } from "@prisma/client";
import type { Message } from "ai/react"

/**
 * Converts a WizepromptMessage to a Message object compatible with GPT.
 * @param item The WizepromptMessage to convert.
 * @returns The converted Message object.
 */
export function convertToGptMessage(item: WizepromptMessage): Message {
    const role: "function" | "user" | "assistant" | "system" = item.sender === "USER" ? "user" : "assistant";
    return {
        id: String(item.id),
        role,
        content: item.content,
    };
}