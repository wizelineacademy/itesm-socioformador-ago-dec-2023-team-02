import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { AiOutlineSetting } from "react-icons/ai";
import { useState } from "react";
import { TbEdit } from "react-icons/tb";
import TabButton from "../atoms/tab-button";
import TabModal from "../atoms/tab-modal";
import GlobalContext from "./global-context";
import General from "./general";

interface SettingsMenuModalProps {
    isOpen: boolean;
    includeGlobalContextSection: boolean;
    onModalClose: () => void;
}

export default function SettingsMenuModal({isOpen, includeGlobalContextSection, onModalClose}: SettingsMenuModalProps): JSX.Element {
    const [tab, setTab] = useState("general");

    return (
        <Modal
            className="min-h-[500px] overflow-y-scroll"
            isOpen={isOpen}
            onClose={onModalClose}
            placement="center"
            radius="sm"
            size="4xl"
        >
            <ModalContent>
                {(_onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">
                        Settings
                    </ModalHeader>
                    <ModalBody className="flex flex-col md:flex-row gap-1">
                        <div className="sidebar">
                            <ul className="flex flex-row md:flex-col gap-1 md:gap-2 m-2">
                                <TabButton keyword="general" setTab={() => {setTab("general")}} tab={tab} title="General">
                                    <AiOutlineSetting className="flex items-center md:hidden" size={24}/>
                                </TabButton>

                                {includeGlobalContextSection ? 
                                <TabButton keyword="custom" setTab={() => {setTab("custom")}} tab={tab} title="Global context">
                                    <TbEdit className="flex items-center md:hidden" size={24}/>
                                </TabButton>
                                : null}
                            </ul>
                        </div>
                        <TabModal keyword="general" tab={tab}>
                            {/* General */}
                            <General />
                        </TabModal>

                        {includeGlobalContextSection ? 
                        <TabModal keyword="custom" tab={tab}>
                            <GlobalContext />
                        </TabModal>
                        : null}
                    </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}