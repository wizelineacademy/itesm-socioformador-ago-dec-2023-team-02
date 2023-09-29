/**
 * This module contains functions to interact with the AI Model model in the database.
 * @packageDocumentation
 */

import type { Model, Prisma } from "@prisma/client";
import { ModelType } from '@prisma/client';
import type { PrismaResponse } from "@/types/prisma-client-types";
import prisma from "./prisma";

/**
 * Fetches all models from the database, including details from the 'provider' relation.
 * @returns A Promise that resolves to a PrismaResponse object containing the fetched models or an error message.
 */
export async function getAllModels(): Promise<PrismaResponse<Model[]>> {
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
            return { status: 404, message: "No models found" };
        }

        // Return the fetched models
        return { data: models, status: 200 };
    } catch (error: any) {
        // Handle any errors that occur during the fetch
        return { status: 500, message: error.message };
    }
}

/**
 * Fetches a model from the database using its ID, including details from the 'provider' relation.
 * @param id - The ID of the model to fetch.
 * @returns A promise that resolves to a PrismaResponse object containing the fetched model or an error message.
 */
export async function getModelById(id: number): Promise<PrismaResponse<Model>> {
    try {
        // Validate that the ID is a positive integer
        if (id <= 0) {
            return { status: 400, message: "Invalid ID. Must be a positive integer." };
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
            return { status: 404, message: "Model not found" };
        }

        // Return the fetched model along with its details
        return { data: model, status: 200 };
    } catch (error: any) {
        // Handle any errors that occur during the fetch
        return { status: 500, message: error.message };
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
 * Creates a new model in the database using the provided data.
 * @param modelData - The data needed to create a new model.
 * @returns A promise that resolves to a PrismaResponse object containing the created model and its details, or an error message and status code if an error occurred.
 */
export async function createModel(modelData: ModelDataInput): Promise<PrismaResponse<Model>> {
    try {
        // Trim name
        modelData.name = modelData.name.trim();

        // Validate name
        if (!modelData.name || modelData.name.trim() === '') {
            return { status: 400, message: 'Model name cannot be empty' };
        }

        // Validate idProvider
        const providerExists = await prisma.provider.findUnique({
            where: { id: modelData.idProvider },
        });
        if (!providerExists) {
            return { status: 400, message: 'Provider ID does not exist' };
        }

        // Validate modelType
        if (!Object.values(ModelType).includes(modelData.modelType)) {
            return { status: 400, message: 'Invalid model type' };
        }

        // Validate description
        if (!modelData.description || Object.keys(modelData.description).length === 0) {
            return { status: 400, message: 'Description cannot be empty' };
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
        return { data: model, status: 201 };
    } catch (error: any) {
        // Handle any errors that occur during the creation
        return { status: 500, message: error.message };
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
 * Updates a model in the database with the provided ID and data.
 * @param id - The ID of the model to update.
 * @param updateData - The data to update the model with.
 * @returns A promise that resolves to a PrismaResponse containing the updated model or an error message and status code.
 */
export async function updateModel(id: number, updateData: UpdateModelDataInput): Promise<PrismaResponse<Model>> {
    try {
        // Trim name if provided
        if (updateData.name) {
            updateData.name = updateData.name.trim();
        }

        // Validate name
        if (updateData.name && updateData.name === '') {
            return { status: 400, message: 'Model name cannot be empty' };
        }

        // Validate idProvider if provided
        if (updateData.idProvider) {
            const providerExists = await prisma.provider.findUnique({
                where: { id: updateData.idProvider },
            });
            if (!providerExists) {
                return { status: 400, message: 'Provider ID does not exist' };
            }
        }

        // Validate modelType if provided
        if (updateData.modelType && !Object.values(ModelType).includes(updateData.modelType)) {
            return { status: 400, message: 'Invalid model type' };
        }

        // Validate description
        if (!updateData.description || Object.keys(updateData.description).length === 0) {
            return { status: 400, message: 'Description cannot be empty' };
        }

        // Update the model in the database using the provided ID and data
        const model: Model = await prisma.model.update({
            where: {
                id, // Model ID to filter
            },
            data: {
                ...updateData // Spread the update data
            }
        });

        // Return the updated model
        return { data: model, status: 200 };
    } catch (error: any) {
        // Handle any errors that occur during the update
        return { status: 500, message: error.message };
    }
}

/**
 * Deletes a model from the database by its ID.
 * @param id - The ID of the model to delete.
 * @returns A Promise that resolves to a PrismaResponse object indicating the status of the deletion.
 */
export async function deleteModelById(id: number): Promise<PrismaResponse<null>> {
    try {
        // Fetch the model from the database to check if it exists
        const modelExists = await prisma.model.findUnique({
            where: { id },
        });

        // Validate if the model exists
        if (!modelExists) {
            return { status: 404, message: 'Model not found' };
        }

        // Delete the model from the database
        await prisma.model.delete({
            where: { id },
        });

        // Return a message indicating the model was successfully deleted
        return { status: 200, message: 'Model successfully deleted' };
    } catch (error: any) {
        // Handle any errors that occur during the deletion
        return { status: 500, message: error.message };
    }
}