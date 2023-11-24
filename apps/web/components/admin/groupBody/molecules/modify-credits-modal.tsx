import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import { toast } from "sonner";
import { isDecimal, isPotentiallyDecimal, strToNumber, trimLeadingSpaces } from "@/helpers/string-helpers";
import type { PrismaUserContextShape } from "@/context/prisma-user-context";
import { PrismaUserContext } from "@/context/prisma-user-context";
import { editUserCreditsRemaining } from "@/helpers/user-helpers";
import type { GroupData } from "@/types/group-types";
import { groupDataContainsUser } from "@/helpers/group-helpers";
import CreditInput from "../../editGroup/molcules/credit-input";

interface ModifyCreditsModalProps {
    groupData: GroupData;
    isOpen: boolean;
    onModalClose: () => void;
    setUpdatedUsers: any;
}

export default function ModifyCreditsModal({groupData, isOpen, onModalClose, setUpdatedUsers}: ModifyCreditsModalProps): JSX.Element {
    const [creditsString, setCreditsString] = useState<string>("0")
    // determines whether the save button should be disabled
    const [isLoading, setIsLoading] = useState<boolean>(false) 
    const prismaUserContext = useContext<PrismaUserContextShape | null>(PrismaUserContext)

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
        const creditOffset: number = strToNumber(creditsString)

        const data: ModifyCreditsData = {
            creditOffset
        }

        // set the fetch options such as the method and request body
        const fetchOptions: RequestInit = {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        }

        // fetch call to the api route, if an error it is displayed
        fetch(`/api/groups/modifyCredits/${groupData.id}`, fetchOptions)
        .then((response) => {
            if (!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then(() => {
            toast.success("Successfully modified the group's credit number")

            if (prismaUserContext && groupDataContainsUser(groupData, prismaUserContext.prismaUser.id)){
                const userNewCreditsRemaining: number = prismaUserContext.prismaUser.creditsRemaining + creditOffset
                prismaUserContext.setPrismaUser(
                    editUserCreditsRemaining(prismaUserContext.prismaUser, userNewCreditsRemaining < 0 ? 0 : userNewCreditsRemaining)
                )
            }

            onModalClose()
        })
        .catch((_) => {
            toast.error("Failed to modfiy the group's credit number")
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