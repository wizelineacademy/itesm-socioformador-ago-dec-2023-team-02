"use client";

import { useEffect, useState, useContext } from "react";
import {
  Badge,
  Button,
  Divider,
} from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi";
import { AiOutlineTag, AiOutlinePlus } from "react-icons/ai";
import type { Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SearchBar from "@/components/shared/molecules/search-bar";
import {
  ConversationsActionType,
  filterConversations,
  includesConversation,
} from "@/helpers/sidebar-conversation-helpers";
import { sortTagsByName } from "@/helpers/tag-helpers";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";
import type { PrismaUserContextShape } from "@/context/prisma-user-context";
import { PrismaUserContext } from "@/context/prisma-user-context";
import type { ConversationsContextShape } from "@/context/conversations-context";
import { ConversationsContext } from "@/context/conversations-context";
import { roundUsersCredits } from "@/helpers/user-helpers";
import SettingsMenuModal from "@/components/shared/molecules/settings-menu-modal";
import SingleSelectionDropdown from "@/components/shared/molecules/single-selection-dropdown";
import type { SingleSelectionDropdownItem } from "@/types/component-types";
import TagMenuModal from "../../tagMenu/molecules/tag-menu-modal";
import UserCard from "../../../shared/molecules/user-card";
import { ConversationList } from "../molecules/conversation-list";
import NewConversationMenuModal from "../../newConversation/molcules/new-conversation-menu-modal";


interface ConversationSidebarProps {
  userTags: Tag[];
  models: ModelWithProvider[];
}

export default function ConversationSidebar({
  userTags,
  models,
}: ConversationSidebarProps): JSX.Element {
  const conversationsContext = useContext<ConversationsContextShape | null>(
    ConversationsContext
  );
  const [selectedConversation, setSelectedConversation] = useState<
    number | undefined
  >(undefined);
  const [tags, setTags] = useState<Tag[]>(sortTagsByName(userTags));
  const [selectedTags, setSelectedTags] = useState<Set<number>>(
    new Set<number>()
  );
  const [searchText, setSearchText] = useState<string>("");
  const [showingSidebar, setShowingSidebar] = useState<boolean>(true);
  const [newConversationModalIsOpen, setNewConversationModalIsOpen] =
    useState<boolean>(false);
  const [tagMenuModalIsOpen, setTagMenuModalIsOpen] = useState<boolean>(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const prismaUserContext = useContext<PrismaUserContextShape | null>(
    PrismaUserContext
  );
  const isAdmin: boolean = prismaUserContext?.prismaUser?.role === Role.ADMIN;

  const moveToConversation: (conversationId: number) => void = (
    conversationId
  ) => {
    setSelectedConversation(conversationId);
    router.push(`/conversation/${conversationId}`);
  };

  // Verificar que esto sea eficiente.
  useEffect(() => {
    console.log(conversationsContext?.conversations);
    const firstConversationId: number | undefined =
      conversationsContext?.conversations[0]?.id;

    if (
      conversationsContext &&
      !includesConversation(
        conversationsContext?.conversations,
        selectedConversation
      )
    ) {
      setSelectedConversation(firstConversationId);
      router.push(`/conversation/${firstConversationId ?? "new"}`);
    }
  }, [conversationsContext, selectedConversation, router]);

  // Handler function for updating the search text
  const handleSearchTextChange: (value: string) => void = (value) => {
    setSearchText(value);
  };

  const handleNewConversationCreation: (
    newConversation: SidebarConversation
  ) => void = (newConversation) => {
    if (conversationsContext) {
      conversationsContext.conversationsDispatch({
        type: ConversationsActionType.Create,
        conversationId: newConversation.id,
        conversation: {
          ...newConversation,
          createdAt: new Date(newConversation.createdAt),
        },
      });
      moveToConversation(newConversation.id);
      setNewConversationModalIsOpen(false);
    }
  };

  const handleConversationPress: (conversationId: number) => void = (
    conversationId
  ) => {
    moveToConversation(conversationId);
  };

  const handleNewConversationPress: () => void = () => {
    setNewConversationModalIsOpen(true);
  };

  // Handler function for toggling the visibility of the sidebar
  const handleSidebarVisibilityPress: (e: any) => void = (_) => {
    setShowingSidebar(!showingSidebar);
  };

  const handleTagButtonPress: (e: any) => void = (_) => {
    setTagMenuModalIsOpen(!tagMenuModalIsOpen);
  };

  const handleNewConversationModalClosing: () => void = () => {
    setNewConversationModalIsOpen(false);
  };

  const handleTagMenuModalClosing: (
    newTags: Tag[],
    newSelectedTags: Set<number>
  ) => void = (newTags, newSelectedTags) => {
    setTagMenuModalIsOpen(false);
    setTags(newTags);
    setSelectedTags(newSelectedTags);
  };

  const handleSettingsModalClosing: () => void = () => {
    setSettingsModalIsOpen(false)
  }

  const conversationSidebarStyle = `transition-all duration-200 linear h-screen bg-transparent flex flex-col
  justify-start items-center space-y-5 overflow-hidden border-yellow-50 pb-4 ${
    showingSidebar ? "w-64 px-5" : "w-0"
  }`;

  const singleSelectionDropdownItems: SingleSelectionDropdownItem[] =  
  [
    {
      key: "settings",
      name: "Settings",
      action: () => {
        setSettingsModalIsOpen(true)
      },
    },
    {
      key: "logout",
      name: "Log out",
      action: () => {
        router.push("/api/auth/logout");
      },
      style: "text-danger",
    },
  ];

  const adminItem: SingleSelectionDropdownItem = {
    key: "adminInterface",
    name: "Admin Dashboard",
    action: () => {
      router.push("/admin/group/1");
    }
  }

  // Rendering the sidebar with its contained components and data
  return (
    <div
      className="flex flex-row items-start space-x-0 absolute z-50 md:z-auto md:relative pt-0 bg-black"
      suppressHydrationWarning
    >
      {/* Sidebar section */}
      <div className={conversationSidebarStyle}>
        <div className="w-full flex items-center gap-1 justify-between">
          {/* New Conversation button */}
          <Button
            className="w-full mt-3"
            color="danger"
            onPress={handleNewConversationPress}
            radius="sm"
          >
            <p className="text-xs">
              <AiOutlinePlus />
            </p>
            <p className="text-xs">New Chat</p>
          </Button>

          {/* Sidebar toggle button */}
          <Button
            className={`${showingSidebar ? "block" : "inline"} mt-3 dark`}
            isIconOnly
            onPress={handleSidebarVisibilityPress}
            radius="sm"
          >
            <div className="flex justify-center">
              <PiSidebarSimple />
            </div>
          </Button>
        </div>

        {/* Search and tag filter section */}
        <div className="w-full flex items-center gap-1 justify-between dark text-white">
          {/* Search bar component */}
          <SearchBar
            onTextChange={handleSearchTextChange}
            placeholder="Search Chat"
            takeFullWidth
            text={searchText}
          />

          {/* Tag filter section */}
          <Badge
            content={selectedTags.size}
            isInvisible={selectedTags.size === 0}
          >
            <Button isIconOnly onPress={handleTagButtonPress} radius="sm">
              <AiOutlineTag />
            </Button>
          </Badge>
        </div>

        <Divider className="dark my-0" />

        {/* Conversation list section */}
        <ConversationList
          onConversationPress={handleConversationPress}
          selectedConversation={selectedConversation ?? 0}
          userConversations={filterConversations(
            conversationsContext?.conversations ?? [],
            searchText,
            selectedTags
          )}
          userTags={tags}
        />

        {prismaUserContext ? (
          <div className="flex justify-between bg-black w-full px-4 hover:cursor-pointer">
            <SingleSelectionDropdown
              dropdownItems={isAdmin ? [adminItem, ...singleSelectionDropdownItems] : singleSelectionDropdownItems}
              placement="top"
            >
              <button className="w-full" type="button">
                <UserCard
                  avatarUrl={prismaUserContext?.prismaUser?.image}
                  description={roundUsersCredits(prismaUserContext?.prismaUser) ?? ""}
                  name={prismaUserContext?.prismaUser?.name}
                />
              </button>
            </SingleSelectionDropdown>
          </div>
        ) : null}
      </div>

      {/* Sidebar toggle button */}
      <Button
        className={`${
          showingSidebar ? "hidden" : "block"
        }  w-2 absolute -right-14 z-50 top-3`}
        isIconOnly
        onPress={handleSidebarVisibilityPress}
        radius="sm"
      >
        <div className="flex justify-center">
          <PiSidebarSimple />
        </div>
      </Button>

      <NewConversationMenuModal
        isOpen={newConversationModalIsOpen}
        models={models}
        onConversationCreation={handleNewConversationCreation}
        onModalClose={handleNewConversationModalClosing}
        userTags={tags}
      />

      <TagMenuModal
        allowEditing
        initialSelectedTags={selectedTags}
        initialTags={tags}
        isOpen={tagMenuModalIsOpen}
        modalTitle="Tags"
        onModalClose={handleTagMenuModalClosing}
      />

      <SettingsMenuModal
        includeGlobalContextSection
        isOpen={settingsModalIsOpen}
        onModalClose={handleSettingsModalClosing}
      />
    </div>
  );
}
