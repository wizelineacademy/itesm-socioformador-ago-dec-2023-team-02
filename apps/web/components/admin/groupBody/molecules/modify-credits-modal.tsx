import { removeLeadingZeros, strToNumber } from "@/helpers/string-helpers"
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { Input } from "@nextui-org/react"
import { User } from "@prisma/client";
import { useState } from "react"

interface GroupData {
    id: number;
    name: string;
    description: string;
    creditsAssigned: number;
    users: User[];
}

interface ModifyCreditsModalProps {
    isOpen: boolean,
    onModalClose: () => void,
    groupData: GroupData
}

export default function ModifyCreditsModal({isOpen, onModalClose}: ModifyCreditsModalProps): JSX.Element {
    const [credits, setCredits] = useState<number>(0)

    const handleCreditsChange: (value: string) => void = (value) => {
        setCredits(Number(value))
    }

    const handleModalClose: () => void = () => {
        onModalClose()
    }

    const handleSave = () => {

    }

    return(
        <Modal isOpen={isOpen} onClose={handleModalClose} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Add to or deduct from current amount of credits</ModalHeader>
                        <ModalBody>
                            <div className="flex items-center justify-center">
                                <Input
                                    className="w-1/2 text-center"
                                    type="number"
                                    label="Credits"
                                    placeholder="0.00"
                                    labelPlacement="inside"
                                    value={credits.toString()}
                                    onValueChange={handleCreditsChange}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                                <div className="flex flex-row gap-4 items-center">
                                    <Button color="danger" size="sm" onClick={onClose}>Cancel</Button>
                                    <Button color="primary" size="sm">Save</Button>
                                </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}