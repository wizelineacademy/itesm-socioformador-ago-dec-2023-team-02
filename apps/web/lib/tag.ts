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

        return tag === null ? { status: 404, message: "No tag was found" } : { status: 200, data: tag }
    } catch (error: any) {
        return { status: 500, message: error.message }
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
        if (await prisma.user.findUnique({ where: { id: idUser } }) === null) {
            return { status: 400, message: "Invalid user ID given." }
        }

        const tags: Tag[] = await prisma.tag.findMany({
            where: {
                id: idUser
            }
        })

        return { status: 200, data: tags }
    } catch (error: any) {
        return { status: 500, message: error.message }
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
        if (await prisma.conversation.findUnique({ where: { id: idConversation } }) === null) {
            return { status: 400, message: "Invalid conversation ID given." }
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

        return { status: 200, data: tags }
    } catch (error: any) {
        return { status: 500, message: error.message }
    }
}


/**
 * Represents the creation information for a tag.
 */
interface TagInput {
    name: string;
    color: string;
}


/**
 * Creates a new tag for a given user.
 * @param idUser - The ID of the user for whom the tag is being created.
 * @param tagInput - The input data for the new tag.
 * @returns A promise that resolves to a PrismaResponse object containing either the created tag or an error message.
 */
export async function createTag(idUser: number, tagInput: TagInput): Promise<PrismaResponse<Tag>> {
    // Trim name and color
    tagInput.name = tagInput.name.trim();
    tagInput.color = tagInput.color.trim();

    // Validar idUser, name y color
    if (idUser <= 0 || !tagInput.name || !tagInput.color || !isValidTagName(tagInput.name) || !isValidTagColor(tagInput.color)) {
        return { status: 400, message: "Invalid user ID, name, or color value given." }
    }

    try {
        // Verificar la existencia del usuario
        if (await prisma.user.findUnique({ where: { id: idUser } }) === null) {
            return { status: 400, message: "Invalid user ID given." }
        }

        // Crear el tag en la base de datos
        const tag: Tag = await prisma.tag.create({
            data: {
                idUser,
                name: tagInput.name,
                color: tagInput.color,
            }
        });

        return { status: 200, data: tag };
    } catch (error: any) {
        return { status: 500, message: error.message };
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
        return { status: 200, data: tag }
    } catch (error: any) {
        return { status: 500, message: error.message }
    }
}

/**
 * Represents the updated information for a tag.
 */
interface TagUpdateInput {
    name?: string;
    color?: string;
}


/**
 * Updates a tag with the given ID and update data.
 * @param idTag - The ID of the tag to update.
 * @param updateData - The data to update the tag with.
 * @returns A promise that resolves to a PrismaResponse object containing the status and data of the updated tag, or an error message if the update fails.
 */
export async function updateTag(idTag: number, updateData: TagUpdateInput): Promise<PrismaResponse<Tag>> {
    // Validate ID
    if (idTag <= 0) {
        return { status: 400, message: 'Invalid tag ID' };
    }

    // Trim name and color if provided
    if (updateData.name) {
        updateData.name = updateData.name.trim();
    }
    if (updateData.color) {
        updateData.color = updateData.color.trim();
    }

    // Validate name and color
    if ((updateData.name && updateData.name.length < 3) || (updateData.color && !/^#[0-9A-F]{6}$/i.test(updateData.color))) {
        return { status: 400, message: 'Invalid name or color value given.' }
    }

    try {
        const tag: Tag = await prisma.tag.update({
            where: {
                id: idTag
            },
            data: {
                name: updateData.name,
                color: updateData.color
            }
        })
        return { status: 200, data: tag }
    } catch (error: any) {
        return { status: 500, message: error.message }
    }
}