/**
 * ModalParametersGPT Component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Prop to control the open state of the modal
 * @param {function} props.onOpenChange - Handler for changes to the open state
 * @return {JSX.Element} ModalParametersGPT component
 */
// Importing necessary libraries and components
"use client";
import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Textarea,
  Tooltip,
  Switch,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { Slider } from "@/components/ui/slider";

// ModalParametersGPT Component
export default function ModalParametersGPT(props: any) {
  // Destructuring props to get isOpen and onOpenChange properties
  const { isOpen, onOpenChange, userContext, responseContext, temperature } =
    props;

  // Returning the Modal component
  return (
    <Modal
      isOpen={isOpen} // Prop to control the open state of the modal
      onOpenChange={onOpenChange} // Handler for changes to the open state
      size="lg" // Size of the modal (large)
      placement="center" // Placement of the modal (centered)
      radius="sm" // Border radius of the modal (small)
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {/* Title of the modal */}
              Conversation Context
            </ModalHeader>
            <ModalBody>
              {/* Label and Textarea for entering personal parameters */}
              <label className="mb-0" htmlFor="customInstructions">
                <p className="text-xs text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">
                  What would you like ChatGPT to know about you to provide
                  better responses?
                </p>
              </label>
              {/* Tooltip for additional information on personal parameters */}
              <Tooltip placement="right" content={<PersonalParameterTooltip />}>
                <Textarea
                  labelPlacement="outside"
                  placeholder=""
                  radius="sm"
                  className="max-w-[800px] w-full p-0 text-sm text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200"
                  variant="faded"
                  minRows={8}
                  maxRows={8}
                  defaultValue={userContext}
                />
              </Tooltip>

              {/* Label and Textarea for entering response parameters */}
              <label className="mb-0" htmlFor="customInstructions">
                <p className="text-xs text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">
                  How would you like ChatGPT to respond?
                </p>
              </label>
              {/* Tooltip for additional information on response parameters */}
              <Tooltip placement="right" content={<ResponseParameterTooltip />}>
                <Textarea
                  labelPlacement="outside"
                  placeholder=""
                  radius="sm"
                  className="max-w-[800px] w-full p-0 text-sm text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200"
                  variant="faded"
                  minRows={8}
                  maxRows={8}
                  defaultValue={responseContext}
                />
              </Tooltip>

              {/* Label and Slider for temperature parameters */}

              {/* Label for temperature parameters for xs and sm screens */}
              <div className="md:hidden">
                <Popover className="ml-auto md:hidden" placement="top">
                  <PopoverTrigger>
                    <label
                      className="mb-2 ml-auto md:hidden"
                      htmlFor="customInstructions"
                    >
                      <p className="flex text-xs text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">
                        How creative should ChatGPT be?{" "}
                        <span className="text-lg">
                          <AiOutlineInfoCircle className="p-0 pl-1" />
                        </span>
                      </p>
                    </label>
                  </PopoverTrigger>
                  <PopoverContent>
                    <TemperatureTooltip />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Label for temperature parameters for md and above screens*/}
              <div className="hidden md:inline">
                <Tooltip placement="right" content={<TemperatureTooltip />}>
                  <label
                    className="mb-0 hidden md:inline "
                    htmlFor="customInstructions"
                  >
                    <p className="flex text-xs text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">
                      How creative should ChatGPT be?{" "}
                      <span className="text-lg">
                        <AiOutlineInfoCircle className="p-0 pl-1" />
                      </span>
                    </p>
                  </label>
                </Tooltip>
              </div>

              {/* Slider for temperature parameters */}
              <Slider defaultValue={[temperature]} max={1} min={0} step={0.1} />
            </ModalBody>
            <ModalFooter className="flex flex-col md:flex-row justify-between">
              <div className="flex items-center justify-between mb-4 md:mb-0">
                {/* Switch for global parameters usage */}
                <p className="text-xs text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200">
                  Use Global GPT Context
                </p>
                <Switch color="danger" className="md:pl-3"></Switch>
              </div>
              <div className="flex flex-col-reverse md:flex-row">
                {/* Cancel and Save buttons */}
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="mb-2 md:mb-0 md:mr-2"
                >
                  Cancel
                </Button>
                <Button color="danger" onPress={onClose}>
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

// Component to display a tooltip with personal parameter prompts
function PersonalParameterTooltip() {
  return (
    <div className="p-2">
      <h2 className="text-sm mb-1">Thought starters</h2>
      <ul className="list-disc list-inside text-xs text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200">
        {/* List of response parameter prompts */}
        <li>Where are you based?</li>
        <li>What do you do for work?</li>
        <li>What are your hobbies and interests?</li>
        <li>What subjects can you talk about for hours?</li>
        <li>What are some goals you have?</li>
      </ul>
    </div>
  );
}

// Component to display a tooltip with response parameter prompts
function ResponseParameterTooltip() {
  return (
    <div className="p-2">
      <h2 className="text-sm mb-1">Thought starters</h2>
      <ul className="list-disc list-inside text-xs text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200">
        {/* List of personal parameter prompts */}
        <li>How formal or casual should ChatGPT be?</li>
        <li>How long or short should responses generally be?</li>
        <li>How do you want to be addressed?</li>
        <li>Should ChatGPT have opinions on topics or remain neutral?</li>
      </ul>
    </div>
  );
}

// Component to display a tooltip with information about temperature and creativity levels
function TemperatureTooltip() {
  return (
    <div className="p-2">
      <h2 className="text-sm mb-1">Temperature and Creativity</h2>
      <ul className="list-disc list-inside text-xs text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200">
        {/* List of personal parameter prompts */}
        <li>
          Lower temperature ( left ) makes ChatGPT more focused and
          deterministic
        </li>
        <li>Higher temperature ( right ) makes it more creative and random</li>
      </ul>
    </div>
  );
}
