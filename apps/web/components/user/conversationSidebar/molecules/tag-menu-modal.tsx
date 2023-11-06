import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import TagMenu from "./tag-menu";

interface TagMenuModalProps {
    modalTitle: string;
    initialTags: SidebarTag[];
    initialSelectedTags: Set<number>;
    isOpen: boolean;
    allowEditing: boolean;
    onModalClose: (newTags: SidebarTag[], newSelectedTags: Set<number>) => void;
}

export default function TagMenuModal({modalTitle, initialTags, initialSelectedTags, isOpen, allowEditing, onModalClose}: TagMenuModalProps): JSX.Element {
    const [tags, setTags] = useState<SidebarTag[]>(initialTags)
    const [selectedTags, setSelectedTags] = useState<Set<number>>(initialSelectedTags)

    const handleTagsChange: (newTags: SidebarTag[]) => void = (newTags) => {
        setTags(newTags)
    }

    const handleSelectedTagsChange: (newSelectedTags: Set<number>) => void = (newSelectedTags) => {
        setSelectedTags(newSelectedTags)
    }

    const handleModalClose: () => void = () => {
        onModalClose(tags, selectedTags)
    }
    
    return (
        <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalContent>
        {(onClose) => (
            <>
            <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
            <ModalBody>
                <TagMenu
                allowEditing={allowEditing} 
                onSelectedTagsChange={handleSelectedTagsChange}
                onTagsChange={handleTagsChange}
                selectedTags={selectedTags}
                tags={tags}/>
            </ModalBody>
            <ModalFooter>
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