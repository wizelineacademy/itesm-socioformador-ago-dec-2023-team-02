"use client";
import { Button, Navbar, NavbarItem, useDisclosure } from "@nextui-org/react";
import { ModelCard } from "./model-card";
import ThemeButton from "@/components/theme-button";
import { BiBrain } from "react-icons/bi";
import ModalParametersGPT from "./modal-gpt-parameters";

const providerImage =
  "https://avatars.githubusercontent.com/u/86160567?s=200&v=4";

export default function ConversationHeader() {

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();


  return (
    <Navbar
      shouldHideOnScroll // Prop to hide the navbar on scroll.
      maxWidth="full" // Prop to set the maximum width of the navbar to full.
      isBlurred={false} // Prop to disable blur effect.
      isBordered // Prop to add border to the navbar.
      className="shadow-md items-center flex justify-between" // Applying Tailwind CSS classes for styling.
    >
        {/* Model Card */}
      <NavbarItem className="flex-grow flex justify-center">
        <ModelCard modelName="GPT-4" providerImageUrl={providerImage} />
      </NavbarItem>

      {/* Context Button on xs and small screen sizes*/}
      <NavbarItem className="ml-auto md:hidden">
        <Button isIconOnly onPress={onOpen}>
          <BiBrain />
        </Button>
      </NavbarItem>

      {/* Context Button on md and above screen sizes */}
      <NavbarItem className="ml-auto hidden md:inline">
        <Button className="flex items-center" onPress={onOpen}>
          <BiBrain />
          <span className="hidden md:inline">Context</span>
        </Button>
      </NavbarItem>

      {/* Light and dark theme switcher */}
      <NavbarItem>
        <ThemeButton />
      </NavbarItem>

      <ModalParametersGPT isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
    </Navbar>
  );
}
