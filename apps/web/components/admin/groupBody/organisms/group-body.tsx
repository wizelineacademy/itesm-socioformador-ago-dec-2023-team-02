"use client";
// Import necessary hooks and utilities from React and Next.js
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "@prisma/client";
import {Spinner} from "@nextui-org/react";
import { GroupHeader } from "../molecules/group-header";
import { GroupTable } from "../molecules/group-table";
import { toast } from "sonner";

// Define the type for the group data
interface GroupData {
    id: number;
    name: string;
    description: string;
    creditsAssigned: number;
    users: User[];
};

export default function GroupBody(): JSX.Element {
    const params = useParams();
    const idConversation = Number(params.id);

    // State for storing group data
    const [groupData, setGroupData] = useState<GroupData | null>(null);

    // State for tracking loading status
    const [loading, setLoading] = useState<boolean>(true);

    // State for storing error messages
    // const [error, setError] = useState<any>(null);

    useEffect(() => {
        async function getGroupData() {
            try {
                const response = await fetch(`http://localhost:3000/api/groups/${idConversation}`, {
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

        if (idConversation) {
            void getGroupData();
        }
    }, [idConversation]);

    if (loading) return <div><Spinner color="danger" /></div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/* Group Header */}
            <GroupHeader groupName={groupData.name} groupDescription={groupData.description} />
            {/* Group Table */}
            <GroupTable users={groupData.users} />

        </div>
    );
}
