"use client";

import { useEffect, useReducer, useState } from "react";
import {
  Badge,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { PiSidebarSimple } from "react-icons/pi";
import { AiOutlineTag, AiOutlinePlus } from "react-icons/ai";
import type { Tag } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import type { SidebarConversation } from "@/types/sidebar-conversation-types";
import SearchBar from "@/components/shared/molecules/search-bar";
import {
  ConversationsActionType,
  conversationsReducer,
  filterConversations,
  sortConversationsByDate,
} from "@/helpers/sidebar-conversation-helpers";
import { sortTagsByName } from "@/helpers/tag-helpers";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";
import { ConversationList } from "../molecules/conversation-list";
import UserCard from "../molecules/user-card";
import TagMenuModal from "../../tagMenu/molecules/tag-menu-modal";
import NewConversationMenuModal from "../../newConversation/molcules/new-conversation-menu-modal";

interface ConversationSidebarProps {
  userConversations: SidebarConversation[];
  userTags: Tag[];
  models: ModelWithProvider[];
}

export default function ConversationSidebar({userConversations, userTags, models}: ConversationSidebarProps): JSX.Element {
  const [conversations, conversationsDispatch] = useReducer(conversationsReducer, sortConversationsByDate(userConversations));
  const [selectedConversation, setSelectedConversation] = useState<number | null>(conversations[0]?.id || null)
  const [tags, setTags] = useState<Tag[]>(sortTagsByName(userTags));
  const [selectedTags, setSelectedTags] = useState<Set<number>>(new Set<number>());
  const [searchText, setSearchText] = useState<string>("");
  const [showingSidebar, setShowingSidebar] = useState<boolean>(true);
  const [newConversationModalIsOpen, setNewConversationModalIsOpen] = useState<boolean>(false)
  const [tagMenuModalIsOpen, setTagMenuModalIsOpen] = useState<boolean>(false);
  const router: AppRouterInstance = useRouter()

  const { user } = useUser();

  const moveToConversation: (conversationId: number) => void = (conversationId) => {
    setSelectedConversation(conversationId)
    router.push(`/conversation/${conversationId}`)
  }

  // Verificar que esto sea eficiente. 
  useEffect(() => {
    const firstConversationId: number | null = conversations[0]?.id
    if (selectedConversation && firstConversationId && !conversations.map(({id}) => id).includes(selectedConversation)){
      setSelectedConversation(firstConversationId)
      router.push(`/conversation/${firstConversationId}`)
    }
  }, [conversations, selectedConversation, router])

  // Handler function for updating the search text
  const handleSearchTextChange: (value: string) => void = (value) => {
    setSearchText(value);
  };

  const handleNewConversationCreation: (newConversation: SidebarConversation) => void = (newConversation) => {
    conversationsDispatch({type: ConversationsActionType.Create, conversationId: newConversation.id, conversation: newConversation})
    moveToConversation(newConversation.id)
    setNewConversationModalIsOpen(false)
  }

  const handleConversationPress: (conversationId: number) => void = (conversationId) => {
    moveToConversation(conversationId)
  }

  const handleNewConversationPress: () => void = () => {setNewConversationModalIsOpen(true)}

  // Handler function for toggling the visibility of the sidebar
  const handleSidebarVisibilityPress: (e: any) => void = (_) => {setShowingSidebar(!showingSidebar);};

  const handleTagButtonPress: (e: any) => void = (_) => {setTagMenuModalIsOpen(!tagMenuModalIsOpen);};

  const handleNewConversationModalClosing: () => void = () => {setNewConversationModalIsOpen(false)}

  const handleTagMenuModalClosing: (newTags: Tag[], newSelectedTags: Set<number>) => void = (newTags, newSelectedTags) => {
    setTagMenuModalIsOpen(false);
    setTags(newTags);
    setSelectedTags(newSelectedTags);
  };

  const conversationSidebarStyle = `transition-all duration-200 linear h-screen bg-transparent flex flex-col
  justify-start items-center space-y-5 overflow-hidden border-yellow-50 ${
    showingSidebar ? "w-64 px-5" : "w-0"
  }`;

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
          <Button className="w-full mt-3" color="danger" onPress={handleNewConversationPress} radius="sm">
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
        <div className="w-full flex items-center gap-1 justify-between dark">
          {/* Search bar component */}
          <SearchBar
            onTextChange={handleSearchTextChange}
            overridingStyle="w-full text-sm shadow-none dark text-white"
            placeholder="Search Chat"
            takeFullWidth={false}
            text={searchText}
          />

          {/* Tag filter section */}
          <Badge content={selectedTags.size} isInvisible={selectedTags.size === 0}>
            <Button isIconOnly onPress={handleTagButtonPress} radius="sm" id="tag-button">
              <AiOutlineTag />
            </Button>
          </Badge>
        </div>

        <Divider className="dark my-0" />

        {/* Conversation list section */}
        <ConversationList
          conversationsDispatch={conversationsDispatch}
          onConversationPress={handleConversationPress}
          selectedConversation={selectedConversation}
          userConversations={filterConversations(conversations, searchText, selectedTags)}
          userTags={tags}
        />

        {/* User Information Component */}
        <Dropdown>
          <DropdownTrigger>
            <div className="flex flex-col items-center justify-between bg-black w-full px-4 pb-3 hover:cursor-pointer">
              {user ? (
                <UserCard
                  avatarUrl={
                    user?.picture
                      ? user?.picture
                      : `https://ui-avatars.com/api/?name=${user?.name?.replace(
                          " ",
                          "+"
                        )}`
                  }
                  description={
                    user?.email
                      ? `${user?.email?.slice(0, 15)}...`
                      : "No email provided"
                  }
                  name={
                    user?.name
                      ? `${user?.name?.split(" ")[0]} ${user?.name?.split(
                          " "
                        )[1]}`
                      : "User"
                  }
                />
              ) : (
                <UserCard
                  avatarUrl="https://ui-avatars.com/api/?name="
                  description=""
                  name="User"
                />
              )}
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem className="h-14 gap-2" key="profile">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user ? user.email : ""}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem color="danger" href="/api/auth/logout" key="logout">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
    </div>
  );
}
