import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow } from "@nextui-org/react";

interface TextDescriptionModalProps {
    description: string;
    isOpen: boolean;
    onModalClose: () => void;
}

export default function TextDescriptionModal({description, isOpen, onModalClose}: TextDescriptionModalProps): JSX.Element {
    const handleModalClosing: () => void = () => {onModalClose()}

    return (
        <Modal hideCloseButton isOpen={isOpen} onClose={handleModalClosing}>
            <ModalContent className="p-2">
                {(onClose) => (
                    <>
                    <ModalHeader>
                        Group Description
                    </ModalHeader>
                    <ModalBody>
                        <ScrollShadow
                            className={`min-h-[200px] max-h-[400px] mb-2 ${description.length === 0 ? "opacity-50" : "opacity-100"}`}
                            hideScrollBar size={60}>
                            {description.length > 0 ? description : "Use Group Settings to add a description the group."}
                        </ScrollShadow>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onPress={(_) => {onClose()}}>
                            Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}