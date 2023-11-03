/**
 * Renders the header of a conversation, including a model card, a context button, and a theme switcher.
 * @returns A React component representing the conversation header.
 */
"use client";
import { Button, Navbar, NavbarItem, useDisclosure } from "@nextui-org/react";
import { ModelCard } from "./model-card";
import ThemeButton from "@/components/theme-button";
import { BiImage } from "react-icons/bi";
import ModalParametersDalle from "./modal-dalle-parameters";

const providerImage =
  "https://avatars.githubusercontent.com/u/86160567?s=200&v=4";

export default function ConversationHeader(props: any) {
  const { size, saveParameters } = props;
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
      <NavbarItem className="flex-grow flex justify-center">
        <ModelCard modelName="DALL·E" providerImageUrl={providerImage} />
      </NavbarItem>

      {/* Context Button on xs and small screen sizes*/}
      <NavbarItem className="ml-auto md:hidden">
        <Button color="danger" isIconOnly onClick={onOpen}>
          <BiImage />
        </Button>
      </NavbarItem>

      {/* Context Button on md and above screen sizes */}
      <NavbarItem className="ml-auto hidden md:inline">
        <Button color="danger" className="flex items-center" onPress={onOpen}>
          <BiImage />
          <span className="hidden md:inline">Size</span>
        </Button>
      </NavbarItem>

      {/* Light and dark theme switcher */}
      <NavbarItem>
        <ThemeButton />
      </NavbarItem>

      {/* Modal for entering context parameters */}
      <ModalParametersDalle
        saveParameters={saveParameters}
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </Navbar>
  );
}
