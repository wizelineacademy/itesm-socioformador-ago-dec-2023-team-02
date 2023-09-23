import type { Tag, Conversation, Prisma } from "@prisma/client";
import prisma from "./prisma";

/**
 * Retrieves all conversations from the database that match the given user ID.
 * @param idUser - The ID of the user to filter conversations.
 * @returns An object containing either an array of conversations (excluding messages and conversation parameters), a message of no conversations found or an error message.
 */
export async function getAllConversationsByUserId(
  idUser: number
): Promise<{ conversations?: Conversation[]; message?: string; error?: any }> {
  try {
    // Search all conversations in the database that match the user ID
    const conversations: Conversation[] = await prisma.conversation.findMany({
      where: {
        idUser, // User id to filter conversations
        active: true, // Only fetch active conversations
      },
      include: {
        messages: false, // Do not include messages from each conversation
        conversationParameters: false, //Do not include conversation parameters from each conversation
        tags: true, // Include tags from each conversation
        model: true, // Include model from each conversation
      },
    });

    // if there are no conversations, return a message indicating that there are none
    if (conversations.length === 0) {
      return { message: "No conversations found for this user" };
    }

    //return found conversations
    return { conversations };
  } catch (error: any) {
    // Handle any errors that occur during the fetch
    return { error };
  }
}

/**
 * Retrieves a conversation from the database by its ID, along with all its details.
 * @param id - The ID of the conversation to retrieve.
 * @returns An object containing the retrieved conversation, or an error message if the conversation is not found.
 */
export async function getConversationById(
  id: number
): Promise<{ conversation?: Conversation; message?: string; error?: any }> {
  try {
    // Fetch the conversation from the database that matches the given ID
    const conversation: Conversation | null =
      await prisma.conversation.findUnique({
        where: {
          id, // Conversation ID to filter
        },
        // Include additional models (relations) in the result
        include: {
          user: true, // Include user details
          model: true, // Include model details
          messages: true, // Include messages in the conversation
          tags: true, // Include tags associated with the conversation
          conversationParameters: true, // Include conversation parameters
        },
      });

    // If the conversation is not found, return a message indicating so
    if (!conversation) {
      return { message: "Conversation not found" };
    }

    // Return the found conversation along with all its details
    return { conversation };
  } catch (error: any) {
    // Handle any errors that occur during the fetch
    return { error };
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
 * @returns An object containing either the updated conversation or an error message.
 */
export async function updateConversationById(
  id: number, // The ID of the conversation to update
  updatedInfo: UpdatedInfo, // The new information to update the conversation with
  includeRelatedEntities: boolean // Whether to include related entities in the returned conversation object
): Promise<{ conversation?: Conversation; message?: string; error?: any }> {
  try {
    // Attempt to update the conversation in the database
    const conversation: Conversation | null = await prisma.conversation.update({
      where: { id }, // Specify which conversation to update by its ID
      data: {
        // Set the new data for the conversation
        tags: updatedInfo.tags ? { set: updatedInfo.tags } : undefined, // Update the tags if provided
        title: updatedInfo.title || undefined, // Update the title if provided
      },
      include: includeRelatedEntities
        ? {
            // Include these related entities only if includeRelatedEntities is true
            user: true, // Include details of the associated user
            model: true, // Include details of the associated model
            messages: true, // Include messages in the conversation
            tags: true, // Include tags associated with the conversation
            conversationParameters: true, // Include conversation parameters
          }
        : {
            tags: true, // Include tags associated with the conversation
          },
    });

    // Check if the conversation was found and updated
    if (!conversation) {
      return { message: "Conversation not found" }; // Return a message if the conversation was not found
    }

    // Return the updated conversation
    return { conversation };
  } catch (error: any) {
    // Handle and return any errors that occur
    return { error };
  }
}

/**
 * Deletes a conversation from the database by setting its 'active' field to false.
 * @param id - The ID of the conversation to delete.
 * @returns An object with a message indicating whether the conversation was successfully marked as inactive or not, or an error if one occurred.
 */
export async function deleteConversationById(
  id: number
): Promise<{ message?: string; error?: any }> {
  try {
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
      return { message: "Conversation not found" };
    }

    // Return a message indicating the conversation is now inactive
    return { message: "Conversation marked as inactive" };
  } catch (error: any) {
    // Handle any errors that occur during the update
    return { error };
  }
}

/**
 * Marks all conversations associated with a given user as inactive.
 * @param idUser - The ID of the user whose conversations will be marked as inactive.
 * @returns An object containing a message indicating the conversations are now inactive and the number of conversations that were updated, or an error object if an error occurred during the update.
 */
export async function deleteAllConversationsByUserId(
  idUser: number
): Promise<{ message?: string; count?: number; error?: any }> {
  try {
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
      return { message: "No conversations found for this user" };
    }

    // Return a message indicating the conversations are now inactive
    return {
      message: "Conversations marked as inactive",
      count: updateResponse.count,
    };
  } catch (error: any) {
    // Handle any errors that occur during the update
    return { error };
  }
}
