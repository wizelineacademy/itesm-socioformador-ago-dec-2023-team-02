"use client";
// Import necessary hooks and utilities from React and Next.js
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Group, User } from "@prisma/client";
import {Spinner} from "@nextui-org/react";
import { toast } from "sonner";
import type { GroupsContextShape } from "@/context/groups-context";
import { GroupsContext } from "@/context/groups-context";
import { GroupsActionType } from "@/helpers/group-helpers";
import { GroupHeader } from "../molecules/group-header";
import { GroupTable } from "../molecules/group-table";
import EditGroupMenuModal from "../../editGroup/molcules/edit-group-menu-modal";

// Define the type for the group data
interface GroupData {
    id: number;
    name: string;
    description: string;
    creditsAssigned: number;
    users: User[];
};

export default function GroupBody(): JSX.Element {
    const sidebarGroupsContext = useContext<GroupsContextShape | null>(GroupsContext)
    const [editGroupModalIsOpen, setEditGroupModalIsOpen] = useState<boolean>(false)
    const params = useParams();
    const idGroup = Number(params.id);

    // State for storing group data
    const [groupData, setGroupData] = useState<GroupData | null>(null);

    // State for tracking loading status
    const [loading, setLoading] = useState<boolean>(true);

    // State for updated users in group
    const [updatedUsers, setUpdatedUsers] = useState<boolean>(false);


    // State for storing error messages
    // const [error, setError] = useState<any>(null);

    const handleGroupSettingsPress: () => void = () => {setEditGroupModalIsOpen(true)}

    const handleGroupEditModalClose: () => void = () => {setEditGroupModalIsOpen(false)}

    const handleGroupSave: (savedGroup: Group) => void = (savedGroup) => {
        setGroupData({...savedGroup, users: groupData?.users})

        sidebarGroupsContext?.groupsDispatch({
            type: GroupsActionType.Edit,
            groupId: savedGroup.id,
            group: savedGroup
        })
    }

    const handleGroupDeletion: (deletedGroup: Group) => void = (deletedGroup) => {
        sidebarGroupsContext?.groupsDispatch({
            type: GroupsActionType.Delete,
            groupId: deletedGroup.id,
        })
    }

    useEffect(() => {
        async function getGroupData() {
            try {
                const response = await fetch(`http://localhost:3000/api/groups/${idGroup}`, {
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
                // setError(err.message);
                console.log(err);
                toast.error("Failed getting group data");
            } finally {
                setLoading(false);
            }
        }

        if (idGroup) {
            void getGroupData();
        }

        if(updatedUsers){
            setUpdatedUsers(false);
        }
    }, [idGroup, updatedUsers]);




    if (loading) return <div><Spinner color="danger" /></div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-5 h-full">
            {/* Group Header */}
            <GroupHeader creditsAssigned={groupData.creditsAssigned} groupName={groupData.name} onGroupsSettingsPress={handleGroupSettingsPress}/>
            {/* Group Table */}
            <GroupTable idGroup={idGroup} setUpdatedUsers={setUpdatedUsers} users={groupData.users} />

            <EditGroupMenuModal
                initialGroup={{...groupData, users: undefined} as Group}
                isNew={false}
                isOpen={editGroupModalIsOpen}
                onGroupDeletion={handleGroupDeletion}
                onGroupSave={handleGroupSave}
                onModalClose={handleGroupEditModalClose}
            />
        </div>
    );
}
