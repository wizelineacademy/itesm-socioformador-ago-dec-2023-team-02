/**
 * Functions for operating on User typed objects, without side effects.
 */


import type { User } from "@prisma/client";

/**
 * Edits the number of credits remaining of the user, in a copy of the provided User object. 
 * @param user - The User object whose creditsRemaining property will be modified. 
 * @param newCreditsRemaining - The new number of credits to edit the User object with. 
 * @returns A copy of the provided user, with its creditsRemaining property set to newCreditsRemaining. 
 */
export function editUserCreditsRemaining(user: User, newCreditsRemaining: number): User {
    return {...user, creditsRemaining: newCreditsRemaining}
}

/**
 * Returns, as a string and rounded to two decimal places, the number of credits remaining of the provided user. 
 * @param user - The User object whose creditsRemaining property will be returned, rounded and as a string. 
 * @returns The number of credits remaining of the given User object, rounded and as a string. 
 */
export function roundUsersCredits(user: User | undefined): string | undefined {
    return user?.creditsRemaining.toFixed(2)
}