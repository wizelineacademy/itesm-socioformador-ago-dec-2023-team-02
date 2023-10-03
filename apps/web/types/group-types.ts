/**
 * User-defined TypeScript interfaces and validation functions related to the model Group. 
 * @packageDocumentation
 */

import type { User } from "@prisma/client";

// -- Types -- 
/**
 * Represents the information neded to create a group.
 */
export interface GroupCreateData {
    name: string;
    description: string;
    creditsAssigned: number;
};

/**
 * Represents the updated information for a group.
 */
export interface GroupUpdateData {
    name?: string;
    description?: string;
    creditsAssigned?: number;
    users: User[];
};


// -- Validation --- 
