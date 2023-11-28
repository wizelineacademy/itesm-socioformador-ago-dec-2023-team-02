import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";

interface ConfirmDeleteModalProps {
    isOpen: boolean,
    modalText: string,
    onModalClose: (confirm: boolean) => void,
}

export default function ConfirmDeleteModal({isOpen, modalText, onModalClose}: ConfirmDeleteModalProps): JSX.Element {
    const handleCancel = (): void => {
        onModalClose(false)
    }

    const handleConfirm = (): void => {
        onModalClose(true)
    }

    return(
        <Modal hideCloseButton isOpen={isOpen} onClose={handleCancel} size="sm">
            <ModalContent>
            {(onClose) => (
                <ModalBody>
                    <p className="text-md p-2 text-center">
                        Delete {modalText}?<br/>This action is irreversible.
                    </p>
                    <div className="flex flex-row w-full justify-center gap-8 pb-2">
                        <Button color="danger" onPress={onClose} variant="light">Cancel</Button>
                        <Button color="danger" onPress={handleConfirm}>Confirm</Button>
                    </div>
                </ModalBody>
            )}
            </ModalContent>
        </Modal>
    )
}