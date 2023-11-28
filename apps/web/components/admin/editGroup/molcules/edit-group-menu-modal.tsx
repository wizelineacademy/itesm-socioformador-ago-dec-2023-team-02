import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import type { Group } from "@prisma/client";
import { toast } from "sonner";
import { AiFillDelete } from "react-icons/ai"
import { GroupsActionType, groupsAreEqual, isValidGroup } from "@/helpers/group-helpers";
import ConfirmDeleteModal from "@/components/shared/molecules/confirm-delete-modal";
import { GroupsContext, type GroupsContextShape } from "@/context/groups-context";
import NewGroupMenu from "./edit-group-menu";

interface EditGroupMenuModalProps {
    isNew: boolean;
    allowElimination: boolean;
    initialGroup: Group;
    isOpen: boolean;
    onGroupSave: (savedGroup: Group) => void;
    onGroupDeletion?: (deletedGroup: Group) => void;
    onModalClose: () => void;
}

export default function EditGroupMenuModal({isNew, allowElimination, initialGroup, isOpen, onGroupSave, onGroupDeletion, onModalClose}: EditGroupMenuModalProps): JSX.Element {
    const [group, setGroup] = useState<Group>(initialGroup)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState<boolean>(false)
    const modalHorizontalPadding = 5
    const saveIsDisabled = !isValidGroup(group) || groupsAreEqual(initialGroup, group)
    const groupsContext = useContext<GroupsContextShape | null>(GroupsContext)

    useEffect(() => {
        if (!isOpen){
            setGroup(initialGroup)
        }
    }, [initialGroup, isOpen])

    const handleGroupChange: (editedGroup: Group) => void = (editedGroup) => {
        setGroup(editedGroup)
    }

    const handleSaveButtonPress: (e: any) => void = (_) => {        
        if (!saveIsDisabled && !isLoading){
            setIsLoading(true)
            isNew ? createGroup() : editGroup()
        }
    }

    const handleDeleteButtonPress: (e: any) => void = (_) => {
        if (onGroupDeletion && !isNew && allowElimination){
            onModalClose()
            setConfirmDeleteModalIsOpen(true)
        }
    }

    const handleConfirmDeleteModalClosing: (confirm: boolean) => void = (confirm) => {
        if (confirm){
            deleteGroup()
        }

        setConfirmDeleteModalIsOpen(false)
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
            onGroupSave(createdGroup as Group)

            toast.success("Group created.")
            onModalClose()
        })
        .catch((_) => {
            toast.error("Failed to create the group.")
        })
        .finally(() => {setIsLoading(false)})
    }

    const editGroup: () => void = () => {
        const fetchOptions: RequestInit = {
            method: "PATCH",
            headers: {"Content-type": "application/json", },
            body: JSON.stringify(group)
        }

        fetch(`/api/groups/${group.id}`, fetchOptions)
        .then((response) => {
            if (!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then((editedGroup) => {
            onGroupSave(editedGroup as Group)

            toast.success("Group edited.")
            onModalClose()
        })
        .catch((_) => {
            toast.error(`Failed to edit the group.`)
        })
        .finally(() => {setIsLoading(false)})
    }

    const deleteGroup: () =>  void = () => {
        const fetchOptions: RequestInit = {method: "DELETE"}

        fetch(`/api/groups/${group.id}`, fetchOptions)
        .then((response) => {
            if (!response.ok){
                throw new Error("Network response was not ok")
            }
            groupsContext?.groupsDispatch({
                type: GroupsActionType.Delete,
            })
            return response.json()
        })
        .then((deletedGroup) => {
            if (onGroupDeletion){
                onGroupDeletion(deletedGroup as Group)
                toast.success("Group deleted successfully.")
            }
        })
        .catch((_) => {
            toast.error(`Failed to delete the group.`)
        })
    }

    const handleModalClose: () => void = () => {
        onModalClose()
    }

    return (
        <>
            <Modal hideCloseButton isOpen={isOpen} onClose={handleModalClose}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={`flex flex-row justify-between items-center mt-2 ${modalHorizontalPadding}`}>
                            <div className="flex flex-row justify-between items-center w-full">
                                <p>{isNew ? "New group" : "Edit group"}</p>

                                {!isNew && allowElimination ? 
                                <Button color="danger" isIconOnly onPress={handleDeleteButtonPress}>
                                    <AiFillDelete/>
                                </Button>
                                : null}
                            </div>
                        </ModalHeader>
                        <ModalBody className={`${modalHorizontalPadding}`}>
                            <NewGroupMenu
                                group={group}
                                isEditing={isOpen}
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
                                    isLoading={isLoading}
                                    onPress={handleSaveButtonPress}
                                >
                                    {isNew ? "Create" : "Edit"}
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>

            <ConfirmDeleteModal
                isOpen={confirmDeleteModalIsOpen}
                modalText="group"
                onModalClose={handleConfirmDeleteModalClosing}
            />
        </>
    );
}