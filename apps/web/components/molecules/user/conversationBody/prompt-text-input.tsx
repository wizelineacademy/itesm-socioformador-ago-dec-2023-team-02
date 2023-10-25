/**
 * A component that renders a text input field and a send button for the user to send messages.
 * @param input - The current value of the text input field.
 * @param handleInputChange - A function that handles changes to the text input field.
 * @param handleSubmit - A function that handles the submission of the text input field.
 * @returns A React component that renders a text input field and a send button.
 */

"use client";
import React from "react";
import { Textarea, Button } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";
import CreditsBadge from "@/components/atoms/credits-badge";
import type { MessageDataInput } from "@/lib/message";
import { Sender } from "@prisma/client";
import { calculateTokens, calculateCredits } from "@/lib/helper/gpt/credits-and-tokens";


/**
 * Saves a message to the server.
 * @param message The message data to be saved.
 * @returns A Promise that resolves when the message is successfully saved, or rejects if an error occurs.
 */
async function saveMessage(message: MessageDataInput): Promise<void> {
    try {
        await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify(message)
        });
    } catch {
        console.log("Error ocurred while saving message.")
    }
}

export default function PromptTextInput({ input, handleInputChange, handleSubmit }: { input: string, handleInputChange: any, handleSubmit: any }) {
    return (
        <div className="w-full fixed bottom-0 pb-4 z-10 gradient-shadow-light dark:gradient-shadow-dark py-0">
            <div className="flex flex-col justify-center items-center max-w-[750px] md:w-11/12 mx-auto p-2">
                <div className="flex justify-between items-center w-full mt-2 mb-1">
                    {/* Tokens Placeholder */}
                    <div className={`${!input ? "hidden" : ""} ml-2`}>
                        <CreditsBadge creditsUsed={calculateTokens(input)} />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex items-center w-full rounded-xl">
                    {/* Textarea field */}
                    <Textarea
                        placeholder="Send Message"
                        className="flex-grow p-0 mr-2"
                        variant="faded"
                        maxRows={2}
                        value={input}
                        onChange={handleInputChange}
                    />
                    {/* Send button */}
                    <Button
                        disabled={!input}
                        size="lg"
                        isIconOnly
                        variant="flat"
                        className={`${!input ? "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10": "bg-red-500" } text-white  rounded-r-xl`}
                        // Saves user's message when the send button is clicked
                        onClick={() => {
                            const tokens: number = calculateTokens(input)
                            const messageInfo: MessageDataInput = {
                                idConversation: 1,
                                content: input,
                                sender: Sender.USER,
                                creditsUsed: calculateCredits(tokens, 'gpt-4', true)
                            }
                            void saveMessage(messageInfo)
                        }}
                        type="submit"
                    >
                        <IoMdSend className="text-lg" />
                    </Button>
                </form>
                {/* Footer */}
                <div className="absolute bottom-1 w-full text-center">
                    <p className="p-0 m-0 text-xs text-slate-400 dark:text-slate-400 wizeline-brand:text-slate-200 text-center">
                        © 2023 Team SAM, developed by Wizeline.
                    </p>
                </div>

            </div>
        </div>
    );
}
