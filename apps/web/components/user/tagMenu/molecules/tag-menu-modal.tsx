import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import type { Tag } from "@prisma/client";
import { MdOutlineCancel, MdModeEditOutline} from "react-icons/md";
import ButtonWithIcon from "@/components/shared/atoms/button-with-icon";
import TagMenu from "./tag-menu";

interface TagMenuModalProps {
    modalTitle: string;
    initialTags: Tag[];
    initialSelectedTags: Set<number>;
    isOpen: boolean;
    allowEditing: boolean;
    onModalClose: (newTags: Tag[], newSelectedTags: Set<number>) => void;
}

export default function TagMenuModal({modalTitle, initialTags, initialSelectedTags, isOpen, allowEditing, onModalClose}: TagMenuModalProps): JSX.Element {
    const [tags, setTags] = useState<Tag[]>(initialTags)
    const [selectedTags, setSelectedTags] = useState<Set<number>>(initialSelectedTags)
    const [isEditingTags, setIsEditingTags] = useState<boolean>(false)
    const modalHorizontalPadding = "px-8"

    useEffect(() => {
        setTags(initialTags)
    }, [initialTags])

    const handleTagsChange: (newTags: Tag[]) => void = (newTags) => {
        setTags(newTags)
    }

    const handleSelectedTagsChange: (newSelectedTags: Set<number>) => void = (newSelectedTags) => {
        setSelectedTags(newSelectedTags)
    }

    const handleModalClose: () => void = () => {
        onModalClose(tags, selectedTags)
        setIsEditingTags(false)
    }

    const handleEditTagsButtonPress: () => void = () => {setIsEditingTags(!isEditingTags)}

    const editTagsButton: JSX.Element = (
        <ButtonWithIcon
            icon={isEditingTags ? <MdOutlineCancel color="white"/> : <MdModeEditOutline color="white"/>}
            isDisabled={false}
            onPress={handleEditTagsButtonPress}
            style={isEditingTags ? "bg-red-600" : "bg-sky-700"}
            text={isEditingTags ? "Cancel" : "Edit tags"}
        /> 
    )
    
    return (
        <Modal hideCloseButton isOpen={isOpen} onClose={handleModalClose}>
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className={`flex flex-row justify-between items-center mt-2 ${modalHorizontalPadding}`}>
                        <p>{modalTitle}</p>
                        {allowEditing ? editTagsButton : null}
                    </ModalHeader>
                    <ModalBody className={`${modalHorizontalPadding}`}>
                        <TagMenu
                        isEditingTags={isEditingTags} 
                        onSelectedTagsChange={handleSelectedTagsChange}
                        onTagsChange={handleTagsChange}
                        selectedTags={selectedTags}
                        tags={tags}/>
                    </ModalBody>
                    <ModalFooter className={`${modalHorizontalPadding}`}>
                        <Button color="danger" onPress={onClose} variant="light">
                            Close
                        </Button>
                    </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
}