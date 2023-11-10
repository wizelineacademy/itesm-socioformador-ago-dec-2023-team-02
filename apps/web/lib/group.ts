/**
 * This module contains functions to interact with the Group model in the database.
 * @packageDocumentation
 */

import type { Group } from "@prisma/client";
import type { PrismaResponse } from "@/types/prisma-client-types";
import type { GroupCreateData, GroupUpdateData } from "@/types/group-types";
import prisma from "./prisma";

/**
 * Retrieves all groups from the database.
 * @returns A Promise that resolves to a PrismaResponse containing an array of Group objects if successful, or an error message if unsuccessful.
 */
export async function getAllGroups(): Promise<PrismaResponse<Group[]>> {
    try {
        // Fetch the group from the database using Prisma
        const groups: Group[] = await prisma.group.findMany({
            include: {
                users: {
                    select: {
                        name: true,
                        email: true,
                        jobPosition: true,
                        role: true,
                    }
                }
            }
        });

        // Validate if the group exists
        if (!groups.length) {
            return { status: 404, message: 'Groups not found' };
        }

        return { data: groups, status: 200 };
    } catch (error: any) {
        console.error('Error fetching groups:', error.message);  // Logging the error
        return { status: 500, message: error.message };
    }
}


/**
 * Retrieves a group by its ID.
 * @param idGroup - The ID of the group to retrieve.
 * @returns A Promise that resolves to a PrismaResponse object containing the fetched group or an error message.
 */
export async function getGroupById(idGroup: number): Promise<PrismaResponse<Group>> {
    try {
        // Validate input parameters (you can add more validations as needed)
        if (!idGroup || isNaN(idGroup) || idGroup <= 0) {
            return { status: 400, message: 'Invalid idGroup parameter' };
        }

        // Validate if the group exists
        const group = await prisma.group.findUnique({
            where: { id: idGroup },
            include: {
                users: true, // Include users in the response
            }
        });
        if (!group) {
            return { status: 404, message: 'Group not found' };
        }

        // Return the fetched group
        return { data: group, status: 200 };
    } catch (error: any) {
        console.error('Error fetching group:', error.message);  // Logging the error
        return { status: 500, message: error.message };
    }
}


/**
 * Retrieves all groups associated with a given user ID.
 * @param idUser - The ID of the user to retrieve groups for.
 * @returns A promise that resolves to a PrismaResponse object containing an array of Group objects if successful, or an error message if unsuccessful.
 */
export async function getGroupsByUserId(idUser: number): Promise<PrismaResponse<Group[]>> {
    try {
        // Validate input parameters 
        if (!idUser || isNaN(idUser) || idUser <= 0) {
            return { status: 400, message: 'Invalid idUser parameter' };
        }

        // Validate if the user exists
        const user = await prisma.user.findUnique({
            where: { id: idUser },
        });
        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        // Fetch groups where the user's ID matches
        const userGroups: Group[] = await prisma.group.findMany({
            where: {
                users: {
                    some: {
                        id: idUser,
                    }
                },
            },
        });

        // Validate if the group exists
        if (!userGroups.length) {
            return { status: 404, message: 'Groups not found' };
        }

        return { data: userGroups, status: 200 };
    } catch (error: any) {
        console.error('Error fetching groups by user ID:', error.message);  // Logging the error
        return { status: 500, message: error.message };
    }
}

/**
 * Creates a new group in the database with the provided data.
 * @param groupData - The data for the group to be created.
 * @returns A promise that resolves to a PrismaResponse object containing the created group data or an error message.
 */
export async function createGroup(groupData: GroupCreateData): Promise<PrismaResponse<Group>> {
    try {
        // Trim name and description
        groupData.name = groupData.name.trim();
        groupData.description = groupData.description.trim();

        // Basic field validation
        if (!groupData.name || !groupData.description || !groupData.creditsAssigned || groupData.creditsAssigned < 0) {
            return { status: 400, message: 'All fields are required and creditsAssigned must be a positive number' };
        }

        // Create the group in the database
        const group = await prisma.group.create({
            data: groupData,
        });

        return { data: group, status: 200 };
    } catch (error: any) {
        console.error('Error creating group:', error.message);  // Logging the error
        return { status: 500, message: error.message };
    }
}

/**
 * Updates a group by its ID with the provided data.
 * @param idGroup - The ID of the group to update.
 * @param updateData - The data to update the group with.
 * @returns A promise that resolves to a PrismaResponse object containing the updated group data or an error message and status code.
 */
export async function updateGroupById(idGroup: number, updateData: GroupUpdateData): Promise<PrismaResponse<Group>> {
    try {
        //Validate ID
        if (!idGroup || isNaN(idGroup) || idGroup <= 0) {
            return { status: 400, message: 'Invalid group ID' };
        }

        // Trim name and description if provided
        if (updateData.name) {
            updateData.name = updateData.name.trim();
        }
        if (updateData.description) {
            updateData.description = updateData.description.trim();
        }

        //Validate name is not empty
        if (updateData.name && updateData.name === '') {
            return { status: 400, message: 'Group name cannot be empty' };
        }

        //Validate credits are assigned
        if (!updateData.creditsAssigned || updateData.creditsAssigned < 0) {
            return { status: 400, message: 'Credits assigned cannot be empty or negative' };
        }

        // Validate users exist if provided
        if (updateData.users && updateData.users.length > 0) {
            const userIds = updateData.users.map(user => user.id);
            const existingUsers = await prisma.user.findMany({
                where: {
                    id: {
                        in: userIds
                    }
                }
            });
            if (existingUsers.length !== updateData.users.length) {
                return { status: 404, message: 'Some users not found' };
            }
        }

        // Prepare data for update
        const data: any = { ...updateData };

        // Associate users if provided
        if (updateData.users && updateData.users.length > 0) {
            data.users = {
                connect: updateData.users.map(user => ({ id: user.id })),
            };
        }

        // Attempt to update the group by its ID
        const group = await prisma.group.update({
            where: {
                id: idGroup,
            },
            data,
        });

        if (!group) {
            return { status: 404, message: 'Group not found' };
        }

        return { data: group, status: 200 };
    } catch (error: any) {
        console.error('Error updating group by ID:', error.message);  // Logging the error
        return { status: 500, message: error.message };
    }
}

/**
 * Deletes a group by its ID.
 * @param idGroup - The ID of the group to be deleted.
 * @returns A Promise that resolves to a PrismaResponse object containing a status code and a message.
 */
export async function deleteGroup(idGroup: number): Promise<PrismaResponse<Group>> {
    try {
        // Validate ID
        if (!idGroup || isNaN(idGroup) || idGroup <= 0) {
            return { status: 400, message: 'Invalid group ID' };
        }

        // Attempt to find the group by its ID before deletion
        const group = await prisma.group.findUnique({
            where: {
                id: idGroup,
            },
        });

        if (!group) {
            return { status: 404, message: 'Group not found' };
        }

        // Attempt to delete the group by its ID
        await prisma.group.delete({
            where: {
                id: idGroup,
            },
        });

        return { message: "Group deleted successfully", status: 200 };
    } catch (error: any) {
        console.error('Error deleting group:', error.message);  // Logging the error
        return { status: 500, message: error.message };
    }
}