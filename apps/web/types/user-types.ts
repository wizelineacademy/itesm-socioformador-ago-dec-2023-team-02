/**
 * User-defined TypeScript interfaces and validation functions related to the model User. 
 * @packageDocumentation
 */

// -- Types -- 
/**
 * Interface implemented by objects used to update the values of a User record. 
 */
export interface UserUpdateData {
    idAuth0?: string; 
    name?: string; 
    email?: string;
    jobPosition?: string;
    role?: 'ADMIN' | 'USER'; 
    image?: string;
    creditsRemaining?: number; 
    globalParameters?: any 
}

export interface UserCreateData {
    idAuth0: string; 
    name: string; 
    email: string;
    jobPosition: string;
    role: 'ADMIN' | 'USER'; 
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

/**
 * Type-guard that determines if an object implements the interface UserUpdateData. 
 * @param obj - An object whose adherence to UserUpdateData will be tested. 
 * @returns A boolean value that indicates whether or not the given obj implements UserUpdateData. 
 */
export function isUserUpdateData(obj: any): obj is UserUpdateData {
    return (
      (obj.idAuth0 === undefined || typeof obj.idAuth0 === 'string') &&
      (obj.name === undefined || typeof obj.name === 'string') &&
      (obj.email === undefined || typeof obj.email === 'string') &&
      (obj.jobPosition === undefined || typeof obj.jobPosition === 'string') &&
      (obj.role === undefined || obj.role === 'ADMIN' || obj.role === 'USER') && 
      (obj.image === undefined || typeof obj.image === 'string') &&
      (obj.creditsRemaining === undefined || typeof obj.creditsRemaining === 'number')
      // && (obj.globalParameters === undefined || ...) // todo: global parameters validation.
    );
  }

/**
 * Type-guard that determines if an object implements the interface UserCreateData. 
 * @param obj - An object whose adherence to UserCreateData will be tested. 
 * @returns A boolean value that indicates whether or not the given obj implements UserCreateData. 
 */
  export function isUserCreateData(obj: any): obj is UserCreateData {
    return (
      typeof obj === 'object' &&
      typeof obj.idAuth0 === 'string' &&
      typeof obj.name === 'string' &&
      typeof obj.email === 'string' &&
      typeof obj.jobPosition === 'string' &&
      (obj.role === 'ADMIN' || obj.role === 'USER') &&
      typeof obj.image === 'string' &&
      typeof obj.creditsRemaining === 'number'
      // && obj.globalParameters !== undefined // todo: global parameters validation.
    );
  }