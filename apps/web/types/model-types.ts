/**
 * User-defined TypeScript interfaces and validation functions related to the model Model. 
 * @packageDocumentation
 */

import type { ModelType, Prisma } from "@prisma/client";

// -- Types -- 
/**
 * Represents the creation information for a model.
 */
export interface ModelCreateData {
    idProvider: number;
    name: string;
    active: boolean;
    modelType: ModelType;
    description: Prisma.JsonObject; // Assuming Json is a type you've defined
}

/**
 * Represents the updated information for a model.
 */
export interface ModelUpdateData {
    idProvider?: number;
    name?: string;
    active?: boolean;
    modelType?: 'TEXT' | 'IMAGE';
    description: Prisma.JsonObject; // Assuming Json is a type you've defined
}