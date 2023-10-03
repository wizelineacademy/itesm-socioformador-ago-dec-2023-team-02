/**
 * This module contains functions to interact with the Provider model in the database.
 * @packageDocumentation
 */

import type { Provider } from "@prisma/client";
import type { PrismaResponse } from "@/types/prisma-client-types";
import type { ProviderCreateData, ProviderUpdateData } from "@/types/provider-types";
import prisma from "./prisma";

/**
 * Retrieves all providers from the database using Prisma.
 * @returns A Promise that resolves to a PrismaResponse object containing an array of Provider objects and a status code.
 */
export async function getAllProviders(): Promise<PrismaResponse<Provider[]>> {
    try {
        // Fetch all providers from the database using Prisma
        const providers: Provider[] = await prisma.provider.findMany();

        // Validate if any providers exist
        if (providers.length === 0) {
            return { status: 404, message: 'No providers found' };
        }

        // Return the fetched providers
        return { data: providers, status: 200 };
    } catch (error: any) {
        // Handle any errors that occur during the fetch
        return { status: 500, message: error.message };
    }
}

/**
 * Fetches a provider from the database by ID.
 * @param id - The ID of the provider to fetch.
 * @returns A Promise that resolves to a PrismaResponse object containing the fetched provider or an error message.
 */
export async function getProviderById(id: number): Promise<PrismaResponse<Provider>> {
    try {
        // Validate that the ID is a positive integer
        if (id <= 0) {
            return { status: 400, message: 'Invalid ID. Must be a positive integer.' };
        }

        // Fetch the provider from the database using Prisma
        const provider: Provider | null = await prisma.provider.findUnique({
            where: {
                id,  // Provider ID to filter
            },
        });

        // Validate if the provider exists
        if (!provider) {
            return { status: 404, message: 'Provider not found' };
        }

        // Return the fetched provider
        return { data: provider, status: 200 };
    } catch (error: any) {
        // Handle any errors that occur during the fetch
        return { status: 500, message: error.message };
    }
}


/**
 * Creates a new provider in the database using Prisma.
 * @param providerData - The data of the provider to be created.
 * @returns A promise that resolves to a PrismaResponse object containing the created provider or an error message.
 */
export async function createProvider(providerData: ProviderCreateData): Promise<PrismaResponse<Provider>> {
    try {

        // Trim name
        providerData.name = providerData.name.trim();

        // Validate name
        if (!providerData.name || providerData.name.trim() === '') {
            return { status: 400, message: 'Provider name cannot be empty' };
        }

        // Validate image
        if (!providerData.image || providerData.image.trim() === '') {
            return { status: 400, message: 'Provider image cannot be empty' };
        }

        // Create a new provider in the database using Prisma
        const provider: Provider = await prisma.provider.create({
            data: {
                name: providerData.name,  // Provider name
                image: providerData.image // Provider image
                // Add other fields as needed
            }
        });

        // Return the created provider
        return { data: provider, status: 201 };
    } catch (error: any) {
        // Handle any errors that occur during the creation
        return { status: 500, message: error.message };
    }
}


/**
 * Updates a provider in the database using Prisma.
 * @param id - The ID of the provider to update.
 * @param updateData - The data to update the provider with.
 * @returns A Promise that resolves to a PrismaResponse object containing the updated provider or an error message.
 */
export async function updateProvider(id: number, updateData: ProviderUpdateData): Promise<PrismaResponse<Provider>> {
    try {
        // Validate ID
        if (!id || id <= 0) {
            return { status: 400, message: 'Invalid provider ID' };
        }

        // Trim name if provided
        if (updateData.name) {
            updateData.name = updateData.name.trim();
        }

        // Validate name if provided
        if (updateData.name && updateData.name.trim() === '') {
            return { status: 400, message: 'Provider name cannot be empty' };
        }

        // Validate image if provided
        if (updateData.image && updateData.image.trim() === '') {
            return { status: 400, message: 'Provider image cannot be empty' };
        }

        // Update the provider in the database using Prisma
        const provider: Provider | null = await prisma.provider.update({
            where: { id }, // Specify which provider to update by its ID
            data: { ...updateData } // Spread the update data
        });

        // Check if the provider was found and updated
        if (!provider) {
            return { status: 404, message: 'Provider not found' };
        }

        // Return the updated provider
        return { data: provider, status: 200 };
    } catch (error: any) {
        // Handle any errors that occur during the update
        return { status: 500, message: error.message };
    }
}

/**
 * Deletes a provider from the database.
 * @param id - The ID of the provider to delete.
 * @returns A Promise that resolves to a PrismaResponse object indicating the status and message of the deletion.
 */
export async function deleteProvider(id: number): Promise<PrismaResponse<null>> {
    try {
        // Validate ID
        if (!id || id <= 0) {
            return { status: 400, message: 'Invalid provider ID' };
        }

        // Check if the provider exists in the database
        const providerExists = await prisma.provider.findUnique({
            where: { id },
        });

        // Validate if the provider exists
        if (!providerExists) {
            return { status: 404, message: 'Provider not found' };
        }

        // Delete the provider from the database
        await prisma.provider.delete({
            where: { id },
        });

        // Return a message indicating the provider was successfully deleted
        return { status: 200, message: 'Provider successfully deleted' };
    } catch (error: any) {
        // Handle any errors that occur during the deletion
        return { status: 500, message: error.message };
    }
}