"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { BiLineChart } from "react-icons/bi";
import { TiKeyOutline } from "react-icons/ti";
import { AiOutlineSetting } from "react-icons/ai";
import TabButton from "../atoms/tab-button";
import TabModal from "../atoms/tab-modal";
import General from "./general";
import Usage from "./usage";

export default function Settings(): JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tab, setTab] = useState("general");

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal
        className="min-h-[500px] overflow-y-scroll"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                  <ul className=" flex flex-row md:flex-col gap-1 md:gap-2 m-2">
                    <TabButton
                      keyword="general"
                      setTab={() => {
                        setTab("general");
                      }}
                      tab={tab}
                      title="General"
                    >
                      <AiOutlineSetting
                        className="flex items-center md:hidden"
                        size={24}
                      />
                    </TabButton>
                    <TabButton
                      keyword="custom"
                      setTab={() => {
                        setTab("custom");
                      }}
                      tab={tab}
                      title="Custom Instruction"
                    >
                      <TbEdit
                        className="flex items-center md:hidden"
                        size={24}
                      />
                    </TabButton>
                    <TabButton
                      keyword="usage"
                      setTab={() => {
                        setTab("usage");
                      }}
                      tab={tab}
                      title="Usage"
                    >
                      <BiLineChart
                        className="flex items-center md:hidden"
                        size={24}
                      />
                    </TabButton>
                    <TabButton
                      keyword="api"
                      setTab={() => {
                        setTab("api");
                      }}
                      tab={tab}
                      title="API Key"
                    >
                      <TiKeyOutline
                        className="flex items-center md:hidden"
                        size={24}
                      />
                    </TabButton>
                  </ul>
                </div>
                <TabModal keyword="general" tab={tab}>
                  {/* General */}
                  <General/>
                </TabModal>
                <TabModal keyword="custom" tab={tab}>
                  Custom
                </TabModal>
                <TabModal keyword="usage" tab={tab}>
                  <Usage/>
                </TabModal>
                <TabModal keyword="api" tab={tab}>
                  API
                </TabModal>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
