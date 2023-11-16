'use client';

import type { Group } from "@prisma/client";
import { createContext, useReducer } from "react";
import { groupsReducer, type GroupsAction } from "@/helpers/group-helpers";

export interface GroupsContextShape {
    groups: Group[];
    groupsDispatch: React.Dispatch<GroupsAction>;
}

export const GroupsContext = createContext<GroupsContextShape | null>(null)

interface GroupsContextProviderProps {
  children: JSX.Element;
  initialGroups: Group[];
}

export function GroupsContextProvider({children, initialGroups}: GroupsContextProviderProps): JSX.Element {
  const [groups, groupsDispatch] = useReducer(groupsReducer, initialGroups)

  return (
      <GroupsContext.Provider value={{groups, groupsDispatch}}>
          {children}
      </GroupsContext.Provider>
  );
}