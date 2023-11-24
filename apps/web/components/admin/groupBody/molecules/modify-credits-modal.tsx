import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { isDecimal, isPotentiallyDecimal, strToNumber, trimLeadingSpaces } from "@/helpers/string-helpers";
import CreditInput from "../../editGroup/molcules/credit-input";

interface ModifyCreditsModalProps {
    isOpen: boolean,
    onModalClose: () => void,
    id: number,
    setUpdatedUsers: any
}

export default function ModifyCreditsModal({isOpen, onModalClose, id, setUpdatedUsers}: ModifyCreditsModalProps): JSX.Element {
    const [creditsString, setCreditsString] = useState<string>("0")
    // determines whether the save button should be disabled
    const [isLoading, setIsLoading] = useState<boolean>(false) 

    // Reset the component's credit state when closed. 
    useEffect(() => {
        if (!isOpen){
            setCreditsString("0")
        }
    }, [isOpen])

    const handleCreditsChange: (newCredits: string) => void = (newCredits) => {
        const trimmedValue: string = trimLeadingSpaces(newCredits)
        if (trimmedValue.length === 0 || isPotentiallyDecimal(trimmedValue)){
            setCreditsString(trimmedValue)
        }
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
            creditOffset: strToNumber(creditsString)
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

    const saveButtonText: string = isNaN(Number(creditsString)) ||  Number(creditsString) >= 0 ?
        "Add credits" : "Remove credits" 

    const disableSaveButton: boolean = isLoading || !isDecimal(creditsString)

    return(
        <Modal hideCloseButton isOpen={isOpen} onClose={handleModalClose} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Add to or deduct from the current amount of credits</ModalHeader>
                        <ModalBody>
                            <div className="flex items-center justify-start w-full">
                                <CreditInput
                                    credits={creditsString}
                                    onCreditsChange={handleCreditsChange}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                                <div className="flex flex-row gap-4 items-center">
                                    <Button color="danger" onPress={onClose} variant="light">Cancel</Button>
                                    <Button
                                        className={disableSaveButton ? "opacity-50" : "opacity-100"}
                                        color="primary"
                                        isDisabled={disableSaveButton}
                                        isLoading={isLoading}
                                        onPress={handleSaveButtonPress}>
                                            {saveButtonText}
                                        </Button>
                                </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}