/**
 * This module contains functions to interact with the Conversation model in the database.
 * @packageDocumentation
 */

import type { Tag, Conversation, Prisma } from "@prisma/client";
import type { PrismaResponse } from "@/types/PrismaClientTypes";
import prisma from "./prisma";

/**
 * Retrieves all conversations from the database that match the given user ID.
 * @param idUser - The ID of the user to filter conversations.
 * @returns An object containing either an array of conversations or an error object.
 */
export async function getAllConversationsByUserId(
  idUser: number
): Promise<PrismaResponse<Conversation[]>> {
  try {
    // Validate idUser
    if (!idUser || idUser <= 0) {
      return { status: 400, message: 'Invalid user ID' };
    }

    // Check if the user exists in the database
    const userExists = await prisma.user.findUnique({
      where: { id: idUser },
    });

    if (!userExists) {
      return { status: 404, message: 'User not found' };
    }

    // Search all conversations in the database that match the user ID
    const conversations: Conversation[] = await prisma.conversation.findMany({
      where: {
        idUser, // User id to filter conversations
        active: true, // Only fetch active conversations
      },
      include: {
        messages: false, // Do not include messages from each conversation
        tags: true, // Include tags from each conversation
        model: true, // Include model from each conversation
      },
    });

    // If there are no conversations, return a message indicating that there are none
    if (conversations.length === 0) {
      return { status: 404, message: 'No conversations found for this user' };
    }

    // Return found conversations
    return { data: conversations, status: 200 };
  } catch (error: any) {
    // Handle any errors that occur during the fetch
    return { status: 500, message: error.message };
  }
}



/**
 * Retrieves a conversation from the database by its ID, along with all its details.
 * @param id - The ID of the conversation to retrieve.
 * @returns An object containing the retrieved conversation, or an error message if the conversation is not found.
 */
export async function getConversationById(
  id: number
): Promise<PrismaResponse<Conversation>> {
  try {
    // Validate id
    if (!id || id <= 0) {
      return { status: 400, message: 'Invalid conversation ID' };
    }

    // Fetch the conversation from the database that matches the given ID
    const conversation: Conversation | null = await prisma.conversation.findUnique({
      where: {
        id, // Conversation ID to filter
      },
      // Include additional models (relations) in the result
      include: {
        user: true, // Include user details
        model: true, // Include model details
        messages: true, // Include messages in the conversation
        tags: true, // Include tags associated with the conversation
      },
    });

    // If the conversation is not found, return a message indicating so
    if (!conversation) {
      return { status: 404, message: 'Conversation not found' };
    }

    // Return the found conversation along with all its details
    return { data: conversation, status: 200 };
  } catch (error: any) {
    // Handle any errors that occur during the fetch
    return { status: 500, message: error.message };
  }
}

/**
 * Represents the updated information for a conversation.
 */
interface UpdatedInfo {
  tags?: Tag[]; // Array of tags associated with the conversation.
  title?: string; //The updated title of the conversation.
}


/**
 * Updates a conversation in the database by its ID.
 * @param id - The ID of the conversation to update.
 * @param updatedInfo - The new information to update the conversation with.
 * @param includeRelatedEntities - Whether to include related entities in the returned conversation object.
 * @returns An object containing either the updated conversation or an error object.
 */
export async function updateConversationById(
  id: number,
  updatedInfo: UpdatedInfo,
  includeRelatedEntities: boolean
): Promise<PrismaResponse<Conversation>> {
  try {
    // Validate id
    if (!id || id <= 0) {
      return { status: 400, message: 'Invalid conversation ID' };
    }

    // Validate title if provided
    if (updatedInfo.title && updatedInfo.title.trim() === '') {
      return { status: 400, message: 'Title cannot be empty' };
    }

    // Attempt to update the conversation in the database
    const conversation: Conversation | null = await prisma.conversation.update({
      where: { id },
      data: {
        tags: updatedInfo.tags ? { set: updatedInfo.tags } : undefined,
        title: updatedInfo.title || undefined,
      },
      include: includeRelatedEntities
        ? {
            user: true,
            model: true,
            messages: true,
            tags: true,
          }
        : {
            tags: true,
          },
    });

    // Check if the conversation was found and updated
    if (!conversation) {
      return { status: 404, message: 'Conversation not found' };
    }

    // Return the updated conversation
    return { data: conversation, status: 200 };
  } catch (error: any) {
    // Handle and return any errors that occur
    return { status: 500, message: error.message };
  }
}

/**
 * Deletes a conversation from the database by setting its 'active' field to false.
 * @param id - The ID of the conversation to delete.
 * @returns An object with a message indicating whether the conversation was successfully marked as inactive or not, or an error if one occurred.
 */
export async function deleteConversationById(
  id: number
): Promise<PrismaResponse<null>> {
  try {
    // Validate id
    if (!id || id <= 0) {
      return { status: 400, message: 'Invalid conversation ID' };
    }

    // Update the 'active' field of the conversation in the database that matches the given ID
    const conversation: Conversation | null = await prisma.conversation.update({
      where: {
        id, // Conversation ID to filter
      },
      data: {
        active: false, // Set the 'active' field to false
      },
    });

    // If the conversation is not found, return a message indicating so
    if (!conversation) {
      return { status: 404, message: 'Conversation not found' };
    }

    // Return a message indicating the conversation is now inactive
    return { status: 200, message: 'Conversation marked as inactive' };
  } catch (error: any) {
    // Handle any errors that occur during the update
    return { status: 500, message: error.message };
  }
}

/**
 * Marks all conversations associated with a given user as inactive.
 * @param idUser - The ID of the user whose conversations will be marked as inactive.
 * @returns An object containing a message indicating the conversations are now inactive and the number of conversations that were updated, or an error object if an error occurred during the update.
 */
export async function deleteAllConversationsByUserId(
  idUser: number
): Promise<PrismaResponse<{ count: number }>> {
  try {
    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: idUser },
    });
    if (!userExists) {
      return { status: 404, message: 'User ID does not exist' };
    }

    // Update the 'active' field of all conversations that match the given user ID
    const updateResponse: Prisma.BatchPayload =
      await prisma.conversation.updateMany({
        where: {
          idUser, // Filter conversations by user ID
        },
        data: {
          active: false, // Set the 'active' field to false to mark them as inactive
        },
      });

    // Check if any conversations were updated
    if (updateResponse.count === 0) {
      return { status: 404, message: 'No conversations found for this user' };
    }

    // Return a message indicating the conversations are now inactive
    return {
      status: 200,
      message: 'Conversations marked as inactive',
      data: { count: updateResponse.count },
    };
  } catch (error: any) {
    // Handle any errors that occur during the update
    return { status: 500, message: error.message };
  }
}