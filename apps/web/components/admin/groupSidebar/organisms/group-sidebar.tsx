"use client";

import { useContext, useState } from "react";
import type { Group } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Button } from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi";
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
    const [sidebarIsVisible, setSidebarIsVisible] = useState<boolean>(true)
    const router: AppRouterInstance = useRouter()
    const sidebarTopPadding = "py-4"

    const handleSearchTextChange: (text: string) => void = (text) => {
        setSearchText(text)
    }

    const handleGroupsPress: (pressedGroupId: number) => void = (pressedGroupId) => {
        setSelectedGroup(pressedGroupId)
        router.push(`/admin/group/${pressedGroupId}`)
    }

    const handleModalClose: () => void = () => { setNewGroupModalIsOpen(false)}

    const handleNewGroupButtonPress: (e: any) => void = (_) => {setNewGroupModalIsOpen(true)}

    const handleSidebarVisibilityPress: (e: any) => void = (_) => {setSidebarIsVisible(!sidebarIsVisible)}

    const groupSidebarStyle = `transition-all duration-200 linear overflow-hidden flex flex-col justify-start items-center
    ${sidebarTopPadding} gap-4 h-screen ${sidebarIsVisible ? " w-64 px-5" : "w-0"}`

    const sidebarVisibilityButton: JSX.Element = (
        <Button isIconOnly onPress={handleSidebarVisibilityPress} radius="sm">
            <PiSidebarSimple />
        </Button>
    )

    return (
        <div className="flex flex-row h-screen">
            <div className={groupSidebarStyle}>
                <div className="flex flex-row justify-between items-center w-full gap-2">
                    <Button fullWidth onPress={handleNewGroupButtonPress}>
                        New group +
                    </Button>

                    {sidebarVisibilityButton}
                </div>

                <SearchBar onTextChange={handleSearchTextChange} placeholder="Search group" takeFullWidth text={searchText}/>

                <GroupList groups={filterGroups(groups, searchText)} onGroupPress={handleGroupsPress} selectedGroup={selectedGroup}/>

                <NewGroupMenuModal isOpen={newGroupModalIsOpen} onModalClose={handleModalClose}/>
            </div>

            <div className={`flex flex-col justify-start w-0 h-full px-4 ${sidebarTopPadding}`}>
                    {!sidebarIsVisible ? sidebarVisibilityButton : null}
            </div>
        </div>

    );
}