/**
 * Defines a context of an array of groups and its providing component.
 */

'use client';

import type { Group } from "@prisma/client";
import { createContext, useReducer } from "react";
import { groupsReducer, type GroupsAction } from "@/helpers/group-helpers";

/**
 * The shape of the groups context, that is, the type of the value it provides.
 */
export interface GroupsContextShape {
    groups: Group[];
    groupsDispatch: React.Dispatch<GroupsAction>;
}

export const GroupsContext = createContext<GroupsContextShape | null>(null)

interface GroupsContextProviderProps {
  children: JSX.Element;
  initialGroups: Group[];
}

/**
 * Component whose function is to provide a groups context.
 */
export function GroupsContextProvider({children, initialGroups}: GroupsContextProviderProps): JSX.Element {
  const [groups, groupsDispatch] = useReducer(groupsReducer, initialGroups)

  return (
      <GroupsContext.Provider value={{groups, groupsDispatch}}>
          {children}
      </GroupsContext.Provider>
  );
}