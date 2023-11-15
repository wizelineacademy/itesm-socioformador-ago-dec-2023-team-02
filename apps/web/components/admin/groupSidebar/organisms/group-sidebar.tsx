"use client";

import { useContext, useState } from "react";
import type { Group } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Button } from "@nextui-org/react";
import type { GroupsContextShape } from "@/context/groups-context";
import { GroupsContext } from "@/context/groups-context";
import { filterGroups } from "@/helpers/group-helpers";
import SearchBar from "@/components/shared/molecules/search-bar";
import GroupList from "../molecules/group-list";
import NewGroupMenuModal from "../../newGroup/molcules/new-group-menu-modal";

export default function GroupSidebar(): JSX.Element {
    const groupsContext: GroupsContextShape | null = useContext<GroupsContextShape | null>(GroupsContext)
    const groups: Group[] = groupsContext?.groups || []
    const [selectedGroup, setSelectedGroup] = useState<number | null>(groups[0]?.id || null)
    const [newGroupModalIsOpen, setNewGroupModalIsOpen] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")
    const router: AppRouterInstance = useRouter()

    const handleSearchTextChange: (text: string) => void = (text) => {
        setSearchText(text)
    }

    const handleGroupsPress: (pressedGroupId: number) => void = (pressedGroupId) => {
        setSelectedGroup(pressedGroupId)
        router.push(`/admin/group/${pressedGroupId}`)
    }

    const handleModalClose: () => void = () => { setNewGroupModalIsOpen(false)}

    const handleNewGroupButtonPress: (e: any) => void = (_) => {setNewGroupModalIsOpen(true)}

    return (
        <div className="flex flex-col justify-start items-center w-64 px-5 py-4 gap-4 h-screen">
            <Button fullWidth onPress={handleNewGroupButtonPress}>
                New group +
            </Button>

            <SearchBar onTextChange={handleSearchTextChange} placeholder="Search group" takeFullWidth text={searchText}/>

            <GroupList groups={filterGroups(groups, searchText)} onGroupPress={handleGroupsPress} selectedGroup={selectedGroup}/>

            <NewGroupMenuModal isOpen={newGroupModalIsOpen} onModalClose={handleModalClose}/>
        </div>
    );
}