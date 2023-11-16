import type { Group } from "@prisma/client";
import { cleanString, findMatchRatio } from "./string-helpers";

export enum GroupsActionType {
    Create, 
    Delete, 
    Edit,
    Set
}

export interface GroupsAction {
    type: GroupsActionType;
    groupId?: number;
    group?: Group;
    groups?: Group[];
}

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

export function filterGroups(groups: Group[], searchText: string): Group[] {
    const cleanedSearchText: string = cleanString(searchText)
    return searchText.length > 0 ? groups.filter((group) => findMatchRatio(cleanString(group.name), cleanedSearchText) > 0.5) : groups
}

export function editGroupName(group: Group, newName: string): Group {
    return {...group, name: newName}
}

export function editGroupDescription(group: Group, newDescription: string): Group {
    return {...group, description: newDescription}
}

export function editGroupCredits(group: Group, credits: number): Group {
    return {...group, creditsAssigned: credits}
}

export function defaultGroup(): Group {
    return {
        id: 0,
        name: "",
        description: "",
        creditsAssigned: 0
    }
}

export function isValidGroup(group: Group): boolean {
    return group.name.length > 0 && group.creditsAssigned >= 0 
} 