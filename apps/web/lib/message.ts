/**
 * This module contains functions to interact with the Message model in the database.
 * @packageDocumentation
 */

import type { Message } from "@prisma/client";
import { Sender } from "@prisma/client";
import type { PrismaResponse } from "@/types/PrismaClientTypes";
import prisma from "./prisma";




/**
 * Retrieves all messages related to a conversation from the database using Prisma.
 * @param idConversation - The ID of the conversation to retrieve messages from.
 * @returns A Promise that resolves to a PrismaResponse object containing the fetched messages or an error message.
 */
export async function getAllMessages(idConversation: number): Promise<PrismaResponse<Message[]>> {
    try {
        // Validate input parameters
        if (!idConversation) {
            return { status: 400, message: 'Invalid input parameters' };
        }

        // Validate if the conversation exists
        const conversation = await prisma.conversation.findUnique({
            where: { id: idConversation },
        });
        if (!conversation) {
            return { status: 404, message: 'Conversation not found' };
        }

        // Fetch all messages related to the conversation from the database using Prisma
        const messages: Message[] = await prisma.message.findMany({
            where: { idConversation },
        });

        return { data: messages, status: 200 }; // Return the fetched messages
    } catch (error: any) {
        return { status: 500, message: error.message }; // Return error message
    }
}



/**
 * Fetches a message from the database using its ID.
 * @param id - The ID of the message to fetch.
 * @returns A promise that resolves to a PrismaResponse object containing either the fetched message or an error message.
 */
export async function getMessage(id: number): Promise<PrismaResponse<Message>> {
    try {
        // Fetch the message from the database using Prisma
        const message: Message | null = await prisma.message.findUnique({
            where: {
                id,
            },
        });

        // Validate if the message exists
        if (!message) {
            return { status: 404, message: 'Message not found' };
        }

        return { data: message, status: 200 }; // Return the fetched message
    } catch (error: any) {
        return { status: 500, message: error.message }; // Return error message
    }
}



/**
 * Creates a new message in the database using Prisma.
 * @param idConversation - The ID of the conversation to which the message belongs.
 * @param sender - The role of the sender of the message.
 * @param content - The content of the message.
 * @param creditsUsed - The number of credits used to send the message.
 * @returns A Promise that resolves to a PrismaResponse object containing the created message or an error message.
 */
export async function createMessage(
    idConversation: number,
    sender: Sender,
    content: string[],
    creditsUsed: number
): Promise<PrismaResponse<any>> {
    try {

        // Validate input parameters
        if (!idConversation || !sender || !content || !creditsUsed) {
            return { status: 400, message: 'Invalid input parameters' };
        }

        // Validate if the conversation exists
        const conversation = await prisma.conversation.findUnique({
            where: { id: idConversation },
        });
        if (!conversation) {
            return { status: 404, message: 'Conversation not found' };
        }

        // Validate if the sender role is valid
        if (!Object.values(Sender).includes(sender)) {
            return { status: 400, message: 'Invalid sender role' };
        }

        // Create the new message in the database using Prisma
        const newMessage = await prisma.message.create({
            data: {
                idConversation,
                content,
                creditsUsed,
                sender,
            },
        });

        return { data: newMessage, status: 201 }; // Return the created message
    } catch (error: any) {
        return { status: 500, message: error.message }; // Return error message
    }
}


//export async function updateMessage() { }


/**
 * Deletes a message from the database.
 * @param idMessage - The ID of the message to delete.
 * @returns A Promise that resolves to a PrismaResponse object containing the status and message.
 */
export async function deleteMessage(idMessage: number): Promise<PrismaResponse<any>> {
    try {
        // Validate input parameters (you can add more validations as needed)
        if (!idMessage) {
            return { status: 400, message: 'Invalid input parameters' };
        }

        // Validate if the message exists
        const message = await prisma.message.findUnique({
            where: { id: idMessage },
        });
        if (!message) {
            return { status: 404, message: 'Message not found' };
        }

        // Delete the message from the database using Prisma
        await prisma.message.delete({
            where: { id: idMessage },
        });

        return { status: 200, message: 'Message successfully deleted' }; // Return success message
    } catch (error: any) {
        return { status: 500, message: error.message }; // Return error message
    }
}

