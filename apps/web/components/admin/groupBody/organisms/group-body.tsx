"use client";
// Import necessary hooks and utilities from React and Next.js
import { useContext, useEffect, useState } from "react";
import { useParams , useRouter } from "next/navigation";
import type { Group } from "@prisma/client";
import { Spinner } from "@nextui-org/react";
import { toast } from "sonner";
import type { GroupsContextShape } from "@/context/groups-context";
import { GroupsContext } from "@/context/groups-context";
import {
  GroupsActionType,
  placeHolderGroupData,
} from "@/helpers/group-helpers";
import type { GroupData } from "@/types/group-types";
import { GroupHeader } from "../molecules/group-header";
import EditGroupMenuModal from "../../editGroup/molcules/edit-group-menu-modal";
import GroupTable from "../molecules/group-table";

export default function GroupBody(): JSX.Element {
  const sidebarGroupsContext = useContext<GroupsContextShape | null>(
    GroupsContext
  );
  const [editGroupModalIsOpen, setEditGroupModalIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const idGroup = Number(params.id);
  const allowGroupEditing: boolean = idGroup !== 1 // 1: the id of the 'All Wizeliners' group. 

  // State for storing group data
  const [groupData, setGroupData] = useState<GroupData | null>(placeHolderGroupData());

  // State for tracking loading status
  const [loading, setLoading] = useState<boolean>(true);

  // State for updated users in group
  const [updatedUsers, setUpdatedUsers] = useState<boolean>(false);

  // State for storing error messages
  // const [error, setError] = useState<any>(null);

  const handleGroupSettingsPress: () => void = () => {
    setEditGroupModalIsOpen(true);
  };

  const handleGroupEditModalClose: () => void = () => {
    setEditGroupModalIsOpen(false);
  };

  const handleGroupSave: (savedGroup: Group) => void = (savedGroup) => {
    setGroupData({ ...savedGroup, users: groupData?.users ?? [] });

    sidebarGroupsContext?.groupsDispatch({
      type: GroupsActionType.Edit,
      groupId: savedGroup.id,
      group: savedGroup,
    });
  };

  const handleGroupDeletion: (deletedGroup: Group) => void = (deletedGroup) => {
    sidebarGroupsContext?.groupsDispatch({
      type: GroupsActionType.Delete,
      groupId: deletedGroup.id,
    });
  };

  useEffect(() => {
    async function getGroupData(): Promise<void> {
      try {
        const response = await fetch(`/api/groups/${idGroup}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: GroupData = await response.json();
        setGroupData(data);
        console.log(data);
      } catch (err: any) {
        router.push("/admin/group/1") // Redirect to 'All Wizeliners' if group's data can't be fetched. 
        // setError(err.message);
        console.log(err);
        toast.error(`Failed in fetching the data of group ${idGroup}.`);
      } finally {
        setLoading(false);
      }
    }

    if (idGroup) {
      void getGroupData();
    }

    if (updatedUsers) {
      setUpdatedUsers(false);
    }
  }, [idGroup, updatedUsers]);

  if (loading)
    return (
      <div className="w-full h-screen flex flex-row justify-center items-center">
        <Spinner color="danger" />
      </div>
    );
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5 h-full mt-0 pt-3">
      {/* Group Header */}
      <GroupHeader
        groupData={groupData ?? placeHolderGroupData()}
        onGroupsSettingsPress={handleGroupSettingsPress}
        setUpdatedUsers={setUpdatedUsers}
      />
      {/* Group Table */}
      <GroupTable
        allowMembersEditing={allowGroupEditing}
        idGroup={idGroup}
        setUpdatedUsers={setUpdatedUsers}
        users={groupData?.users ?? []}
      />

      <EditGroupMenuModal
        allowElimination={allowGroupEditing}
        initialGroup={{ ...groupData, users: undefined } as Group}
        isNew={false}
        isOpen={editGroupModalIsOpen}
        onGroupDeletion={handleGroupDeletion}
        onGroupSave={handleGroupSave}
        onModalClose={handleGroupEditModalClose}
      />
    </div>
  );
}
