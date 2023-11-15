'use client';

import type { Group } from "@prisma/client";
import { createContext, useEffect, useReducer } from "react";
import { toast } from "sonner";
import { groupsReducer, type GroupsAction, GroupsActionType } from "@/helpers/group-helpers";

export interface GroupsContextShape {
    groups: Group[];
    groupsDispatch: React.Dispatch<GroupsAction>;
}

export const GroupsContext = createContext<GroupsContextShape | null>(null)

export function GroupsContextProvider({children}: {children: JSX.Element}): JSX.Element {

  const [groups, groupsDispatch] = useReducer(groupsReducer, [])

  useEffect(() => {
    console.log("Hola 2")
    const fetchOptions: RequestInit = {method: "GET"}

    fetch("/api/groups", fetchOptions)
    .then((response) => {
      if (!response.ok){
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((fetchedGroups) => {
      groupsDispatch({type: GroupsActionType.Set, groups: (fetchedGroups as Group[])})
    })
    .catch((_) => {
      toast.error("Failed to load groups.")
      console.log("Failure")
    })
  }, [])

  return (
      <GroupsContext.Provider value={{groups, groupsDispatch}}>
          {children}
      </GroupsContext.Provider>
  );
}