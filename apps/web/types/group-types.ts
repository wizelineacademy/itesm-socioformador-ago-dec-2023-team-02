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

/**
 * Type-guard that determines if an object implements the interface GroupUpdateData. 
 * @param obj - An object whose adherence to GroupUpdateData will be tested. 
 * @returns A boolean value that indicates whether or not the given obj implements UserUpdateData. 
 */
export function isGroupUpdateData(obj: any): obj is GroupUpdateData {
    return (
      (obj.id === undefined || typeof obj.id === 'string') &&
      (obj.name === undefined || typeof obj.name === 'string') &&
      (obj.description === undefined || typeof obj.description === 'string') &&
      (obj.creditsAssigned === undefined || typeof obj.creditsAssigned === 'number')
    );
  }

// -- Validation --- 
