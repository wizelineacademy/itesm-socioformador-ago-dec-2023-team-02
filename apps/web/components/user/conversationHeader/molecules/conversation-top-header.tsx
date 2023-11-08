/**
 * Renders the header of a conversation, including a model card, a context button, and a theme switcher.
 * @returns A React component representing the conversation header.
 */
"use client";
import { Button, Navbar, NavbarItem, useDisclosure } from "@nextui-org/react";
import { BiBrain } from "react-icons/bi";
import ThemeButton from "@/components/theme-button";
import { ModelCard } from "./model-card";
import ModalParametersGPT from "./modal-gpt-parameters";


export default function ConversationHeader(props: any) {
  const { userContext, responseContext, temperature, saveParameters, modelDescription, modelName, providerImage } = props;

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <Navbar
      className=" items-center flex justify-between" // Applying Tailwind CSS classes for styling.
      isBlurred={false} // Prop to disable blur effect.
      isBordered // Prop to add border to the navbar.
      maxWidth="full" // Prop to set the maximum width of the navbar to full.
      shouldHideOnScroll // Prop to hide the navbar on scroll.
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
        <Button
          className="flex items-center"
          color="danger"
          onPress={onOpen}
          radius="sm"
        >
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
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        responseContext={responseContext}
        saveParameters={saveParameters}
        temperature={temperature}
        userContext={userContext}
      />
    </Navbar>
  );
}
