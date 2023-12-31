"use client";

import { useContext, useEffect, useState } from "react";
import type { Group } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import type { GroupsContextShape } from "@/context/groups-context";
import { GroupsContext } from "@/context/groups-context";
import {
  GroupsActionType,
  defaultGroup,
  filterGroups,
} from "@/helpers/group-helpers";
import SearchBar from "@/components/shared/molecules/search-bar";
import UserCard from "@/components/shared/molecules/user-card";
import type { PrismaUserContextShape } from "@/context/prisma-user-context";
import { PrismaUserContext } from "@/context/prisma-user-context";
import type { SingleSelectionDropdownItem } from "@/types/component-types";
import SingleSelectionDropdown from "@/components/shared/molecules/single-selection-dropdown";
import { roundUsersCredits } from "@/helpers/user-helpers";
import SettingsMenuModal from "@/components/shared/molecules/settings-menu-modal";
import GroupList from "../molecules/group-list";
import EditGroupMenuModal from "../../editGroup/molcules/edit-group-menu-modal";

export default function GroupSidebar(): JSX.Element {
  const groupsContext: GroupsContextShape | null =
    useContext<GroupsContextShape | null>(GroupsContext);
  const groups: Group[] = groupsContext?.groups || [];
  const [selectedGroup, setSelectedGroup] = useState<number | null>(
    groups[0]?.id || null
  );
  const [editGroupModalIsOpen, setEditGroupModalIsOpen] = useState<boolean>(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [sidebarIsVisible, setSidebarIsVisible] = useState<boolean>(true);
  const router = useRouter();
  const sidebarTopPadding = "py-4";
  const prismaUserContext = useContext<PrismaUserContextShape | null>(PrismaUserContext);

  useEffect(() => {
    if (groupsContext?.groups) {
      if (
        selectedGroup !== undefined &&
        selectedGroup !== null &&
        !groupsContext?.groups.map(({ id }) => id).includes(selectedGroup)
      ) {
        const firstGroup: number | undefined =
          groupsContext?.groups[0]?.id || undefined;
        if (firstGroup !== undefined) {
          router.push(`/admin/group/${firstGroup}`);
          setSelectedGroup(firstGroup);
        }
      }
    }
  }, [groupsContext?.groups, selectedGroup, router]);

  const handleSearchTextChange: (text: string) => void = (text) => {
    setSearchText(text);
  };

  const handleGroupsPress: (pressedGroupId: number) => void = (
    pressedGroupId
  ) => {
    setSelectedGroup(pressedGroupId);
    router.push(`/admin/group/${pressedGroupId}`);
  };

  const handleModalClose: () => void = () => {
    setEditGroupModalIsOpen(false);
  };

  const handleSettingsModalClosing: () => void = () => {
    setSettingsModalIsOpen(false)
  }

  const handleGroupSave: (savedGroup: Group) => void = (savedGroup) => {
    if (groupsContext) {
      groupsContext.groupsDispatch({
        type: GroupsActionType.Create,
        group: savedGroup,
      });

      setSelectedGroup(savedGroup.id);
      router.push(`/admin/group/${savedGroup.id}`);
    }
  };

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
    <Button
      className={`${
        sidebarIsVisible ? "dark" : ""}`}
      isIconOnly
      onPress={handleSidebarVisibilityPress}
      radius="sm"
    >
      <PiSidebarSimple />
    </Button>
  );

  const singleSelectionDropdownItems: SingleSelectionDropdownItem[] = [
    {
      key: "userInterface",
      name: "User interface",
      action: () => {
        router.push("/conversation/new");
      },
    },
    {
      key: "settings",
      name: "Settings",
      action: () => {
        setSettingsModalIsOpen(true)
      },
    },
    {
      key: "logout",
      name: "Log out",
      action: () => {
        router.push("/api/auth/logout");
      },
      style: "text-danger",
    },
  ];

  return (
    <div className="flex flex-row items-start space-x-0 absolute z-50 md:z-auto md:relative pt-0 bg-black">
      <div className={groupSidebarStyle}>
        <div className="w-full flex items-center gap-1 justify-between">
          <Button
            color="danger"
            fullWidth
            onPress={handleNewGroupButtonPress}
            radius="sm"
          >
            <p className="text-xs">
              <AiOutlinePlus />
            </p>
            <p className="text-xs">New Group</p>
          </Button>

          {sidebarVisibilityButton}
        </div>

        <div className="dark text-white">
          <SearchBar
            onTextChange={handleSearchTextChange}
            placeholder="Search group"
            takeFullWidth
            text={searchText}
          />
        </div>

        <GroupList
          groups={filterGroups(groups, searchText)}
          onGroupPress={handleGroupsPress}
          selectedGroup={selectedGroup}
        />

        {prismaUserContext ? (
          <div className="flex justify-between bg-black w-full px-4 hover:cursor-pointer">
            <SingleSelectionDropdown
              dropdownItems={singleSelectionDropdownItems}
              placement="top"
            >
              <button className="w-full" type="button">
                <UserCard
                  avatarUrl={prismaUserContext?.prismaUser?.image}
                  description={`${roundUsersCredits(prismaUserContext?.prismaUser) ?? ""} Credits`}
                  name={prismaUserContext?.prismaUser?.name}
                />
              </button>
            </SingleSelectionDropdown>
          </div>
        ) : null}

        <EditGroupMenuModal
          initialGroup={defaultGroup()}
          isNew
          isOpen={editGroupModalIsOpen}
          onGroupSave={handleGroupSave}
          onModalClose={handleModalClose}
        />

        <SettingsMenuModal
          includeGlobalContextSection={false}
          isOpen={settingsModalIsOpen}
          onModalClose={handleSettingsModalClosing}
        />
      </div>

      <div
        className={`${
          sidebarIsVisible ? "hidden" : "block"
        }  w-2 absolute -right-6 z-50 top-2 md:top-2`}
      >
        {!sidebarIsVisible ? sidebarVisibilityButton : null}
      </div>
    </div>
  );
}
