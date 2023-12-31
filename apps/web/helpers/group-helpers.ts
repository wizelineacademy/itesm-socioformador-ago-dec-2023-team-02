/**
 * Various functions for working with groups of user, represented with the Prisma Group type or the user-defined 
 * GroupData.
 */

import type { Group } from "@prisma/client";
import type { GroupData } from "@/types/group-types";
import { cleanString, findMatchRatio } from "./string-helpers";

/**
 * Enum containing the various types of modifications one can perform to an array of groups.
 */
export enum GroupsActionType {
    Create, 
    Delete, 
    Edit,
    Set
}

/**
 * An action to be dispatched by the reducer function that manages the groups state.
 */
export interface GroupsAction {
    type: GroupsActionType;
    groupId?: number;
    group?: Group;
    groups?: Group[];
}

/**
 * Reducer function that encapsulates all logic related to the manipulation of a group array state. 
 * @param state - An array of groups.  
 * @param action - The action dispatched by the reducer. Indicates the type of modification to perform to the group
 * array state. 
 * @returns An updated group array state. 
 */
export function groupsReducer(state: Group[], action: GroupsAction): Group[] {
    switch (action.type){
        case GroupsActionType.Create:
            if (action.group){
                return [...state, action.group]
            }
            return state
        case GroupsActionType.Delete:
            return state.filter((group) => action.groupId !== group.id)
        case GroupsActionType.Edit:
            return state.map((group) => action.groupId === group.id ? action.group || group : group)
        case GroupsActionType.Set:
            return action.groups || state 
    }
}

/**
 * Filters an array of groups, admitting only those whose name matches the searchText string. 
 * @param groups - An array of user groups to filter. 
 * @param searchText - A string pattern to compare with the name of each group in the array. 
 * @returns A filtered group array. 
 */
export function filterGroups(groups: Group[], searchText: string): Group[] {
    const cleanedSearchText: string = cleanString(searchText)
    return searchText.length > 0 ? groups.filter((group) => findMatchRatio(cleanString(group.name), cleanedSearchText) > 0.5) : groups
}

/**
 * Creates a copy of a group instance, with its name property set to newName.
 * @param group - The group to clone, with its name modified. 
 * @param newName - The name the group copy will have. 
 * @returns A new group, with its name modified. 
 */
export function editGroupName(group: Group, newName: string): Group {
    return {...group, name: newName}
}

/**
 * Creates a copy of a group instance, with its description property set to newDescription.
 * @param group - The group to clone, with its description modified. 
 * @param newName - The description the group copy will have. 
 * @returns A new group, with its description modified. 
 */
export function editGroupDescription(group: Group, newDescription: string): Group {
    return {...group, description: newDescription}
}

/**
 * Creates a copy of a group instance, with its creditsAssigned property set to credits.
 * @param group - The group to clone, with its credits modified. 
 * @param newName - The number of credits the group copy will have. 
 * @returns A new group, with its creditsAssigned property modified. 
 */
export function editGroupCredits(group: Group, credits: number): Group {
    return {...group, creditsAssigned: credits}
}

/**
 * Creates an empty group. 
 * @returns A new empty group, whose properties are set to default, non-significant values. 
 */
export function defaultGroup(): Group {
    return {
        id: 0,
        name: "",
        description: "",
        creditsAssigned: 0
    }
}

/**
 * Evaluates the validity of a group, by determining whether the given group's properties have valid values. 
 * @param group - The group whose validity will be assessed. 
 * @returns A boolean value that indicates whether or not the group is valid.
 */
export function isValidGroup(group: Group): boolean {
    return group.name.length > 0 && group.creditsAssigned >= 0 
} 

/**
 * Indicates whether two group objects are identical.
 * @param groupA - A group object, to compare with groupB.
 * @param groupB - A group object, to compare with groupA.
 * @returns A boolean value that indicates whether two group objects are identical.
 */
export function groupsAreEqual(groupA: Group, groupB: Group): boolean {
    return (
        groupA.id === groupB.id &&
        groupA.name === groupB.name &&
        groupA.description === groupB.description &&
        groupA.creditsAssigned === groupB.creditsAssigned
    )
}

/**
 * Sorts an array of groups by their name; placing the group whose id is placeFirst in the first position. 
 * @param groups - An array of group objects to sort. 
 * @param placeFirst - The id of the group that will be given precedence over the rest and unconditionally
 * placed in the first position. 
 * @returns A new, sorted array of groups. 
 */
export function sortGroups(groups: Group[], groupToPlaceFirst?: number): Group[] {
    return groups.length === 0 ? [] : [...groups].sort((groupA, groupB) => {
        if (groupToPlaceFirst !== undefined && groupA.id === groupToPlaceFirst){
            return -1
        } else if (groupToPlaceFirst !== undefined && groupB.id === groupToPlaceFirst){
            return 1
        } 
        return groupA.name.localeCompare(groupB.name)
    })
}

/**
 * Creates a placeholder object that adheres to the GroupData type. 
 * @returns A new and non-significant GroupData object.  
 */
export function placeHolderGroupData(): GroupData {
    return {
        id: 0,
        name: "",
        description: "",
        creditsAssigned: 0,
        users: []
    }
}

/**
 * Searches through the array of users of a GroupData object, to determine if the provided user is present. 
 * @param groupData - A GroupData object containing the array of User objects to search. 
 * @param userId - The id of the user to search for in the group. 
 * @returns A boolean value that indicates whether or not the user is present in the group. 
 */
export function groupDataContainsUser(groupData: GroupData, userId: number): boolean {
    return groupData.users.some(({id}) => id === userId)
}