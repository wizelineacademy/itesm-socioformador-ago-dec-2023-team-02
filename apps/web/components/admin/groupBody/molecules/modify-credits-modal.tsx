import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter , Input } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { toast } from "sonner";

interface ModifyCreditsModalProps {
    isOpen: boolean,
    onModalClose: () => void,
    id: number,
    setUpdatedUsers: any
}

export default function ModifyCreditsModal({isOpen, onModalClose, id, setUpdatedUsers}: ModifyCreditsModalProps): JSX.Element {
    const [credits, setCredits] = useState<string>(0)
    // determines whether the save button should be disabled
    const [isLoading, setIsLoading] = useState<boolean>(false) 

    // Reset the component's credit state when closed. 
    useEffect(() => {
        if (!isOpen){
            setCredits(0)
        }
    }, [isOpen])

    const handleCreditsChange: (value: string) => void = (value) => {
        setCredits(Number(value))
    }

    const handleModalClose: () => void = () => {
        onModalClose()
    }

    const handleSaveButtonPress: () => void = () => {
        setIsLoading(true)
        modifyCredits()
    }

    // interface to format the request data
    interface ModifyCreditsData {
        creditOffset: number
    }

    const modifyCredits: () => void = () => {
        const data: ModifyCreditsData = {
            creditOffset: credits
        }

        // set the fetch options such as the method and request body
        const fetchOptions: RequestInit = {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        }

        // fetch call to the api route, if an error it is displayed
        fetch(`/api/groups/modifyCredits/${id}`, fetchOptions)
        .then((response) => {
            if (!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then(() => {
            toast.success("Successfully modified credits")
            onModalClose()
        })
        .catch((_) => {
            toast.error("Failed to modfiy credits")
            console.log(_)
        })
        .finally(() => {
            setIsLoading(false)
            // updates the users so that the modified credits appear
            setUpdatedUsers(true)
        })
    }

    return(
        <Modal hideCloseButton isOpen={isOpen} onClose={handleModalClose} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Add to or deduct from the current amount of credits</ModalHeader>
                        <ModalBody>
                            <div className="flex items-center justify-center">
                                <Input
                                    className="w-1/3"
                                    label="Credits"
                                    labelPlacement="inside"
                                    onValueChange={handleCreditsChange}
                                    placeholder="0.00"
                                    type="number"
                                    value={credits.toString()}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                                <div className="flex flex-row gap-4 items-center">
                                    <Button color="danger" onPress={onClose} variant="light">Cancel</Button>
                                    <Button color="primary" isDisabled={isLoading} isLoading={isLoading} onPress={handleSaveButtonPress}>Save</Button>
                                </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}