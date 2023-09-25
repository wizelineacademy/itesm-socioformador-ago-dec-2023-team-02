import type { Model, Prisma} from "@prisma/client";
import {  ModelType } from '@prisma/client';
import prisma from "./prisma";

/**
 * Retrieves all models from the database, including provider details.
 * @returns An object with either an array of models or a message/error if there was an issue.
 */
export async function getAllModels(): Promise<{ models?: Model[]; message?: string; error?: any }> {
    try {
        // Fetch all models from the database
        const models: Model[] = await prisma.model.findMany({
            include: {
                // Include details from the 'provider' relation
                provider: {
                    // Select only specific fields from the provider
                    select: {
                        id: true,   // Include the 'id' of the provider
                        name: true, // Include the 'name' of the provider
                        image: true // Include the 'image' of the provider
                    },
                },
            },
        });

        // Check if any models were fetched
        if (models.length === 0) {
            return { message: "No models found" };
        }

        // Return the fetched models
        return { models };
    } catch (error: any) {
        // Handle any errors that occur during the fetch
        return { error };
    }
}


/**
 * Fetch a specific model from the database by its ID.
 * @param id - The ID of the model to fetch.
 * @returns - The model object if found, or an error object if an error occurs.
 */
export async function getModelById(id: number): Promise<{ model?: Model; message?: string; error?: any }> {
    try {
        // Validate that the ID is a positive integer
        if (id <= 0) {
            return { message: "Invalid ID. Must be a positive integer." };
        }

        // Fetch the model from the database that matches the given ID
        const model: Model | null = await prisma.model.findUnique({
            where: {
                id,  // Model ID to filter
            },
            include: {
                // Include details from the 'provider' relation
                provider: {
                    select: {
                        id: true,   // Include the 'id' of the provider
                        name: true, // Include the 'name' of the provider
                        image: true // Include the 'image' of the provider
                    },
                },
            },
        });

        // If the model is not found, return a message indicating so
        if (!model) {
            return { message: "Model not found" };
        }

        // Return the fetched model along with its details
        return { model };
    } catch (error) {
        // Handle any errors that occur during the fetch
        return { error };
    }
}

/**
 * Represents the creation information for a model.
 */
interface ModelDataInput {
    idProvider: number;
    name: string;
    active: boolean;
    modelType: ModelType;
    description: Prisma.JsonObject; // Assuming Json is a type you've defined
}

/**
 * Create a new model in the database.
 * @param modelData - The data for the new model.
 * @returns - The created model object, or an error object if an error occurs.
 */
export async function createModel(modelData: ModelDataInput): Promise<{ model?: Model; message?: string; error?: any }> {
    try {
        // Validate name
        if (!modelData.name || modelData.name.trim() === '') {
            return { message: 'Model name cannot be empty' };
        }

        // Validate idProvider
        const providerExists = await prisma.provider.findUnique({
            where: { id: modelData.idProvider },
        });
        if (!providerExists) {
            return { message: 'Provider ID does not exist' };
        }

        // Validate modelType
        if (!Object.values(ModelType).includes(modelData.modelType)) {
            return { message: 'Invalid model type' };
        }

        // Validate description
        if (!modelData.description || Object.keys(modelData.description).length === 0) {
            return { message: 'Description cannot be empty' };
        }

        // Create a new model in the database using the provided data
        const model: Model = await prisma.model.create({
            data: {
                idProvider: modelData.idProvider, // Provider ID
                name: modelData.name,             // Model name
                active: modelData.active,         // Whether the model is active
                modelType: modelData.modelType,   // Type of the model (Text/Image)
                description: modelData.description // Description in JSON format
            }
        });

        // Return the created model along with its details
        return { model };

        // Return the created model along with its details
        return { model };
    } catch (error: any) {
        // Handle any errors that occur during the creation
        return { error };
    }
}


/**
 * Represents the updated information for a model.
 */
interface UpdateModelDataInput {
    idProvider?: number;
    name?: string;
    active?: boolean;
    modelType?: 'TEXT' | 'IMAGE';
    description: Prisma.JsonObject; // Assuming Json is a type you've defined
}


/**
 * Update an existing model in the database.
 * @param id - The ID of the model to update.
 * @param updateData - The data to update the model with.
 * @returns - The updated model object, or an error object if an error occurs.
 */
export async function updateModel(id: number, updateData: UpdateModelDataInput): Promise<{ model?: Model; message?: string; error?: any }> {
    try {
        // Validate name
        if (updateData.name && updateData.name.trim() === '') {
            return { message: 'Model name cannot be empty' };
        }

        // Validate idProvider if provided
        if (updateData.idProvider) {
            const providerExists = await prisma.provider.findUnique({
                where: { id: updateData.idProvider },
            });
            if (!providerExists) {
                return { message: 'Provider ID does not exist' };
            }
        }

        // Validate modelType if provided
        if (updateData.modelType && !Object.values(ModelType).includes(updateData.modelType)) {
            return { message: 'Invalid model type' };
        }

        // Validate description
        if (!updateData.description || Object.keys(updateData.description).length === 0) {
            return { message: 'Description cannot be empty' };
        }

        // Update the model in the database using the provided ID and data
        const model = await prisma.model.update({
            where: {
                id, // Model ID to filter
            },
            data: {
                ...updateData // Spread the update data
            }
        });

        // Return the updated model
        return { model };
    } catch (error) {
        // Handle any errors that occur during the update
        return { error };
    }
}

/**
 * Deletes a model from the database by its ID.
 * @param id - The ID of the model to delete.
 * @returns - An object containing a message indicating the model was deleted or an error object if an error occurs.
 */
export async function deleteModelById(id: number): Promise<{ message?: string; error?: any }> {
    try {
        // Fetch the model from the database to check if it exists
        const modelExists = await prisma.model.findUnique({
            where: { id },
        });

        // Validate if the model exists
        if (!modelExists) {
            return { message: 'Model not found' };
        }

        // Delete the model from the database
        await prisma.model.delete({
            where: { id },
        });

        // Return a message indicating the model was successfully deleted
        return { message: 'Model successfully deleted' };
    } catch (error) {
        // Handle any errors that occur during the deletion
        return { error };
    }
}