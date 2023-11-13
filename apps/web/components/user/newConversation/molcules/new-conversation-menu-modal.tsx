import { useState } from "react";
import type { Tag } from "@prisma/client";
import { toast } from "sonner";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { isValidConversationName } from "@/helpers/sidebar-conversation-helpers";
import { imposeMaxLength, trimLeadingSpaces } from "@/helpers/string-helpers";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";
import { mapTagIdsToTags } from "@/helpers/tag-helpers";
import { setToArray } from "@/helpers/set-helpers";
import NewConversationMenu from "./new-conversation-menu";

interface NewConversationMenuModalProps {
    isOpen: boolean;
    models: ModelWithProvider[];
    userTags: Tag[];
    onModalClose: () => void;
    onConversationCreation: (newConversation: SidebarConversation) => void;
}

export default function NewConversationMenuModal({isOpen, models, userTags, onModalClose, onConversationCreation}: NewConversationMenuModalProps): JSX.Element {
    const [conversationName, setConversationName] = useState<string>("")
    const [conversationModelId, setConversationModelId] = useState<number | null>(null)
    const [conversationTags, setConversationTags] = useState<Set<number>>(new Set<number>())
    const titleMaxLength = 25 
    const modalHorizontalPadding = "px-8"

    const resetState: () => void = () => {
        setConversationName("")
        setConversationModelId(null)
        setConversationTags(new Set<number>())
    }

    const handleConversationNameChange: (newName: string) => void = (newName) => {
        setConversationName(imposeMaxLength(trimLeadingSpaces(newName), titleMaxLength))
    }

    const handleConversationModelIdChange: (newModelId: number | null) => void = (newModelId) => {
        setConversationModelId(newModelId)
    }

    const handleConversationTagsChange: (newTags: Set<number>) => void = (newTags) => {
        setConversationTags(newTags)
    }

    const creationIsDisabled = !isValidConversationName(conversationName) || conversationModelId === null

    const handleCreateButtonPress: (e: any) => void = (_) => {
        if (!creationIsDisabled){
            createConversation()
        }
    }

    const createConversation: () => void = () => {
        const conversationTagArray: Tag[] = mapTagIdsToTags(setToArray(conversationTags), userTags)

        const fetchOptions: RequestInit = {method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: conversationName,
              idUser: 1,
              idModel: conversationModelId,
              tags: conversationTagArray
            }),
          };
        fetch(`/api/conversations`, fetchOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((createdConversation) => {
            onConversationCreation(createdConversation as SidebarConversation)
            resetState()
            toast.success("Conversation created.")
        })
        .catch((_) => {
            toast.error("Failed to create the conversation.")
        });
    }

    const handleModalClosing: () => void = () => {
        onModalClose()
        resetState()
    }
    
    return (
        <Modal hideCloseButton isOpen={isOpen} onClose={handleModalClosing}>
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className={`flex flex-col gap-1  mt-2 ${modalHorizontalPadding}`} >
                        New chat
                    </ModalHeader>
                    <ModalBody className={`${modalHorizontalPadding}`}>
                        <NewConversationMenu
                            conversationModelId={conversationModelId}
                            conversationName={conversationName}
                            conversationTags={conversationTags}
                            models={models}
                            onConversationModelIdChange={handleConversationModelIdChange}
                            onConversationNameChange={handleConversationNameChange}
                            onConversationTagsChange={handleConversationTagsChange}
                            userTags={userTags}
                        />
                    </ModalBody>
                    <ModalFooter className={`${modalHorizontalPadding}`}>
                        <div className="flex flex-row items-center gap-2">
                            <Button color="danger" onPress={onClose} variant="light">
                                Close
                            </Button>

                            <Button
                                className={creationIsDisabled ? "opacity-50" : "opacity-100"}
                                color="primary" isDisabled={creationIsDisabled}
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