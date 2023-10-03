/**
 * User-defined TypeScript interfaces and validation functions related to the model User. 
 * @packageDocumentation
 */

import type { Role } from "@prisma/client";

// -- Types -- 
/**
 * Interface implemented by objects used to update the values of a User record. 
 */
export interface UserUpdateData {
    idAuth0?: string; 
    name?: string; 
    email?: string;
    jobPosition?: string;
    role?: Role;
    image?: string;
    creditsRemaining?: number; 
    globalParameters?: any 
}

export interface UserCreateData {
    idAuth0: string; 
    name: string; 
    email: string;
    jobPosition: string;
    role: Role;
    image: string;
    creditsRemaining: number; 
    globalParameters: any 
}

export type UserData = UserUpdateData | UserCreateData

// -- Validation --- 
/**
 * Validates that the given object that implements User is valid. 
 * @param user - The User object whose properties will be validated. 
 * @returns A boolean value that indicates whether or not the given user is valid. 
 */
export function isValidUser(user: UserData): boolean {
    if (user.email && !isValidUserEmail(user.email)){
        return false 
    }
    return true 
}

/**
 * Validates that the given email string adheres to our defined email sytnax. 
 * @param email - An email string. 
 * @returns A boolean value that indicates whether or not the given email string is valid. 
 */
export function isValidUserEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@wizeline\.com$/.test(email) // Validate  
}