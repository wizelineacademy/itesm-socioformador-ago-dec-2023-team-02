"use client";

import { useContext, useEffect, useState } from "react";
import type { Group, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi";
import type { GroupsContextShape } from "@/context/groups-context";
import { GroupsContext } from "@/context/groups-context";
import { GroupsActionType, defaultGroup, filterGroups } from "@/helpers/group-helpers";
import SearchBar from "@/components/shared/molecules/search-bar";
import UserCard from "@/components/shared/molecules/user-card";
import { PrismaUserContext } from "@/context/prisma-user-context";
import type { SingleSelectionDropdownItem } from "@/types/component-types";
import SingleSelectionDropdown from "@/components/shared/molecules/single-selection-dropdown";
import GroupList from "../molecules/group-list";
import EditGroupMenuModal from "../../editGroup/molcules/edit-group-menu-modal";

export default function GroupSidebar(): JSX.Element {
  const groupsContext: GroupsContextShape | null = useContext<GroupsContextShape | null>(GroupsContext);
  const groups: Group[] = groupsContext?.groups || [];
  const [selectedGroup, setSelectedGroup] = useState<number | null>(groups[0]?.id || null);
  const [editGroupModalIsOpen, setEditGroupModalIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [sidebarIsVisible, setSidebarIsVisible] = useState<boolean>(true);
  const router = useRouter();
  const sidebarTopPadding = "py-4";
  const prismaUser = useContext<User | null>(PrismaUserContext)

  useEffect(() => {
    if (groupsContext?.groups){
      if (selectedGroup !== undefined && selectedGroup !== null && !groupsContext?.groups.map(({id}) => id).includes(selectedGroup)){
        const firstGroup: number | undefined = groupsContext?.groups[0]?.id || undefined
        if (firstGroup !== undefined){
          router.push(`/admin/group/${firstGroup}`)
          setSelectedGroup(firstGroup)
        }
      }
    }
  }, [groupsContext?.groups, selectedGroup, router])

  const handleSearchTextChange: (text: string) => void = (text) => {
    setSearchText(text);
  };

  const handleGroupsPress: (pressedGroupId: number) => void = (pressedGroupId) => {
    setSelectedGroup(pressedGroupId);
    router.push(`/admin/group/${pressedGroupId}`);
  };

  const handleModalClose: () => void = () => {
    setEditGroupModalIsOpen(false);
  };

  const handleGroupSave: (savedGroup: Group) => void = (savedGroup) => {
    if (groupsContext){
      groupsContext.groupsDispatch({
        type: GroupsActionType.Create,
        group: savedGroup
      })

      setSelectedGroup(savedGroup.id);
      router.push(`/admin/group/${savedGroup.id}`);
    }
  } 

  const handleNewGroupButtonPress: (e: any) => void = (_) => {
    setEditGroupModalIsOpen(true);
  };

  const handleSidebarVisibilityPress: (e: any) => void = (_) => {
    setSidebarIsVisible(!sidebarIsVisible);
  };

  const groupSidebarStyle = `transition-all duration-200 linear overflow-hidden flex flex-col justify-start items-center
    ${sidebarTopPadding} gap-4 h-screen ${
      sidebarIsVisible ? " w-64 px-5" : "w-0"
    }`;

  const sidebarVisibilityButton: JSX.Element = (
    <Button isIconOnly onPress={handleSidebarVisibilityPress} radius="sm">
      <PiSidebarSimple />
    </Button>
  );

  const singleSelectionDropdownItems: SingleSelectionDropdownItem[] = [
    {key: "userInterface", name: "User interface", action: () => {router.push("/conversation/new")}},
    {key: "logout", name: "Log out", action: () => {router.push("/api/auth/logout")}, style: "text-danger"}
  ]

  return (
    <div className="flex flex-row h-screen">
      <div className={groupSidebarStyle}>
        <div className="flex flex-row justify-between items-center w-full gap-2">
          <Button fullWidth onPress={handleNewGroupButtonPress}>
            New group +
          </Button>

          {sidebarVisibilityButton}
        </div>

        <SearchBar
          onTextChange={handleSearchTextChange}
          placeholder="Search group"
          takeFullWidth
          text={searchText}
        />

        <GroupList
          groups={filterGroups(groups, searchText)}
          onGroupPress={handleGroupsPress}
          selectedGroup={selectedGroup}
        />

        {prismaUser ?
        <SingleSelectionDropdown dropdownItems={singleSelectionDropdownItems} placement="top">
          <button type="button">
            <UserCard avatarUrl={prismaUser.image} description={prismaUser.creditsRemaining.toString()} name={prismaUser.name}/>
          </button>
        </SingleSelectionDropdown>
        : null}

        <EditGroupMenuModal
          initialGroup={defaultGroup()}
          isNew
          isOpen={editGroupModalIsOpen}
          onGroupSave={handleGroupSave}
          onModalClose={handleModalClose}
        />
      </div>

      <div
        className={`flex flex-col justify-start w-0 h-full px-4 ${sidebarTopPadding}`}
      >
        {!sidebarIsVisible ? sidebarVisibilityButton : null}
      </div>
    </div>
  );
}
