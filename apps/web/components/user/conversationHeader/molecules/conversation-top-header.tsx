/**
 * Renders the header of a conversation, including a model card, a context button, and a theme switcher.
 * @returns A React component representing the conversation header.
 */
"use client";
import { Button, Navbar, NavbarItem, useDisclosure } from "@nextui-org/react";
import { ModelCard } from "./model-card";
import ThemeButton from "@/components/theme-button";
import { BiBrain } from "react-icons/bi";
import ModalParametersGPT from "./modal-gpt-parameters";


export default function ConversationHeader(props: any) {
  const { userContext, responseContext, temperature, saveParameters, modelDescription, modelName, providerImage } = props;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <Navbar
      shouldHideOnScroll // Prop to hide the navbar on scroll.
      maxWidth="full" // Prop to set the maximum width of the navbar to full.
      isBlurred={false} // Prop to disable blur effect.
      isBordered // Prop to add border to the navbar.
      className="items-center flex justify-between" // Applying Tailwind CSS classes for styling.
    >
      {/* Model Card */}
      <NavbarItem className="flex-grow flex justify-center items-center gap-1">
        <ModelCard modelName={modelName} providerImageUrl={providerImage} modelDescription={modelDescription} creditsAvailable={400}/>
      </NavbarItem>

      {/* Context Button on xs and small screen sizes*/}
      <NavbarItem className="ml-auto md:hidden">
        <Button radius="sm" color="danger" isIconOnly onClick={onOpen}>
          <BiBrain />
        </Button>
      </NavbarItem>

      {/* Context Button on md and above screen sizes */}
      <NavbarItem className="ml-auto hidden md:inline">
        <Button radius="sm" color="danger" className="flex items-center" onPress={onOpen}>
          <BiBrain />
          <span className="hidden md:inline">Context</span>
        </Button>
      </NavbarItem>

      {/* Light and dark theme switcher */}
      <NavbarItem>
        <ThemeButton />
      </NavbarItem>

      {/* Modal for entering context parameters */}
      <ModalParametersGPT
        saveParameters={saveParameters}
        userContext={userContext}
        responseContext={responseContext}
        temperature={temperature}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </Navbar>
  );
}
