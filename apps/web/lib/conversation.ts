/**
 * This module contains functions to interact with the Conversation model in the database.
 * @packageDocumentation
 */

import type { Conversation, Message, Prisma, Tag, User } from "@prisma/client";
import type { PrismaResponse } from "@/types/prisma-client-types";
import type { ConversationCreateData } from "@/types/conversation-types";
import { areValidModelParameters } from "@/types/model-parameters-types";
import type { ModelParameters } from "@/types/model-parameters-types";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import prisma from "./prisma";
import { deleteImage } from "./helper/storage/delete-image";

/**
 * Retrieves all conversations from the database that match the given user ID.
 * @param idUser - The ID of the user to filter conversations.
 * @returns An object containing either an array of conversations or an error object.
 */
export async function getAllConversationsByUserId(
  idUser: number
): Promise<PrismaResponse<SidebarConversation[]>> {
  try {
    // Validate idUser
    if (!idUser || idUser < 0) {
      return { status: 400, message: "Invalid user ID" };
    }

    // Check if the user exists in the database
    const userExists = await prisma.user.findUnique({
      where: { id: idUser },
    });

    if (!userExists) {
      return { status: 404, message: "User not found" };
    }

    // Search all conversations in the database that match the user ID
    const conversations: SidebarConversation[] =
      await prisma.conversation.findMany({
        where: {
          idUser, // User id to filter conversations
          active: true, // Only fetch active conversations
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          tags: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          active: true,
          model: {
            select: {
              name: true,
              provider: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      });

    // If there are no conversations, return a message indicating that there are none
    if (conversations.length === 0) {
      return { status: 404, message: "No conversations found for this user" };
    }

    // Return found conversations
    return { data: conversations, status: 200 };
  } catch (error: any) {
    // Handle any errors that occur during the fetch
    return { status: 500, message: error.message };
  }
}

/**
 * Retrieves all conversations from the database that match the given user ID.
 * @param idUser - The ID of the user to filter conversations.
 * @returns An object containing either an array of conversations or an error object.
 */
export async function getAllConversationsByUserAuthId(
  idAuth: string
): Promise<PrismaResponse<SidebarConversation[]>> {
  try {
    // Validate idUser
    if (!idAuth || idAuth.length === 0) {
      return { status: 400, message: "Invalid user ID" };
    }

    // Check if the user exists in the database
    const userExists = await prisma.user.findUnique({
      where: { idAuth0: idAuth },
    });

    if (!userExists) {
      return { status: 404, message: "User not found" };
    }

    // Search all conversations in the database that match the user ID
    const conversations: SidebarConversation[] =
      await prisma.conversation.findMany({
        where: {
          idUser: userExists.id, // User id to filter conversations
          active: true, // Only fetch active conversations
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          tags: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          active: true,
          model: {
            select: {
              name: true,
              provider: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      });

    // If there are no conversations, return a message indicating that there are none
    if (conversations.length === 0) {
      return { status: 404, message: "No conversations found for this user" };
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
      return { status: 400, message: "Invalid conversation ID" };
    }

    // Fetch the conversation from the database that matches the given ID
    const conversation: Conversation | null = await prisma.conversation.findUnique({
      where: {
        id, // Conversation ID to filter
      },
      include: {
        user: true, // Include user details
        model: {
          include: {
            provider: {
              select: {
                image: true, // Select only the image of the provider
              }
            }
          }
        },
        messages: {
          orderBy: {
            createdAt: 'asc', // Ordena los mensajes por fecha de creación, de más antiguo a más nuevo
          }
        },
        tags: true, // Include tags associated with the conversation
      },
    });
    
  /*
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
        },
      });
      */

    // If the conversation is not found, return a message indicating so
    if (!conversation) {
      return { status: 404, message: "Conversation not found" };
    }

    // Return the found conversation along with all its details
    return { data: conversation, status: 200 };
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
export async function getConversationAuthById(
  id: string
): Promise<PrismaResponse<Conversation>> {
  try {
    // Validate id
    if (!id || id.length === 0) {
      return { status: 400, message: "Invalid conversation ID" };
    }

    //get user from auth0 string
    const user : User | null = await prisma.user.findUnique({
      where: {
        idAuth0: id,
      },
    });

    //Validate user
    if (!user) {
      return { status: 400, message: "User not found" };
    }


    // Fetch the conversation from the database that matches the given ID
    const conversation: Conversation | null = await prisma.conversation.findUnique({
      where: {
        id: user.id, // Conversation ID to filter
      },
      include: {
        user: true, // Include user details
        model: {
          include: {
            provider: {
              select: {
                image: true, // Select only the image of the provider
              }
            }
          }
        },
        messages: {
          orderBy: {
            createdAt: 'asc', // Ordena los mensajes por fecha de creación, de más antiguo a más nuevo
          }
        },
        tags: true, // Include tags associated with the conversation
      },
    });
    
  /*
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
        },
      });
      */

    // If the conversation is not found, return a message indicating so
    if (!conversation) {
      return { status: 404, message: "Conversation not found" };
    }

    // Return the found conversation along with all its details
    return { data: conversation, status: 200 };
  } catch (error: any) {
    // Handle any errors that occur during the fetch
    return { status: 500, message: error.message };
  }
}

/**
 * Creates a new conversation in the database.
 * @param input - The conversation data input.
 * @returns A promise that resolves to a PrismaResponse containing the newly created conversation or an error message.
 */
export async function createConversation(
  input: ConversationCreateData
): Promise<PrismaResponse<SidebarConversation>> {
  try {
    const { idUser, idModel, title, tags} = input || {};
    const userId = Number(idUser);
    const modelId = Number(idModel);

    // Validate input
    if (!idUser || !idModel || !title) {
      return {
        status: 400,
        message: "Invalid input for creating conversation",
      };
    }

    // Validate that the user exists and fetch globalParameters if needed
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    // Validate that the model exists
    const model = await prisma.model.findUnique({
      where: {
        id: modelId,
      },
    });

    if (!model) {
      return { status: 404, message: "Model not found" };
    }

    // Prepare parameters based on useGlobalParameters flag
    const userGlobalParameters: string = JSON.stringify(user.globalParameters);
    const parameters: string = JSON.stringify(
      JSON.parse(userGlobalParameters)[model.name]
    );

    // Create a new conversation in the database
    const newConversation: SidebarConversation =
      await prisma.conversation.create({
        data: {
          title,
          idUser,
          idModel,
          parameters: parameters ? parameters : "", // Set parameters if applicable
          active: true, // Set the 'active' field to true by default
          tags: {
            connect: tags.map((tag) => {return {id: tag.id}})
          }
        },
        // Include additional models (relations) in the result
        select: {
          id: true,
          title: true,
          createdAt: true,
          tags: {
            select: {
              id: true,
              idUser: true,
              name: true,
              color: true,
            },
          },
          active: true,
          model: {
            select: {
              id: true,
              name: true,
              provider: {
                select: {
                  id: true,
                  image: true,
                },
              },
            },
          },
        },
      });

    // Return the newly created conversation
    return { data: newConversation, status: 201 };
  } catch (error: any) {
    // Handle any errors that occur during the creation
    return { status: 500, message: error.message };
  }
}

/**
 * Creates a new conversation in the database.
 * @param input - The conversation data input.
 * @returns A promise that resolves to a PrismaResponse containing the newly created conversation or an error message.
 */
export async function createConversationByUserAuthId(
  authId: string,
  input: ConversationCreateData
): Promise<PrismaResponse<SidebarConversation>> {
  try {
    const { idModel, title, tags} = input || {};
    const modelId = Number(idModel);

    // Validate input conversation creation
    if (!idModel || !title) {
      return {
        status: 400,
        message: "Invalid input for creating conversation",
      };
    }

    // Validate input user auth id
    if(!authId || authId.length === 0){
      return {
        status: 400,
        message: "User not found",
      };      
    }

    // get user through auth0 id
    const user = await prisma.user.findUnique({
      where: {
        idAuth0: authId,
      },
    });

    //Validate user exists
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    //get model through id
    const model = await prisma.model.findUnique({
      where: {
        id: modelId,
      },
    });

      // Validate that the model exists
    if (!model) {
      return { status: 404, message: "Model not found" };
    }

    // Prepare parameters based on useGlobalParameters flag
    const userGlobalParameters: string = JSON.stringify(user.globalParameters);
    const parameters: string = JSON.stringify(
      JSON.parse(userGlobalParameters)[model.name]
    );

    // Create a new conversation in the database
    const newConversation: SidebarConversation =
      await prisma.conversation.create({
        data: {
          title,
          idUser: user.id,
          idModel,
          parameters: parameters ? parameters : "", // Set parameters if applicable
          active: true, // Set the 'active' field to true by default
          tags: {
            connect: tags.map((tag) => {return {id: tag.id}})
          }
        },
        // Include additional models (relations) in the result
        select: {
          id: true,
          title: true,
          createdAt: true,
          tags: {
            select: {
              id: true,
              idUser: true,
              name: true,
              color: true,
            },
          },
          active: true,
          model: {
            select: {
              id: true,
              name: true,
              provider: {
                select: {
                  id: true,
                  image: true,
                },
              },
            },
          },
        },
      });

    // Return the newly created conversation
    return { data: newConversation, status: 201 };
  } catch (error: any) {
    // Handle any errors that occur during the creation
    return { status: 500, message: error.message };
  }
}

/**
 * Represents the updated information for a conversation.
 */
export interface UpdatedInfo {
  tags?: Tag[]; // Array of tags associated with the conversation.
  title?: string; //The updated title of the conversation.
  parameters?: JSON; // The updated parameters for the conversation.
  includeRelatedEntities?: boolean; // Whether to include related entities in the returned conversation object.
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
  updatedInfo: UpdatedInfo
): Promise<PrismaResponse<Conversation>> {
  try {
    // Validate id
    if (!id || id <= 0) {
      return { status: 400, message: "Invalid conversation ID" };
    }

    // Validate title if provided
    if (updatedInfo.title && updatedInfo.title.trim() === "") {
      return { status: 400, message: "Title cannot be empty" };
    }

    // Validate conversation exists in the database
    const existingConversation = await prisma.conversation.findUnique({
      where: { id },
    });

    if (!existingConversation) {
      return { status: 404, message: "Conversation not found" };
    }

    // Attempt to update the conversation in the database
    const conversation: Conversation | null = await prisma.conversation.update({
      where: { id },
      data: {
        tags: updatedInfo.tags ? { set: updatedInfo.tags } : undefined,
        title: updatedInfo.title || undefined,
        parameters: updatedInfo.parameters as any, // Add parameters to the update
      },
      include: updatedInfo.includeRelatedEntities
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
      return { status: 404, message: "Conversation not found" };
    }

    // Return the updated conversation
    return { data: conversation, status: 200 };
  } catch (error: any) {
    // Handle and return any errors that occur
    return { status: 500, message: error.message };
  }
}



/**
 * Updates the model parameters associated to the given conversation and used in the generation of promts.
 * @param id - The ID of the conversation whose parameters will be updated.
 * @param parameters - An object of type ModelParameters that holds the parameter values with which to update the conversation.
 * @returns Promise that resolves to an object that implements PrismaResponse<Conversation>, and that potentially contains the updated Conversation.
 */
export async function updateConversationParameters(
  id: number,
  parameters: ModelParameters
): Promise<PrismaResponse<Conversation>> {
  if (!areValidModelParameters(parameters)) {
    return { status: 400, message: "Invalid model parameters" };
  }

  try {
    const conversation: Conversation = await prisma.conversation.update({
      where: { id },
      data: {
        parameters: parameters as any,
      },
    });

    return { status: 200, data: conversation };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
}

/**
 * Deletes a conversation from the database by setting its 'active' field to false.
 * @param id - The ID of the conversation to delete.
 * @returns An object with a message indicating whether the conversation was successfully marked as inactive or not, or an error if one occurred.
 */
export async function deactivateConversationById(
  id: number
): Promise<PrismaResponse<null>> {
  try {
    // Validate id
    if (!id || id <= 0) {
      return { status: 400, message: "Invalid conversation ID" };
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
      return { status: 404, message: "Conversation not found" };
    }

    // Return a message indicating the conversation is now inactive
    return { status: 200, message: "Conversation marked as inactive" };
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
export async function deactivateAllConversationsByUserId(
  idUser: number
): Promise<PrismaResponse<{ count: number }>> {
  try {
    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: idUser },
    });
    if (!userExists) {
      return { status: 404, message: "User ID does not exist" };
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
      return { status: 404, message: "No conversations found for this user" };
    }

    // Return a message indicating the conversations are now inactive
    return {
      status: 200,
      message: "Conversations marked as inactive",
      data: { count: updateResponse.count },
    };
  } catch (error: any) {
    // Handle any errors that occur during the update
    return { status: 500, message: error.message };
  }
}

// Call the delete function for the s3 bucket
async function deleteImagesHandler(messageToDelete: Message) {
    // Delete the image from the s3 bucket if the message belongs to the model
    if (messageToDelete.sender === "MODEL") {
      await deleteImage(messageToDelete.content)
    }
  // })
}

/**
 * Deletes a conversation and all its associated messages from the database.
 * @param id - The ID of the conversation to delete.
 * @returns A promise that resolves to a PrismaResponse object indicating the status and message of the operation.
 */
export async function deleteConversationById(
  id: number
): Promise<PrismaResponse<null>> {
  try {
    // Validate the ID to ensure it's a positive integer
    if (!id || id <= 0) {
      return { status: 400, message: "Invalid conversation ID" };
    }

    // Retrieve the conversation's model
    const model = await prisma.conversation.findUnique({
      where: {
        id,
      },
      select: {
        model: {
          select: {
            name: true
          }
        }
      }
    })
    
    // Check if the model the conversation is using is dalle to delete the images from the bucket
    if (model?.model.name === "dalle"){
      // Get all the messages to delete
      const messagesToDelete = await prisma.message.findMany({
        where: {
          idConversation: id, // Filter messages by conversation ID
        }
      })
      // Call the delete function for the s3 bucket and delete the message from the database
      messagesToDelete.forEach((message: Message) => {
        deleteImagesHandler(message).catch((error) => {console.log(error)})
      })
      
    }
    // Delete all messages associated with the conversation
    await prisma.message.deleteMany({
      where: {
        idConversation: id, // Filter messages by conversation ID
      },
    });

    // Delete the conversation from the database that matches the given ID
    const conversation: Conversation | null = await prisma.conversation.delete({
      where: {
        id, // Conversation ID to filter
      },
    });

    // If the conversation is not found, return a message indicating so
    if (!conversation) {
      return { status: 404, message: "Conversation not found" };
    }

    // Return a message indicating the conversation was successfully deleted
    return {
      status: 200,
      message: "Conversation and associated messages successfully deleted",
    };
  } catch (error: any) {
    // Handle any errors that occur during the deletion
    return { status: 500, message: error.message };
  }
}
