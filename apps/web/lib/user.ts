import type { User } from "@prisma/client";
import type { PrismaResponse } from "@/types/PrismaClientTypes";
import prisma from "./prisma";
import { buildErrorMessage } from "./utils";

// Get
// Remove
// Create 
// Edit 

/**
 * Retrieves the user that has the given user ID. 
 * @param idUser - The ID of the user to retrieve (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the fetched user (User). 
 */
export async function getUser(idUser: number): Promise<PrismaResponse<User>> {
    try {
        const data: User = await prisma.user.findUniqueOrThrow({
            where: {
                id: idUser
            }
        })

        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
    }
}

/**
 * Retrieves all users that belong to the group with the given group ID. 
 * @param idGroup - The ID of the group whose users will be retrieved (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains an array of users (User[]). 
 */
export async function getUserByGroupId(idGroup: number): Promise<PrismaResponse<User[]>> {
    try {
        const data: User[] = await prisma.user.findMany({
            where: {
                groups: {
                    some: {
                        id: idGroup
                    }
                }
            }
        })

        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
    }
}

/**
 * Deletes the user that has the given user ID. 
 * @param idUser - The ID of the user to delete (number). 
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the deleted user (User). 
 */
export async function deleteUser(idUser: number): Promise<PrismaResponse<User>> {
    try {
        const data: User = await prisma.user.delete({
            where: {
                id: idUser
            }
        })

        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
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
        const data: {count: number} = await prisma.user.deleteMany({
            where: {
                id: {
                    in: idsUsers
                }
            }
        })

        return {status: 200, data}
    } catch (error) {
        return {status: 400, message: buildErrorMessage(error)}
    }
}

/**
 * Creates a new user.
 * @param user - A user object that holds the information of the user to create (User).  
 * @param user - A user object that holds the information of the user to create (User).  
 * @returns Promise that resolves to an object that implements PrismaResponse, and that potentially contains the created user (User). 
 */
// export async function createUser(user: User, connectToGroups?: number[]): Promise<PrismaResponse<User>> {
//     try {
//         const data = await prisma.user.create({
//             data: user
//         })

//         return {status: 200, data}
//     } catch (error) {
//         return {status: 400, message: buildErrorMessage(error)}
//     }
// }








