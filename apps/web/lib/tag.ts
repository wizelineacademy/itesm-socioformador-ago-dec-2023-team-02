/**
 * This module contains functions to interact with the Tag model in the database.
 * @packageDocumentation
 */

import type { Tag } from "@prisma/client";
import type { PrismaResponse } from "@/types/prisma-client-types";
import prisma from "./prisma";

function isValidTagName(name: string): boolean {
    return name.length > 0 // Más validación podría ser añadida. 
}

function isValidTagColor(color: string): boolean {
    return /^#[0-9a-fA-F]{6}$/.test(color) // El color es representado con un hexadecimal de 6 digitos. 
}

/**
 * Retrieves the tag that has the given tag ID. 
 * @param idTag - The ID of the tag to retrieve. 
 * @returns Promise that resolves to an object that implements PrismaResponse<Tag>, and that potentially contains the fetched Tag. 
 */
export async function getTag(idTag: number): Promise<PrismaResponse<Tag>> {
    try {
        const tag: Tag | null = await prisma.tag.findUnique({
            where: {
                id: idTag
            }
        })

        return tag === null ? {status: 404, message: "No tag was found"} : {status: 200, data: tag}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Retrieves all tags belonging to the user that has the given user ID. 
 * @param idUser - The ID of the user whose tags are to retrieve (number).  
 * @returns A Promise that resolves to an object that implements PrismaResponse<Tag>, and that potentially contains an array (Tag[]) that 
 * holds all tags of the selected user. 
 */
export async function getAllTagsByUserID(idUser: number): Promise<PrismaResponse<Tag[]>> {
    try {
        if (await prisma.user.findUnique({where: {id: idUser}}) === null) {
            return {status: 400, message: "Invalid user ID given."}
        }

        const tags: Tag[] = await prisma.tag.findMany({
            where: {
                id: idUser
            }
        })

        return {status: 200, data: tags}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Retrieves all tags belonging to the conversation that has the given conversation ID. 
 * @param idConversation - The ID of the conversation whose tags are to be retrieved (number).  
 * @returns A Promise that resolves to an object that implements PrismaResponse<Tag>, and that potentially contains an array (Tag[]) that 
 * holds all tags of the selected conversation. 
 */
export async function getAllTagsByConversationID(idConversation: number): Promise<PrismaResponse<Tag[]>> {
    try {
        if (await prisma.conversation.findUnique({where: {id: idConversation}}) === null) {
            return {status: 400, message: "Invalid conversation ID given."}
        }

        const tags: Tag[] = await prisma.tag.findMany({
            where: {
                conversations: {
                    some: {
                        id: idConversation
                    }
                }
            }
        })

        return {status: 200, data: tags}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Creates a new tag with the given parameters, for the user that has the provided user ID.  
 * @param idUser - The ID of the user to whom the new tag will be associated (number). 
 * @param name - The descriptive name that identifies the created tag (string). 
 * @param color - The color value associated to the created tag (string). 
 * @returns A Promise that resolves to an object that implements PrismaResponse<Tag>, and that potentially contains the created Tag.  
 */
export async function createTagForUser(idUser: number, name: string, color: string): Promise<PrismaResponse<Tag>> {
    if (!isValidTagName(name) || !isValidTagColor(color)) {
        return {status: 400, message: "Invalid name or color value given."}
    }

    try {
        if (await prisma.user.findUnique({where: {id: idUser}}) === null) {
            return {status: 400, message: "Invalid user ID given."}
        }

        const tag: Tag = await prisma.tag.create({
            data: {
                idUser, 
                name,
                color
            }
        })
        return {status: 200, data: tag}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Deletes the tag associated to the given tag ID.   
 * @param idTag - The ID of the tag to delete (number). 
 * @returns A Promise that resolves to an object that implements PrismaResponse<Tag>, and that potentially contains the deleted Tag.  
 */
export async function deleteTag(idTag: number): Promise<PrismaResponse<Tag>> {
    try {
        const tag: Tag = await prisma.tag.delete({
            where: {
                id: idTag
            }
        })
        return {status: 200, data: tag}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Updates the tag associated to the given tag ID, with the provided values. 
 * @param idTag - The ID of the tag to edit (number). 
 * @param name - The descriptive name that identifies the created tag (string). 
 * @param color - The color value associated to the created tag (string). 
 * @returns A Promise that resolves to an object that implements PrismaResponse<Tag>, and that potentially contains the updated Tag.  
 */
export async function editTag(idTag: number, name: string, color: string): Promise<PrismaResponse<Tag>> {
    if (!isValidTagName(name) || !isValidTagColor(color)) {
        return {status: 400, message: "Invalid name or color value given."}
    }
    
    try {
        const tag: Tag = await prisma.tag.update({
            where: {
                id: idTag
            }, 
            data: {
                name,
                color
            }
        })
        return {status: 200, data: tag}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}