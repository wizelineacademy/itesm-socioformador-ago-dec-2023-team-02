import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useContext, useState } from "react";
import type { Group } from "@prisma/client";
import { toast } from "sonner";
import { GroupsActionType, defaultGroup, isValidGroup } from "@/helpers/group-helpers";
import type { GroupsContextShape } from "@/context/groups-context";
import { GroupsContext } from "@/context/groups-context";
import NewGroupMenu from "./new-group-menu";

interface NewGroupMenuModalProps {
    isOpen: boolean;
    onModalClose: () => void;
}

export default function NewGroupMenuModal({isOpen, onModalClose}: NewGroupMenuModalProps): JSX.Element {
    const groupsContext: GroupsContextShape | null = useContext<GroupsContextShape | null>(GroupsContext)
    const [group, setGroup] = useState<Group>(defaultGroup())
    const modalHorizontalPadding = 5

    const handleGroupChange: (editedGroup: Group) => void = (editedGroup) => {
        setGroup(editedGroup)
    }

    const handleCreateButtonPress: (e: any) => void = (_) => {
        if (groupsContext){
            createGroup()
        }
        onModalClose()
    }

    const createGroup: () => void = () => {
        const fetchOptions: RequestInit = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...group, id: undefined})
        }

        fetch("/api/groups", fetchOptions)
        .then((response) => {
            if (!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then((createdGroup) => {
            groupsContext?.groupsDispatch({
                type: GroupsActionType.Create,
                group: createdGroup as Group
            })

            toast.success("Group created.")
        })
        .catch((_) => {
            toast.error("Failed to create the group.")
        })
    }

    const handleModalClose: () => void = () => {
        onModalClose()
    }

    const saveIsDisabled = !isValidGroup(group)

    return (
        <Modal hideCloseButton isOpen={isOpen} onClose={handleModalClose}>
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className={`flex flex-row justify-between items-center mt-2 ${modalHorizontalPadding}`}>
                        <p>New group</p>
                    </ModalHeader>
                    <ModalBody className={`${modalHorizontalPadding}`}>
                        <NewGroupMenu
                            group={group}
                            onGroupChange={handleGroupChange}
                        />
                    </ModalBody>
                    <ModalFooter className={`${modalHorizontalPadding}`}>
                        <div className="flex flex-row gap-4 items-center">
                            <Button color="danger" onPress={onClose} variant="light">
                                Close
                            </Button>

                            <Button
                                className={saveIsDisabled ? "opacity-50" : "opacity-100"}
                                color="primary" isDisabled={saveIsDisabled}
                                onPress={handleCreateButtonPress}
                            >
                                Create
                            </Button>
                        </div>
                    </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
}