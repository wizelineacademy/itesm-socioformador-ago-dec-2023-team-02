import type { User } from "@prisma/client";
import type {PrismaResponse } from "@/types/prisma-client-types";
import { isValidUser, type UserCreateData, type UserUpdateData } from "@/types/user-types";
import { areValidGlobalParameters, type GlobalParameters } from "@/types/model-parameters-types";
import prisma from "./prisma";

/**
 * Retrieves the user that has the given user ID. 
 * @param idUser - The ID of the user to retrieve (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the fetched user (User). 
 */
export async function getUser(idUser: number): Promise<PrismaResponse<User>> {
    try {
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: idUser
            }
        })

        return user === null ? {status: 404, message: "No user was found"} : {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Retrieves the user that has the given user auth0 ID. 
 * @param idUser - The ID of the user to retrieve (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the fetched user (User). 
 */
export async function getUserbyAuthID(idUser: string): Promise<PrismaResponse<User>> {
    try {
        const user: User | null = await prisma.user.findUnique({
            where: {
                idAuth0: idUser
            }
        })

        return user === null ? {status: 404, message: "No user was found"} : {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Retrieves all users. 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains all fetched users (User[]). 
 */
export async function getAllUsers(): Promise<PrismaResponse<User[]>> {
    try {
        const users: User[] = await prisma.user.findMany()

        return {status: 200, data: users}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Retrieves all users that belong to the group with the given group ID. 
 * @param idGroup - The ID of the group whose users will be retrieved (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains an array of users (User[]). 
 */
export async function getUsersByGroupId(idGroup: number): Promise<PrismaResponse<User[]>> {
    try {
        if (await prisma.group.findUnique({where: {id: idGroup}}) === null) {
            return {status: 400, message: "Invalid group ID given."}
        }

        const users: User[] = await prisma.user.findMany({
            where: {
                groups: {
                    some: {
                        id: idGroup
                    }
                }
            }
        })

        return {status: 200, data: users}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Deletes the user that has the given user ID. 
 * @param idUser - The ID of the user to delete (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the deleted user (User). 
 */
export async function deleteUser(idUser: number): Promise<PrismaResponse<User>> {
    try {
        const user: User = await prisma.user.delete({
            where: {
                id: idUser
            }
        })

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Deletes all users whose ID is found in the given array of IDs. 
 * @param idsUsers - An array of user IDs (number[]).  
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains an object
 * that holds how many user records were deleted. 
 */
export async function deleteManyUsers(idsUsers: number[]): Promise<PrismaResponse<{count: number}>> {
    try {
        const deletionInfo: {count: number} = await prisma.user.deleteMany({
            where: {
                id: {
                    in: idsUsers
                }
            }
        })

        return {status: 200, data: deletionInfo}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Creates a new user.
 * @param newUser - A user object that holds the information of the user to create (User).  
 * @param groupIds - An array of group IDs, to which the newly created user will be added (number[]). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the created user (User). 
 */
export async function createUser(userData: UserCreateData, groupIds: number[] = []): Promise<PrismaResponse<User>> {
    if (!isValidUser(userData)){
        return {status: 400, message: "Invalid user data given."}
    }

    try {
        const user = await prisma.user.create({
            data: {...userData,
                groups: {
                    connect: groupIds.map(groupId => {return {id: groupId}}) 
                }
            } 
        })

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Updates an existing user. 
 * @param idUser - The ID of the user to be updated (number). 
 * @param updatedUser - A user object that will overwrite the information of the selected user (User). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the updated user (User). 
 */
export async function updateUser(idUser: number, userData: UserUpdateData): Promise<PrismaResponse<User>> {
    if (!isValidUser(userData)){
        return {status: 400, message: "Invalid user data given."}
    }
    
    try {
        const user = await prisma.user.update({
            where: {
                id: idUser
            },
            data: userData
        })

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Updates the global model parameters associated to the given user. 
 * @param id - The ID of the user whose global model parameters will be updated.
 * @param globalParameters - An object of type GlobalParameters that holds the parameter values with which
 * to update the user's global parameters. 
 * @returns Promise that resolves to an object that implements PrismaResponse<User>, and that potentially contains the updated User. 
 */
export async function updateUserGlobalParameters(idUser: number, globalParameters: GlobalParameters): Promise<PrismaResponse<User>> {
    if (!areValidGlobalParameters(globalParameters)) {
        return {status: 400, message: 'Invalid global paramters'}
    }

    try {
        const user: User = await prisma.user.update({
            where: {
                id: idUser
            }, 
            data: {
                globalParameters: globalParameters as any 
            }
        })

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Adds the given user to one or many groups. 
 * @param idUser - The ID of the user who will be associated to the given user groups (number). 
 * @param groupIds - An array of group IDs, to which the newly created user will be added (number[]). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the updated user (User). 
 */
export async function addUserToGroups(idUser: number, groupIds: number[]): Promise<PrismaResponse<User>> {
    try {
        const user = await prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                groups: {
                    connect: groupIds.map(groupId => {return {id: groupId}})
                }
            }
        })

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Removes the given user from one or many groups. 
 * @param idUser - The ID of the user who will no longer be associated to the given user groups (number). 
 * @param groupIds - An array of group IDs, to which the newly created user will be dissociated (number[]). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the updated user (User). 
 */
export async function removeUserFromGroups(idUser: number, groupIds: number[]): Promise<PrismaResponse<User>> {
    try {
        const user = await prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                groups: {
                    disconnect: groupIds.map(groupId => {return {id: groupId}})
                }
            }
        })

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Increments the number of creadits remaining of the given user. 
 * @param idUser - The ID of the user whose number of credits will be incremented (number). 
 * @param creditIncrement - A non-negative number with which to increment the user's remaining credit value (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the updated user (User). 
 */
export async function incrementUserCreditsRemaining(idUser: number, creditIncrement: number): Promise<PrismaResponse<User>> {
    if (creditIncrement < 0) {
        return {status: 400, message: "Invalid credit increment value given."}
    }
    
    try {
        const user = await prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                creditsRemaining: {
                    increment: creditIncrement
                }
            }
        })

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}

/**
 * Decrements the number of creadits remaining of the given user. 
 * @param idUser - The ID of the user whose number of credits will be decremented (number). 
 * @param creditDecrement - A non-negative number with which to decrement the user's remaining credit value (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the updated user (User). 
 */
export async function decrementUserCreditsRemaining(idUser: number, creditDecrement: number): Promise<PrismaResponse<User>> {
    if (creditDecrement < 0) {
        return {status: 400, message: "Invalid credit decrement value given."}
    }
    
    try {
        const user = await prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                creditsRemaining: {
                    decrement: creditDecrement
                }
            }
        })

        return {status: 200, data: user}
    } catch (error: any) {
        return {status: 500, message: error.message}
    }
}