/**
 * ModalParametersGPT Component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Prop to control the open state of the modal
 * @param {function} props.onOpenChange - Handler for changes to the open state
 * @return {JSX.Element} ModalParametersGPT component
 */
// Importing necessary libraries and components
"use client";
import React, { type ChangeEvent, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  RadioGroup,
} from "@nextui-org/react";
import { CustomRadio } from "@/components/user/conversationHeader/atoms/custom-radio";

interface Parameters {
  userContext?: string;
  responseContext?: string;
  temperature?: number;
  size?: string;
}

export default function ModalParametersDalle(props: any): JSX.Element {
  // Destructuring props to get isOpen and onOpenChange properties
  const {
    isOpen,
    onOpenChange,
    size,
    saveParameters,
  }: {
    isOpen: boolean;
    onOpenChange: () => void;
    size: string;
    saveParameters: (updatedParameters: Parameters) => void;
  } = props;

  const [updatedSize, setUpdatedSize] = useState<string>(size);

  const handleSave = (): void => {
    const updatedParameters: Parameters = {
      size: updatedSize,
    };
    saveParameters(updatedParameters);
  };
  
  // Returning the Modal component
  return (
    <Modal
      isOpen={isOpen} // Prop to control the open state of the modal
      onOpenChange={onOpenChange} // Handler for changes to the open state
      placement="center" // Placement of the modal (centered)
      radius="sm" // Border radius of the modal (small)
      size="sm" // Size of the modal (small)
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-start">
              {/* Title of the modal */}
              Image Generation Size
            </ModalHeader>
            <ModalBody>
              {/* Radio button interface to select the image size */}
              <RadioGroup
                defaultValue={size}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUpdatedSize(e.target.value);
                }}
              >
                <CustomRadio value="256x256">256x256</CustomRadio>
                <CustomRadio value="512x512">512x512</CustomRadio>
                <CustomRadio value="1024x1024">1024x1024</CustomRadio>
              </RadioGroup>
            </ModalBody>
            <ModalFooter className="flex-row-reverse justify-between">
              <div className="flex">
                {/* Cancel and Save buttons */}
                <Button
                  className="mb-2 md:mb-0 md:mr-2"
                  color="default"
                  onPress={onClose}
                  variant="light"
                >
                  Cancel
                </Button>
                <Button color="danger" onClick={handleSave} onPress={onClose}>
                  Save
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
