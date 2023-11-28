import type { Group } from "@prisma/client";
import { Divider } from "@nextui-org/react";
import GroupCard from "../atoms/group-card";

interface GroupListProps {
    groups: Group[];
    selectedGroup: number | null;
    onGroupPress: (pressedGroupId: number) => void;
}

export default function GroupList({groups, selectedGroup, onGroupPress}: GroupListProps): JSX.Element {
    if (groups.length === 0){
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <p className="text-neutral-300 p-4">No items to display</p>
            </div>
        ); 
    }

    return (
        <div className="overflow-x-hidden overflow-y-auto w-full h-full scrollbar-hide">
        {/* <div className="flex flex-col gap-2 justify-start w-full h-full overflow-y-auto scrollbar-hide"> */}
            <div className="flex flex-col space-y-2 w-full scrollbar-hide">
            {groups.map((group, index) => (
                <>
                    <GroupCard
                        group={group}
                        isAllUsersGroup={index === 0}
                        isSelected={selectedGroup === group.id}
                        key={group.id} onPress={() => {onGroupPress(group.id)}}
                    />

                    {index === 0 ?
                    <Divider className="m-1 my-0 dark"/>
                    : null}
                </>
            ))} 
        </div>
        </div>
    );
}