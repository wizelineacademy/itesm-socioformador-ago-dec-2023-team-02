/**
 * This module contains functions to interact with the Tag model in the database.
 * @packageDocumentation
 */

import type { Tag } from "@prisma/client";
import type { PrismaResponse } from "@/types/PrismaClientTypes";
import prisma from "./prisma";
import { buildErrorMessage } from "./utils";

/**
 * Retrieves the tag that has the given tag ID. 
 * @param idTag - The ID of the tag to retrieve. 
 * @returns Promise that resolves to an object that implements PrismaResponse<Tag>, and that potentially contains the fetched Tag. 
 */
export async function getTag(idTag: number): Promise<PrismaResponse<Tag>> {
    try {
        const data: Tag = await prisma.tag.findUniqueOrThrow({
            where: {
                id: idTag
            }
        })
        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
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
        const data: Tag[] = await prisma.tag.findMany({
            where: {
                id: idUser
            }
        })

        return {status: 200, data}

    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
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
        const data: Tag[] = await prisma.tag.findMany({
            where: {
                conversations: {
                    some: {
                        id: idConversation
                    }
                }
            }
        })

        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
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
    try {
        const data: Tag = await prisma.tag.create({
            data: {
                idUser, 
                name,
                color
            }
        })
        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
    }
}

/**
 * Deletes the tag associated to the given tag ID.   
 * @param idTag - The ID of the tag to delete (number). 
 * @returns A Promise that resolves to an object that implements PrismaResponse<Tag>, and that potentially contains the deleted Tag.  
 */
export async function deleteTag(idTag: number): Promise<PrismaResponse<Tag>> {
    try {
        const data: Tag = await prisma.tag.delete({
            where: {
                id: idTag
            }
        })
        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
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
    try {
        const data: Tag = await prisma.tag.update({
            where: {
                id: idTag
            }, 
            data: {
                name,
                color
            }
        })
        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
    }
}